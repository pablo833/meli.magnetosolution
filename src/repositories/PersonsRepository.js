
import ElasticSearchRepository from './ElasticSearchRepository';

export default class PersonsRepository extends ElasticSearchRepository {
  constructor(elasticSearchClient) {
    super(elasticSearchClient, 'persons', 'persons');

    this.getByDna = this.getByDna.bind(this);
    this.add = this.add.bind(this);
    this._getQueryByDna = this._getQueryByDna.bind(this);
    this._mapPerson = this._mapPerson.bind(this);
  }

  getByDna(dna) {
    return super.getBy(this._getQueryByDna(dna))
      .then((response) => {
        if (response.resp.length < 1) {
          return null;
        } else {
          return this._mapPerson(response.resp[0]._source);
        }
      }, (error) => {
        return Promise.reject(error);
      });
  }

  add(document) {
    return super.add(document);
  }

  _mapPerson(source) {
    return {
      isMutant: source.isMutant,
      dna: source.dna
    }
  }

  _getQueryByDna(dna) {
    return {
      'match': {
        'dna': dna
      }
    }
  }
}
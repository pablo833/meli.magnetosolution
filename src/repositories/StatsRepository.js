
import ElasticSearchRepository from './ElasticSearchRepository';

export default class StatsRepository extends ElasticSearchRepository {
  constructor(elasticSearchClient) {
    super(elasticSearchClient, 'stats', 'stats');

    this.get = this.get.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this._mapStat = this._mapStat.bind(this);
  }

  get() {
    return super.getAll()
      .then((objRet) => {
        if (objRet.resp.length < 1) {
          return null;
        } else {
          return this._mapStat(objRet.resp[0]._id, objRet.resp[0]._source);
        }
      }, (error) => { return Promise.reject(error); });
  }

  add(stats) {
    return super.add(stats);
  }

  update(stat) {
    var document = {
      ...stat,
      _id: undefined
    }

    return super.update(stat._id, document);
  }

  _mapStat(id, source) {
    return {
      count_mutant_dna: source.count_mutant_dna,
      count_human_dna: source.count_human_dna,
      ratio: source.ratio,
      _id: id
    }
  }
}
export default class ElasticSearchRepository {
  constructor(elasticSearchClient, index, type) {
    this.esCient = elasticSearchClient;
    this.index = index;
    this.type = type;

    this.get = this.get.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getBy = this.getBy.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.esCient.search({
        "index": this.index,
        "type": this.type,
        "body": {
          "query": {
            "match_all": {}
          }
        }
      }, (error, response) => {
        if (error) {
          if (error.status == 404) {
            resolve({ code: 200, message: null, resp: [] });
          } else {
            reject({ code: error.status, message: error.message, resp: error });
          }
        }
        else {
          resolve({ code: 200, message: null, resp: response.hits.hits });
        }
      });
    });
  }

  get(id) {
    return new Promise((resolve, reject) => {
      this.esCient.get({
        index: this.index,
        type: this.type,
        id: id
      }, (error, response) => {
        if (error) {
          if (error.status == 404) {
            resolve({ code: 200, message: null, resp: null });
          } else {
            reject({ code: error.status, message: error.message, resp: error });
          }
        } else {
          resolve({ code: 200, message: null, resp: response });
        }
      });
    });
  }

  getBy(query) {
    return new Promise((resolve, reject) => {
      this.esCient.search({
        "index": this.index,
        "type": this.type,
        "body": {
          "query": query
        }
      }, (error, response) => {
        if (error) {
          reject({ code: error.status, message: error.message, resp: error });
        } else {
          if (response.hits.hits.length < 1) {
            resolve({ code: 200, message: null, resp: [] });
          } else {
            resolve({ code: 200, message: null, resp: response.hits.hits });
          }
        }
      });
    });
  }

  add(document) {
    return new Promise((resolve, reject) => {
      this.esCient.index({
        index: this.index,
        type: this.type,
        body: document
      }, (error, response) => {
        if (error) {
          reject({ code: error.status, message: error.message, resp: error });
        } else {
          resolve({ code: 200, message: 'Document inserted.', resp: response });
        }
      });
    })
  }

  update(id, document) {
    return new Promise((resolve, reject) => {
      this.esCient.update({
        index: this.index,
        type: this.type,
        id: id,
        body: {
          doc: document
        }
      }, (error, resp) => {
        if (error) {
          reject({ code: error.status, message: error.message, resp: error });
        } else {
          resolve({ code: 200, message: 'Document updated.', resp: resp });
        }
      });
    });
  }
}
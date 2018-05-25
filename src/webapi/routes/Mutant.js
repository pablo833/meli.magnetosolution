export default class Mutant {
  constructor(queue, mutantDnaAnalyzer) {
    this.queue = queue;
    this.mutantDnaAnalyzer = mutantDnaAnalyzer;

    this.configure = this.configure.bind(this);
    this._pushToQueue = this._pushToQueue.bind(this);
    this._dnaToString = this._dnaToString.bind(this);
    this._sendResponse = this._sendResponse.bind(this);
  }

  configure(server) {
    server.post('/mutant', this._validateRequest.bind(this), this._processRequest.bind(this));
  }

  _validateRequest(req, res, next) {
    if (!req.body || !req.body.dna || !this.mutantDnaAnalyzer.isValidDna(req.body.dna)) {
      res.json(400);
      return next(false);
    }

    return next();
  }

  _processRequest(req, res, next) {
    var isMutant = this.mutantDnaAnalyzer.isMutant(req.body.dna);

    this._pushToQueue(req.body.dna, isMutant);
    this._sendResponse(isMutant, res);
  }

  _pushToQueue(dna, isMutant) {
    var person = {
      dna: this._dnaToString(dna),
      isMutant
    }

    this.queue.push(person);
  }

  _sendResponse(isMutant, res) {
    if (isMutant) {
      res.send(200);
    } else {
      res.send(403);
    }
  }

  _dnaToString(dna) {
    var dnaString = '';

    dna.forEach(item => {
      dnaString += item.toUpperCase();
    });

    return dnaString;
  }
}
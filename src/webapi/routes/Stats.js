export default class Stats {
  constructor(statsManager) {
    this.statsManager = statsManager;

    this.configure = this.configure.bind(this);
  }

  configure(server) {
    server.get('/stats', this._processRequest.bind(this));
  }

  _processRequest(req, res, next) {
    this.statsManager.get()
      .then(stats => {
        if (!stats) {
          res.send(200, {
            count_mutant_dna: 0,
            count_human_dna: 0,
            ratio: 0
          });
        } else {
          stats._id = undefined;

          res.send(200, stats);
        }

        return next();
      });
  }
}
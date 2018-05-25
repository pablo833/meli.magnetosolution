import Queue from 'firebase-queue';

export default class Worker {
  constructor(diModule) {
    this.queueReference = diModule.getQueueReference();
    this.mutantsManager = diModule.getMutantsManager();
    this.statsManager = diModule.getStatsManager();
  }

  run = () => {
    var queue = new Queue(this.queueReference, this._processMessage);
  }

  _processMessage = (message, progress, resolve, reject) => {
    var { dna, isMutant } = message;

    this.mutantsManager.checkIfNewDna(dna)
      .then(isNew => {
        if (isNew) {
          var p1 = this.mutantsManager.save(dna, isMutant);
          var p2 = this.statsManager.update(isMutant);

          return Promise.all([p1, p2]);
        } else {
          return Promise.resolve();
        }
      })
      .then(() => resolve())
      .catch(error => {
        reject(error);
      });
  }
}
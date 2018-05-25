import admin from 'firebase-admin';

class QueueManager {
  constructor() {
    this.isInitialized = false;

    this.initializeApp = this.initializeApp.bind(this);
    this.getQueueReference = this.getQueueReference.bind(this);
  }

  initializeApp(queueServiceAccount, queueDatabaseUrl) {
    if (!queueServiceAccount) {
      throw new Error('Invalid argument exception. Parameter [queueServiceAccount]');
    }

    if (!queueDatabaseUrl) {
      throw new Error('Invalid argument exception. Parameter [queueDatabaseUrl]');
    }

    if (!this.isInitialized) {
      admin.initializeApp({
        credential: admin.credential.cert(queueServiceAccount),
        databaseURL: queueDatabaseUrl
      });

      this.isInitialized = true;
    }
  }

  getQueueReference(queueServiceAccount, queueDatabaseUrl, queueName) {
    if (!this.isInitialized) {
      this.initializeApp(queueServiceAccount, queueDatabaseUrl);
    }

    return admin.database().ref(queueName);
  }
}

export default new QueueManager();
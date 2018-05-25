import elasticsearch from 'elasticsearch';
import MutantsManager from './helpers/MutantsManager';
import StatsManager from '../helpers/StatsManager';
import PersonsRepository from '../repositories/PersonsRepository';
import StatsRepository from '../repositories/StatsRepository';
import QueueManager from '../helpers/QueueManager';

var queueServiceAccount = null;
var queueDatabaseUrl = null;
var queueName = null;
var storageDatabaseUrl = null;
var eslasticSearchClient = null;

var _createElasticSearchClient = (storageDatabaseUrl) => {
  if (!eslasticSearchClient) {
    eslasticSearchClient = new elasticsearch.Client({
      host: storageDatabaseUrl
    });
  }

  return eslasticSearchClient;
}

var _createMutantsManager = (storageDatabaseUrl) => {
  var client = _createElasticSearchClient(storageDatabaseUrl);
  var personsRepository = new PersonsRepository(client);

  return new MutantsManager(personsRepository);
}

var _createStatsManager = (storageDatabaseUrl) => {
  var client = _createElasticSearchClient(storageDatabaseUrl);
  var statsRepository = new StatsRepository(client);

  return new StatsManager(statsRepository);
}

export default class DIModule {
  constructor(configuration) {
    queueServiceAccount = configuration.queueServiceAccount;
    queueDatabaseUrl = configuration.queueDatabaseUrl;
    queueName = configuration.queueName;
    storageDatabaseUrl = configuration.storageDatabaseUrl;
  }

  getQueueReference = () => QueueManager.getQueueReference(queueServiceAccount, queueDatabaseUrl, queueName);

  getMutantsManager = () => _createMutantsManager(storageDatabaseUrl);

  getStatsManager = () => _createStatsManager(storageDatabaseUrl);
}
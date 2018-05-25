import elasticsearch from 'elasticsearch';
import Routes from './routes/Routes';
import StatsManager from '../helpers/StatsManager';
import StatsRepository from '../repositories/StatsRepository';
import QueueManager from '../helpers/QueueManager';
import MutantDnaAnalyzer from './models/MutantDnaAnalyzer';
import { default as MutantRoutes } from './routes/Mutant';
import { default as StatsRoutes } from './routes/Stats';

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

var _createRoutes = (storageDatabaseUrl) => {
  var client = _createElasticSearchClient(storageDatabaseUrl);
  var statsRepository = new StatsRepository(client);
  var statsManager = new StatsManager(statsRepository);
  var queue = QueueManager.getQueueReference(queueServiceAccount, queueDatabaseUrl, queueName);
  var mutantDnaAnalyzer = new MutantDnaAnalyzer();

  var mutantRoutes = new MutantRoutes(queue, mutantDnaAnalyzer);
  var statsRoutes = new StatsRoutes(statsManager);

  return new Routes([mutantRoutes, statsRoutes]);
}

export default class DIModule {
  constructor(configuration) {
    queueServiceAccount = configuration.queueServiceAccount;
    queueDatabaseUrl = configuration.queueDatabaseUrl;
    queueName = configuration.queueName;
    storageDatabaseUrl = configuration.storageDatabaseUrl;
  }

  getRoutes = () => _createRoutes(storageDatabaseUrl);
}
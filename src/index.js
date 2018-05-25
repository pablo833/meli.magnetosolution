import Server from './webapi/Server';
import Worker from './worker/Worker';
import { default as WorkerDIModule } from './worker/DIModule';
import { default as WebApiDIModule } from './webapi/DIModule';

var queueServiceAccount = require('../magnetosolution.firebase.credentials.json');
var config = require('../config.json');

var workerConfiguration = {
  ...config.worker,
  queueServiceAccount
}

var webApiConfiguration = {
  ...config.webapi,
  queueServiceAccount
}

var workerDIModule = new WorkerDIModule(workerConfiguration);
var webApiDIModule = new WebApiDIModule(webApiConfiguration);

var webapiServer = new Server(webApiDIModule);
var worker = new Worker(workerDIModule);

webapiServer.run();
worker.run();
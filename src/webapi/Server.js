import restify from 'restify';

export default class Server {
  constructor(diModule) {
    this.routes = diModule.getRoutes();
  }

  run() {
    var server = restify.createServer({ name: 'magnetosolution' });
    server.use(restify.plugins.bodyParser({
      mapParams: true
    }));

    this.routes.configure(server);

    server.listen(8080, () => {
      console.log('%s listening at %s', server.name, server.url);
    });
  }
}
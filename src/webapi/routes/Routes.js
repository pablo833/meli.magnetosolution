export default class Routes {
  constructor(routes) {
    this.routes = routes;

    this.configure = this.configure.bind(this);
  }

  configure(server) {
    this.routes.forEach(route => {
      route.configure(server);
    });
  }
}
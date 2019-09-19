import Navbar from './Navbar.js';
import * as Parse from './Parse.js';

class RouteHandler {
  static goToRoute(currentUrl) {
    window.history.pushState({ previousUrl: window.location.href }, '', currentUrl);
    RouteHandler.createPage();
  }

  static addRoutes(_routes) {
    RouteHandler.routes = _routes;
  }

  static async createPage() {
    const header = document.getElementById('header-container');
    const pageContainer = document.getElementById('page-container');
    if (!header.innerHTML) {
      header.innerHTML = await Navbar.render();
    }

    const request = Parse.getResourse(window.location.pathname);
    console.log(request);
    const page = this.routes[request] ? this.routes[request] : this.routes.error;
    pageContainer.innerHTML = '';
    const newPage = await page.render();

    pageContainer.appendChild(newPage);
  }

  static goBack() {
    if (window.location.href === window.history.state.previousUrl) {
      RouteHandler.goToRoute('/JS-Basics-and-DOM/');
    } else {
      window.history.back();
    }
  }
}

export default RouteHandler;

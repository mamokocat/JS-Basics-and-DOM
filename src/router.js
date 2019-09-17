import Navbar from './Navbar.js';
import * as Parse from './Parse.js';

class RouteHandler {
  static goToRoute(currentUrl, isFirstEntry) {
    console.log(`prev: ${window.location.href}`);
    window.history.pushState({ prevUrl: window.location.href }, '', currentUrl);
    RouteHandler.createPage(isFirstEntry);
  }

  static addRoutes(_routes) {
    RouteHandler.routes = _routes;
  }

  static async createPage(isFirstEntry) {
    const header = document.getElementById('header-container');
    const pageContainer = document.getElementById('page-container');
    if (!header.innerHTML) {
      header.innerHTML = await Navbar.render();
    }

    const request = Parse.getResourse(window.location.pathname);
    const page = this.routes[request] ? this.routes[request] : this.routes.error;
    pageContainer.innerHTML = '';
    const newPage = await page.render(isFirstEntry);
    pageContainer.appendChild(newPage);
  }

  static goBack() {
    if (window.location.href === window.history.state.prevUrl) {
      RouteHandler.goToRoute('/');
    } else {
      window.history.back();
    }
  }
}

export default RouteHandler;

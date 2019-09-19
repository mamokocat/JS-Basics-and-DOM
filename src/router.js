import Navbar from './Navbar.js';
import * as Parse from './Parse.js';

class RouteHandler {
  static goToRoute(currentUrl) {
    parent.window.history.pushState({ previousUrl: parent.window.location.href }, '', currentUrl);
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

    const request = Parse.getResourse();
    console.log(request);
    const page = this.routes[request] ? this.routes[request] : this.routes.error;
    pageContainer.innerHTML = '';
    const newPage = await page.render();
    pageContainer.appendChild(newPage);
  }

  static goBack() {
    if (parent.window.location.href === parent.window.history.state.previousUrl) {
      RouteHandler.goToRoute('/JS-Basics-and-DOM/');
    } else {
      parent.window.history.back();
    }
  }
}

export default RouteHandler;

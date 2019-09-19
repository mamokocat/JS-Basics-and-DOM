import Home from './Home.js';
import Search from './Search.js';
import Gif from './Gif.js';
import Error404 from './Error404.js';
import RouteHandler from './router.js';

const routes = {
  '': Home,
  search: Search,
  gif: Gif,
  error: Error404,
};

RouteHandler.addRoutes(routes);

window.onload = () => {
  RouteHandler.goToRoute(parent.window.location.href);
};

window.onpopstate = () => {
  RouteHandler.createPage();
  console.log('back/forward');
};

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
  RouteHandler.goToRoute(document.URL);
};

window.onpopstate = () => {
  const url = window.location.href;
  window.location.href = 'https://mamok0.github.io/JS-Basics-and-DOM/';
  RouteHandler.goToRoute(url);
};

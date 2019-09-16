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

const routerHandler = new RouteHandler(routes);

window.onload = () => {
  routerHandler.goToRoute();
};

window.onpopstate = () => {
  routerHandler.goToRoute();
};

export default routerHandler;

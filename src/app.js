import Navbar from './Navbar.js';
import Home from './Home.js';
import Search from './Search.js';
import Gif from './Gif.js';


const routes = {
  '/': Home,
  '/index.html': Home,
  '/search': Search,
  '/gif': Gif
};


const router = async (urlParameter) => {
  const header = null || document.getElementById('header-container');
  header.innerHTML = await Navbar.render();

  const request = window.location.pathname;

  const page = routes[request] ? routes[request] : Gif;

  await page.render(urlParameter);
};

window.addEventListener('load', router);

window.onpopstate = () => {
  router();
};

export default router;

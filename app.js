import Navbar from './src/views/Navbar.js';
import Home from './src/views/Home.js';
import Search from './src/views/Search.js';
import Gif from './src/views/Gif.js';
import Test from './Test.js';
import Error404 from './src/views/Error404.js';

const routes = {
  '/': Home,
  '/index.html': Home,
  '/search': Search,
  '/gif': Gif
};


const router = async (searchInput) => {
  const header = null || document.getElementById('header-container');

  header.innerHTML = await Navbar.render();
  const request = window.location.pathname;

  const page = routes[request] ? routes[request] : Error404;

  await page.render(searchInput);
};


window.addEventListener('onbeforeunload', router);

window.addEventListener('load', router);

document.body.addEventListener('DOMSubtreeModified', () => {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-btn');

  if (searchButton) {
    searchButton.addEventListener('click', () => {
      window.history.pushState(null, null, `/search?q=${searchInput.value}`);
      router(searchInput);
    });
  }
});

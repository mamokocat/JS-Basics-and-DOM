import Navbar from './src/Navbar.js';
import Home from './src/Home.js';
import Search from './src/Search.js';
import Gif from './src/Gif.js';
import Error404 from './src/Error404.js';
import parseUrl from './src/Utils.js';

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

  const page = routes[request] ? routes[request] : Error404;

  await page.render(urlParameter);
};

window.addEventListener('load', router);

document.addEventListener('DOMSubtreeModified', () => {
  const homeButton = document.getElementById('home');
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-btn');
  const gifInfo = document.getElementById('gif');

  if (homeButton) {
    homeButton.addEventListener('click', () => {
      window.history.pushState({}, '', '/');
      console.log('home');
      router();
    });
  }

  if (gifInfo) {
    gifInfo.addEventListener('click', () => {
      const id = this.title;
      console.log(id);
      window.history.pushState({}, '', `/gif/${id}`);
      router(id);
    });
  }

  if (searchButton) {
    searchButton.addEventListener('click', () => {
      window.history.pushState({}, '', `/search?q=${searchInput.value}`);
      console.log('search');
      router(searchInput);
    });
  }
});

window.onpopstate = () => {
  router();
};

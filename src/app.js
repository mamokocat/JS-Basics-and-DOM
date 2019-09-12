import Navbar from './Navbar.js';
import Home from './Home.js';
import Search from './Search.js';
import Gif from './Gif.js';
import { getGifs, getMoreGifs, getGif } from './api.js';

const routes = {
  '/': Home,
  '/index.html': Home,
  '/search': Search,
  '/gif': Gif
};

const router = async (urlParameter) => {
  const header = null || document.getElementById('header-container');
  const pageContainer = null || document.getElementById('search-result');

  if (pageContainer) {
    pageContainer.innerHTML = '';
  }

  header.innerHTML = await Navbar.render();

  const request = window.location.pathname;

  const page = routes[request] ? routes[request] : Gif;

  pageContainer.innerHTML += await page.render() || '';

  const gif = document.getElementById('gif');
  const moreButton = document.getElementById('more-btn');
  const backButton = document.getElementById('back-btn');

  if (gif) {
    gif.addEventListener('click', (event) => {
      event.preventDefault();
      window.history.pushState({}, '', gif.href);
      router();
    });
  }

  if (moreButton) {
    moreButton.addEventListener('click', async () => {
      const gifsAmount = document.getElementsByTagName('img').length;
      let searchInputValue = window.location.search.split('=')[1];
      searchInputValue = searchInputValue.split('%20').join(' ');

      const moreGifs = await getMoreGifs({ searchInputValue, gifsAmount });
      let moreImg = '';

      for (let key = 0; key < moreGifs.data.length; key += 1) {
        moreImg += `<a id="gif" href="/gif/${moreGifs.data[key].id}"><img src=
              ${moreGifs.data[key].images.fixed_height_small.url} class="m-1 img-thumbnail"/></a>`;
      }

      document.getElementById('gif-container').innerHTML += moreImg;
    });
  }

  if (backButton) {
    document.getElementById('back-btn').addEventListener('click', () => {
      if (!document.referrer) {
        window.history.pushState({}, '', '/');
        router();
      } else {
        window.history.back();
      }
    });
  }
};

window.addEventListener('load', router);

window.onpopstate = () => {
  router();
};

export default router;

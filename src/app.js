import Navbar from './Navbar.js';
import Home from './Home.js';
import Search from './Search.js';
import Gif from './Gif.js';
import * as Gifs from './api.js';
import * as Parse from './Utils.js';

const routes = {
  '/': Home,
  '/index.html': Home,
  '/search': Search,
  '/gif': Gif
};


const router = async () => {
  const header = document.getElementById('header-container');
  const pageContainer = document.getElementById('search-result');

  if (!header.innerHTML) {
    header.innerHTML = await Navbar.render();
  }

  const request = window.location.pathname;

  const page = routes[request] ? routes[request] : Gif;

  pageContainer.innerHTML = await page.render() || '';

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
      const searchInputValue = Parse.parseSearchQuery();

      const moreGifs = await Gifs.getMoreGifs({
        api_key: 'Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2',
        q: searchInputValue,
        limit: '15',
        offset: gifsAmount,
        rating: 'G',
        lang: 'en'
      });
      let moreImg = '';

      for (let key = 0; key < moreGifs.data.length; key += 1) {
        moreImg += `<a id="gif" href="/gif/${moreGifs.data[key].id}"><img 
              src=${moreGifs.data[key].images.fixed_height_small.url} 
              alt="${moreGifs.data[key].title}" 
              class="m-1 img-thumbnail"/></a>`;
      }

      document.getElementById('gif-container').innerHTML += moreImg;
    });
  }


  if (backButton) {
    backButton.addEventListener('click', () => {
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

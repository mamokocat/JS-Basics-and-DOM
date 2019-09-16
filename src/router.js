import createPage from './app.js';
import * as Gifs from './api.js';
import * as Parse from './Utils.js';

const router = async (url) => {
  window.history.pushState({}, '', url);
  createPage();

  const gif = document.getElementById('gif');
  const moreButton = document.getElementById('more-btn');
  const backButton = document.getElementById('back-btn');
  const searchButton = document.getElementById('search-btn');
  const searchInput = document.getElementById('search-input');

  if (searchButton) {
    searchButton.addEventListener('click', () => {
      router(Parse.getSearchQuery(searchInput.value));
    });
  }

  if (gif) {
    gif.addEventListener('click', (event) => {
      event.preventDefault();
      router(gif.href);
    });
  }

  if (moreButton) {
    moreButton.addEventListener('click', async () => {
      const gifsAmount = document.getElementsByTagName('img').length;
      const searchInputValue = Parse.parseSearchQuery();
      const moreGifs = await Gifs.getMoreGifs({ searchInputValue, gifsAmount });

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
        router('/');
      } else {
        window.history.back();
      }
    });
  }
};


window.addEventListener('load', () => {
  console.log('1');
  router('/');
});

window.onpopstate = () => {
  router();
};

export default router;

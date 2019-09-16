import * as Gifs from './api.js';
import * as Parse from './Utils.js';
import Home from './Home.js';
import RouteHandler from './router.js';

const Search = {
  render: async () => {
    const searchPage = document.createElement('div');
    searchPage.setAttribute('id', 'search-result');
    const searchInputValue = Parse.parseSearchQuery();
    searchPage.appendChild(Home.render(searchInputValue));

    const pp = searchPage.getElementById('search-input');
    pp.setAttribute('value', searchInputValue);
    
    if (!document.getElementById('search-result-label')) {
      const searchLabel = document.createElement('h5');
      searchLabel.setAttribute('id', 'search-result-label');
      searchLabel.setAttribute('class', 'mt-3');
      searchLabel.innerHTML = 'Search result for "';

      const searchName = document.createElement('span');
      searchName.setAttribute('id', 'search-result-name');
      searchLabel.appendChild(searchName);

      searchPage.getElementById('search-form').appendChild(searchLabel);
    }

    searchPage.getElementById('search-result-name').innerHTML = `${searchInputValue}":`;

    const searchResponce = document.createElement('div');
    searchResponce.setAttribute('class', 'mt-3');
    const gifs = await Gifs.getGifs(searchInputValue);

    gifs.data.forEach((gif) => {
      const gifLink = document.createElement('a');
      gifLink.setAttribute('id', 'gif');
      gifLink.setAttribute('href', `/gif/${gif.id}`);

      const gifImg = document.createElement('img');
      gifImg.setAttribute('src', `${gif.images.fixed_height_small.url}`);
      gifImg.setAttribute('alt', `${gif.title}`);
      gifImg.setAttribute('class', 'm-1 img-thumbnail');
      gifLink.appendChild(gifImg);

      searchResponce.appendChild(gifLink);
    });

    searchPage.appendChild(searchResponce);

    const moreButton = document.createElement('input');
    moreButton.setAttribute('type', 'button');
    moreButton.setAttribute('id', 'more-btn');
    moreButton.setAttribute('value', 'More gifs!');
    moreButton.setAttribute('class', 'btn btn-success mt-2 mb-4');
    searchPage.appendChild(moreButton);

    const gif = searchPage.getElementById('gif');

    gif.addEventListener('click', (event) => {
      event.preventDefault();
      RouteHandler.createRoute(gif.href);
    });


    moreButton.addEventListener('click', async () => {
      const gifsAmount = document.getElementsByTagName('img').length;
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

    return searchPage;
  },
};

export default Search;

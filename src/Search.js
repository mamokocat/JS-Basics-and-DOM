import * as Gifs from './api.js';
import * as Parse from './Parse.js';
import SearchForm from './SearchForm.js';
import RouteHandler from './router.js';

const Search = {
  render: async () => {
    const searchPage = document.createElement('div');
    searchPage.setAttribute('id', 'search-result');
    const searchInputValue = Parse.parseSearchQuery();

    const searchLabel = document.createElement('h5');
    searchLabel.setAttribute('id', 'search-result-label');
    searchLabel.setAttribute('class', 'mt-3');
    searchLabel.innerHTML = 'Search result for "';

    const searchName = document.createElement('span');
    searchName.setAttribute('id', 'search-result-name');
    searchName.innerText = searchInputValue;
    searchLabel.appendChild(searchName);

    searchPage.appendChild(SearchForm.render(searchInputValue, searchLabel));
    searchLabel.innerHTML += '":';

    const searchResponce = document.createElement('div');
    searchResponce.setAttribute('id', 'search-responce');
    searchResponce.setAttribute('class', 'mt-3');
    const gifs = await Gifs.getGifs(searchInputValue);
    
    if (gifs.data.length === 0) {
      const noResultsLabel = document.createElement('h3');
      noResultsLabel.innerText = 'No results :(';
      searchResponce.appendChild(noResultsLabel);
      searchPage.appendChild(searchResponce);
      return searchPage;
    }

    gifs.data.forEach((gif) => {
      const gifLink = document.createElement('a');
      gifLink.setAttribute('id', 'gif');
      gifLink.setAttribute('href', `/JS-Basics-and-DOM/gif/${gif.id}`);

      const gifImg = document.createElement('img');
      gifImg.setAttribute('src', `${gif.images.fixed_height_small.url}`);
      gifImg.setAttribute('alt', `${gif.title}`);
      gifImg.setAttribute('class', 'm-1 img-thumbnail');
      gifLink.appendChild(gifImg);

      gifLink.addEventListener('click', (event) => {
        event.preventDefault();
        RouteHandler.goToRoute(gifLink.href);
      });
      searchResponce.appendChild(gifLink);
    });

    searchPage.appendChild(searchResponce);
    
      const moreButton = document.createElement('input');
      moreButton.setAttribute('type', 'button');
      moreButton.setAttribute('id', 'more-btn');
      moreButton.setAttribute('value', 'More gifs!');
      moreButton.setAttribute('class', 'btn btn-success mt-2 mb-4');
      searchPage.appendChild(moreButton);

      moreButton.addEventListener('click', async () => {
        const gifsAmount = document.getElementsByTagName('img').length;
        const moreGifs = await Gifs.getMoreGifs({ searchInputValue, gifsAmount });
        moreGifs.data.forEach((gif) => {
          const gifLink = document.createElement('a');
          gifLink.setAttribute('id', 'gif');
          gifLink.setAttribute('href', `/JS-Basics-and-DOM/gif/${gif.id}`);

          const gifImg = document.createElement('img');
          gifImg.setAttribute('src', `${gif.images.fixed_height_small.url}`);
          gifImg.setAttribute('alt', `${gif.title}`);
          gifImg.setAttribute('class', 'm-1 img-thumbnail');
          gifLink.appendChild(gifImg);

          gifLink.addEventListener('click', (event) => {
            event.preventDefault();
            RouteHandler.goToRoute(gifLink.href);
          });
          searchResponce.appendChild(gifLink);
        });
      });

    return searchPage;
  },
};

export default Search;

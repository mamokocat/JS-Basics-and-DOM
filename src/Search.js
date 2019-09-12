import Home from './Home.js';
import * as Gifs from './api.js';
import * as Parse from './Utils.js';


const Search = {
  render: async () => {
    let html = '';
    const searchForm = document.getElementById('search-form');
    searchForm.style.display = 'block';

    if (searchForm.innerHTML === '') {
      Home.render();
    }
    const searchInputValue = Parse.parseSearchQuery();
    document.getElementById('search-input').setAttribute('value', searchInputValue);

    if (!document.getElementById('search-result-label')) {
      const searchLabel = document.createElement('h5');
      searchLabel.setAttribute('id', 'search-result-label');
      searchLabel.setAttribute('class', 'mt-3');
      searchLabel.innerHTML = 'Search result for "';
      searchForm.appendChild(searchLabel);

      const searchName = document.createElement('span');
      searchName.setAttribute('id', 'search-result-name');
      searchLabel.appendChild(searchName);
    }

    document.getElementById('search-result-name').innerHTML = `${searchInputValue}":`;

    const gifs = await Gifs.getGifs({
      api_key: 'Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2',
      q: searchInputValue,
      limit: '15',
      offset: '0',
      rating: 'G',
      lang: 'en'
    });

    for (let key = 0; key < gifs.data.length; key += 1) {
      html += `<a id="gif"  href="/gif/${gifs.data[key].id}" ><img src=${gifs.data[key].images.fixed_height_small.url} 
        alt="${gifs.data[key].title}" class="m-1 img-thumbnail"/></a>`;
    }

    html += '<div id="gif-container"></div>';


    html += `<br/><input type="button" id="more-btn" 
        value="More gifs!" class="btn btn-success mt-2 mb-4" >`;

    const searchButton = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');

    searchInput.addEventListener('keydown', () => {
      searchButton.disabled = !(searchInput.value.length > 1);
    });
    return html;
  }
};

export default Search;

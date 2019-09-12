import Home from './Home.js';
import getGifs from './api.js';
import router from './app.js';

const Search = {
  render: async () => {
    let html = '';
    const searchForm = document.getElementById('search-form');
    searchForm.style.display = 'block';

    if (searchForm.innerHTML === '') {
      Home.render();
    }

    let searchInputValue = window.location.search.split('=')[1];
    searchInputValue = searchInputValue.split('%20').join(' ');

    document.getElementById('search-input').setAttribute('value', searchInputValue);

    if (!document.getElementById('search-result-label')) {
      searchForm.innerHTML += `<h5 id="search-result-label" class="mt-3">
        Search result for "<span id="searchRequestValue"></span>":<br/></h5>`;
    }

    document.getElementById('searchRequestValue').innerHTML = searchInputValue;

    const gifs = await getGifs({ searchInputValue });

    for (let key = 0; key < gifs.data.length; key += 1) {
      html += `<a id="gif" href="/gif/${gifs.data[key].id}"><img src=${gifs.data[key].images.fixed_height_small.url} 
                  class="m-1 img-thumbnail"/></a>`;
    }

    html += '<div id="gif-container"></div>';

    if (!document.getElementById('more-btn')) {
      html += `<br/><input type="button" id="more-btn" 
        value="More gifs!" class="btn btn-success mt-2 mb-4" >`;
    }

    const searchButton = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');

    searchInput.addEventListener('keydown', () => {
      searchButton.disabled = !(searchInput.value.length > 1);
    });

    document.getElementById('search-btn').addEventListener('click', () => {
      window.history.pushState({}, '', `/search?q=${searchInput.value}`);
      router(searchInput);
    });
    return html;
  }
};

export default Search;

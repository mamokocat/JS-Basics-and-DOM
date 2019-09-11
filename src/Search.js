import router from './app.js';
import Home from './Home.js';

const Search = {
  render: () => {
    const searchResultPlaceHolder = document.getElementById('search-result');

    document.getElementById('search-form').style.display = 'block';

    if (document.getElementById('search-form').innerHTML === '') {
      Home.render();
    }

    let searchInputValue = window.location.search.split('=')[1];
    searchInputValue = searchInputValue.split('%20').join(' ');

    searchResultPlaceHolder.innerHTML = '';
    document.getElementById('search-input').setAttribute('value', searchInputValue);

    if (!document.getElementById('search-result-label')) {
      document.getElementById('search-form').innerHTML += `<h5 id="search-result-label" class="mt-3">
        Search result for "<span id="searchRequestValue"></span>":<br/></h5>`;
    }
    document.getElementById('searchRequestValue').innerHTML = searchInputValue;

    document.getElementById('search-input').addEventListener('keydown', () => {
      const searchButton = document.getElementById('search-btn');
      const searchInput = document.getElementById('search-input');
      searchButton.disabled = !(searchInput.value.length > 1);
    });

    fetch(`https://api.giphy.com/v1/gifs/search?api_key=Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2&q=
      ${searchInputValue}&limit=50&offset=0&rating=G&lang=en`)
      .then((responce) => responce.json())
      .then((gifs) => {
        let img = '';

        for (let key = 0; key < 10; key += 1) {
          img += `<a id="gif" href="/gif/${gifs.data[key].id}"><img src=${gifs.data[key].images.fixed_height_small.url} 
                      class="m-1 img-thumbnail"/></a>`;
        }

        searchResultPlaceHolder.innerHTML = img;

        const gifContainer = document.createElement('div');
        gifContainer.setAttribute('id', 'gif-container');
        searchResultPlaceHolder.appendChild(gifContainer);


        if (!document.getElementById('more-btn')) {
          document.getElementById('search-result').innerHTML += `<input type="button" id="more-btn" 
            value="More gifs!" class="btn btn-success mt-2 mb-4" >`;
        }

        document.getElementById('gif').addEventListener('click', (event) => {
          event.preventDefault();
          window.history.pushState({}, '', document.getElementById('gif').href);
          router();
        });

        document.getElementById('more-btn').addEventListener('click', () => {
          const gifsAmount = document.getElementsByTagName('img').length;
          searchInputValue = searchInputValue.split('%20').join(' ');
          fetch(`https://api.giphy.com/v1/gifs/search?api_key=Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2&q=
            ${searchInputValue}&limit=50&offset=${gifsAmount}&rating=G&lang=en`)
            .then((responce) => responce.json())
            .then((moreGifs) => {
              let moreImg = '';

              for (let key = 0; key < 10; key += 1) {
                moreImg += `<a id="gif" href="/gif/${moreGifs.data[key].id}"><img src=
                  ${moreGifs.data[key].images.fixed_height_small.url} class="m-1 img-thumbnail"/></a>`;
              }

              document.getElementById('gif-container').innerHTML += moreImg;
            });
        });
      });

    document.getElementById('search-btn').addEventListener('click', () => {
      const searchInput = document.getElementById('search-input');
      window.history.pushState({}, '', `/search?q=${searchInput.value}`);
      router(searchInput);
    });
  }
};


export default Search;

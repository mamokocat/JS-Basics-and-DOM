const Search = {
  render: () => {
    const searchResultPlaceHolder = document.getElementById('search-result');

    let searchInputValue = window.location.search.split('=')[1];
    searchInputValue = searchInputValue.split('%20').join(' ');

    searchResultPlaceHolder.innerHTML = '';
    document.getElementById('search-input').setAttribute('value', searchInputValue);

    if (!document.getElementById('search-result-label')) {
      document.getElementById('search-form').innerHTML += `<h5 id="search-result-label" class="mt-3">
        Search result for "<span id="searchRequestValue"></span>":<br/></h5>`;
    }
    document.getElementById('searchRequestValue').innerHTML = searchInputValue;

    fetch(`https://api.giphy.com/v1/gifs/search?api_key=Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2&q=
      ${searchInputValue}&limit=25&offset=0&rating=G&lang=en`)
      .then((responce) => responce.json()).then((gifs) => {
        let img = '';

        for (const key in gifs.data) {
          img += `<a id="gif" title="${gifs.data[key].id}" href="javascript:void(0)"><img src=${gifs.data[key].images.fixed_height_small.url} 
                      class="m-1 img-thumbnail"/></a>`;
        }

        searchResultPlaceHolder.innerHTML = img;
      });
  }
};


export default Search;

function showGifs(searchInput, gifsJson) {
  let html = '';
  const gifs = JSON.parse(gifsJson).data;
  document.getElementById('search-result').setAttribute('class', 'mt-3');
  html += `<h4>Search result for "${searchInput.value}":<br/></h4>`;

  for (const key in gifs) {
    html += `<img src=${gifs[key].images.fixed_height_small.url} 
            id="gif" class="m-1 img-thumbnail"  
            onclick="searchGif(${gifs[key].id})"/>`;
  }

  return html;
}

const Search = {
  render: (searchInput) => {
    const searchResultPlaceHolder = document.getElementById('search-result');
    searchResultPlaceHolder.innerHTML = '';
    searchResultPlaceHolder.setAttribute('class', 'mt-3');

    document.getElementById('search-input').setAttribute('value', searchInput);
    searchResultPlaceHolder.innerHTML += `<h4>Search result for "${searchInput.value}":<br/></h4>`;
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2&q=${searchInput.value}&limit=25&offset=0&rating=G&lang=en`, {})
      .then((responce) => {
        if (!responce.ok) {
          throw new Error(`Error: ${responce.status}`);
        }
        return responce.json();
      }).then((gifs) => {
        let img = '';
        for (const key in gifs.data) {
          img += `<img src=${gifs.data[key].images.fixed_height_small.url} 
                      id="gif" class="m-1 img-thumbnail"  
                      onclick="searchGif(${gifs.data[key].id})"/>`;
        }
        searchResultPlaceHolder.innerHTML += img;
      });
  }
};

/* const Search = {
  render: async (searchInput) => {
    const Http = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/search?api_key=Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2&q=${searchInput.value}&limit=25`;
    Http.open('GET', url);
    Http.send();
    if (Http.status === 200) {
      return Http.responseText);
    }
  }
}; */


export default Search;

import * as parse from './Parse.js';

export async function getGifs(searchInputValue) {
  const queryParams = {
    q: searchInputValue,
    limit: '15',
    offset: '0',
    rating: 'G',
    lang: 'en',
  };
  const response = await fetch(`https://api.giphy.com/v1/gifs/search${parse.getApiQuery(queryParams)}`);
  const gifsList = response.json();
  return gifsList;
}

export async function getMoreGifs(urlParams) {
  const queryParams = {
    q: urlParams.searchInputValue,
    limit: '15',
    offset: urlParams.gifsAmount,
    rating: 'G',
    lang: 'en',
  };
  const response = await fetch(`https://api.giphy.com/v1/gifs/search${parse.getApiQuery(queryParams)}`);
  const gifsList = response.json();
  return gifsList;
}

export async function getGif(id, urlParams) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/${id + parse.getApiQuery(urlParams)}`);
  const gif = response.json();
  return gif;
}


export default { getGifs, getGif, getMoreGifs };

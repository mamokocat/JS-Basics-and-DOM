import * as parse from './Utils.js';

export async function getGifs(urlParams) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/search${parse.getApiQuery(urlParams)}`);
  const gifsList = response.json();
  return gifsList;
}

export async function getMoreGifs(urlParams) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/search${parse.getApiQuery(urlParams)}`);
  const gifsList = response.json();
  return gifsList;
}

export async function getGif(id, urlParams) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/${id + parse.getApiQuery(urlParams)}`);
  const gif = response.json();
  return gif;
}


export default { getGifs, getGif, getMoreGifs };

function getQuery(urlParams) {
  let url = '';
  url += urlParams.id || 'search';
  url += '?api_key=Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2';
  if (urlParams.id) {
    return url;
  }
  url += `&q=${urlParams.searchInputValue}&limit=`;
  url += `&limit=${urlParams.limit || '15'}`;
  url += `&offset=${urlParams.gifsAmount || '0'}`;
  url += '&rating=G&lang=en';
  return url;
}

export async function getGifs(urlParams) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/${getQuery(urlParams)}`);
  const gifsList = response.json();
  return gifsList;
}

export async function getMoreGifs(urlParams) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/${getQuery(urlParams)}`);
  const gifsList = response.json();
  return gifsList;
}

export async function getGif(urlParams) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/${getQuery(urlParams)}`);
  const gif = response.json();
  return gif;
}

export default { getGifs, getMoreGifs, getGif };

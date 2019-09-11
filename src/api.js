export async function getGifs(searchInputValue) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2&q=
  ${searchInputValue}&limit=50&offset=0&rating=G&lang=en`);
  const gifsList = response.json();
  return gifsList;
}

export async function getMoreGifs(searchInputValue, gifsAmount) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2&q=
  ${searchInputValue}&limit=50&offset=${gifsAmount}&rating=G&lang=en`);
  const gifsList = response.json();
  return gifsList;
}

export async function getGif(id) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2`);
  const gif = response.json();
  return gif;
}

export default { getGifs, getMoreGifs, getGif };

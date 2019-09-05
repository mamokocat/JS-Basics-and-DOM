function gifInfo(gifJson) {
  const gif = JSON.parse(gifJson);
  let html = '';
  for (let index = 0; index < 36; index++) {
    html += `<img src=${gif.data.images.fixed_height_small.url} class="m-1"/>`;
  }
  document.getElementById('content').innerHTML = html;
}

function searchGif(id) {
  const Http = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/${id}?api_key=Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2`;

  Http.open('GET', url);
  Http.send();
  Http.onload = function () {
    gifInfo(Http.responseText);
  };
}

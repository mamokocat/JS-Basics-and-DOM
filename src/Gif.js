import router from './app.js';

const Gif = {
  render: () => {
    document.getElementById('search-form').style.display = 'none';
    let id = window.location.pathname.split('/');
    id = id[id.length - 1];

    const gifContainer = document.getElementById('search-result');
    gifContainer.innerHTML = '';

    fetch(`https://api.giphy.com/v1/gifs/${id}?api_key=Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2`)
      .then((responce) => responce.json()).then((gif) => {
        const gifObject = gif.data;
        gifContainer.innerHTML += `<video src="${gifObject.images.original.mp4}" autoplay loop/><br/>`;
        gifContainer.innerHTML += `<div> <strong>Title:</strong> ${gifObject.title} <br/>`;

        if (gifObject.user) {
          gifContainer.innerHTML += `<strong>Author:</strong> <span><img width="70px" src="${gifObject.user.avatar_url || null}" />
            ${gifObject.user.display_name}</span><div>`;
        }

        gifContainer.innerHTML += '<input type="button" id="back-btn" value="Back to search" class="btn btn-danger mt-4" >';

        document.getElementById('back-btn').addEventListener('click', () => {
          if (window.history.length === 2) {
            window.history.pushState({}, '', '/');
            router();
          } else {
            window.history.back();
          }
        });
      });
  },
};

export default Gif;

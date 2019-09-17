import * as Gifs from './api.js';
import * as Parse from './Parse.js';
import RouteHandler from './router.js';

const Gif = {
  render: async () => {
    const id = Parse.getGifUrl(window.location.pathname);
    const gifContainer = document.createElement('div');
    const gif = await Gifs.getGif(id, { api_key: 'Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2' });
    const gifObject = gif.data;

    gifContainer.innerHTML += `<video src="${gifObject.images.original.mp4}" autoplay loop muted></video>`;

    const gifInfo = document.createElement('div');
    gifInfo.setAttribute('class', 'text-center');
    gifInfo.innerHTML += `<strong>Title:</strong> ${gifObject.title} <br/>`;

    if (gifObject.user) {
      gifInfo.innerHTML += `<strong>Author:</strong> <span><img width="70px" src="${gifObject.user.avatar_url}" />
            ${gifObject.user.display_name}</span><br/>`;
    }

    const backButton = document.createElement('input');
    backButton.setAttribute('type', 'button');
    backButton.setAttribute('id', 'back-btn');
    backButton.setAttribute('value', 'Okay, let\'s go back');
    backButton.setAttribute('class', 'btn btn-danger mt-3');
    backButton.addEventListener('click', () => {
      RouteHandler.goBack();
    });

    gifInfo.appendChild(backButton);

    gifContainer.appendChild(gifInfo);
    return gifContainer;
  },
};

export default Gif;

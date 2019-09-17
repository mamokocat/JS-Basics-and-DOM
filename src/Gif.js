import * as Gifs from './api.js';
import * as Parse from './Utils.js';
import RouteHandler from './router.js';

const Gif = {
  render: async (isFirstEntry) => {
    const id = Parse.parseGifUrl(window.location.pathname);
    const gifContainer = document.createElement('div');
    const gif = await Gifs.getGif(id, {});
    const gifObject = gif.data;

    const gifBlock = document.createElement('video');
    gifBlock.setAttribute('controls', '');
    gifBlock.setAttribute('autoplay', '');
    gifBlock.setAttribute('muted', '');
    gifBlock.setAttribute('loop', '');

    const gifMp4 = document.createElement('source');
    gifMp4.setAttribute('src', gifObject.images.original.mp4);

    gifBlock.appendChild(gifMp4);
    gifContainer.appendChild(gifBlock);

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
    backButton.setAttribute('class', 'btn btn-danger mt-1');
    backButton.addEventListener('click', () => {
      if (isFirstEntry) {
        RouteHandler.createRoute('/');
      } else {
        window.history.back();
      }
    });

    gifInfo.appendChild(backButton);

    gifContainer.appendChild(gifInfo);
    return gifContainer;
  },
};

export default Gif;

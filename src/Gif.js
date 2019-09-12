import * as Gifs from './api.js';

const Gif = {
  render: async () => {
    document.getElementById('search-form').style.display = 'none';
    const pathNameParams = window.location.pathname.split('/');
    const id = pathNameParams[pathNameParams.length - 1];
    let html = '';

    const gif = await Gifs.getGif(id, {
      api_key: 'Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2',
    });
    const gifObject = gif.data;
    html += `<video src="${gifObject.images.original.mp4}" autoplay loop></video><br/>`;
    html += `<div> <strong>Title:</strong> ${gifObject.title} <br/>`;

    if (gifObject.user) {
      html += `<strong>Author:</strong> <span><img width="70px" src="${gifObject.user.avatar_url}" />
            ${gifObject.user.display_name}</span><div>`;
    }

    html += '<input type="button" id="back-btn" value="Back to search" class="btn btn-danger mt-4" >';

    return html;
  }
};

export default Gif;

import RouteHandler from './router.js';

const Home = {
  render: (text) => {
    const searchForm = document.createElement('div');
    searchForm.setAttribute('id', 'search-form');
    searchForm.style.display = 'block';

    const searchBoxTitle = document.createElement('h4');
    searchBoxTitle.innerText = 'Type what are you want to find:';
    searchForm.appendChild(searchBoxTitle);

    const searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('id', 'search-input');
    searchInput.setAttribute('class', 'form-control');
    searchInput.setAttribute('value', text || 'Type here to search');
    searchForm.appendChild(searchInput);

    const searchButton = document.createElement('input');
    searchButton.setAttribute('type', 'button');
    searchButton.setAttribute('id', 'search-btn');
    searchButton.setAttribute('value', 'Search');
    searchButton.setAttribute('class', 'btn btn-danger mt-2');
    searchButton.setAttribute('disabled', 'true');
    searchForm.appendChild(searchButton);

    searchButton.addEventListener('click', () => {
      RouteHandler.createRoute(`/search?q=${searchInput.value}`);
    });

    searchInput.addEventListener('keydown', () => {
      searchButton.disabled = searchInput.value.length < 1;
    });

    return searchForm;
  },
};

export default Home;

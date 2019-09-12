import * as Parse from './Utils.js';
import router from './app.js';

const Home = {
  render: () => {
    document.getElementById('search-result').innerHTML = '';
    const searchForm = document.getElementById('search-form');

    searchForm.style.display = 'block';
    searchForm.innerHTML = `<h4>Type what are you want to find:</h4>
    <input type="text" id="search-input" class="form-control">
    <input type="button" id="search-btn" value="Search" class="search-btn btn btn-danger mt-2" disabled> `;

    const searchButton = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');

    searchButton.addEventListener('click', () => {
      console.log('search');
      window.history.pushState({}, '', Parse.getSearchQuery(searchInput.value));
      router();
    });
    searchInput.addEventListener('keydown', () => {
      searchButton.disabled = searchInput.value.length < 1;
    });
  }
};

export default Home;

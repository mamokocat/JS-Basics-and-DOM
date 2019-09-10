import router from './app.js';

const Home = {
  render: () => {
    document.getElementById('search-result').innerHTML = '';
    const searchForm = document.getElementById('search-form');

    searchForm.innerHTML = `<h4>Type what are you want to find:</h4>
    <input type="text" id="search-input" class="form-control">
    <input type="button" id="search-btn" value="Search" class="search-btn btn btn-danger mt-2" > `;

    document.getElementById('search-btn').addEventListener('click', () => {
      console.log('search');
      const searchInput = document.getElementById('search-input');
      window.history.pushState({}, '', `/search?q=${searchInput.value}`);
      router(searchInput);
    });
  }
};

export default Home;

const Home = {
  render: () => {
    const html = `<h4>Type what are you want to find:</h4>
    <input type="text" id="search-input" class="form-control">
    <input type="button" id="search-btn" value="Search!" class="btn btn-danger mt-2" 
    > </br>`;
    document.getElementById('search-form').innerHTML = html;
  }
};

export default Home;

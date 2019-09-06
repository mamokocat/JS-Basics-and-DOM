const Navbar = {
  render: async () => {
    const view = ` <nav class="navbar bg-dark navbar-dark">
    <a class="navbar-brand text-white" id="home">GifSearch</a>
</nav>`;
    return view;
  },
  after_render: async () => {}
};

export default Navbar;

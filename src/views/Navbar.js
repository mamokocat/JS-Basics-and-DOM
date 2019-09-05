const Navbar = {
  render: async () => {
    const view = ` <nav class="navbar bg-dark navbar-dark">
    <a class="navbar-brand" href="/">GifSearch</a>
</nav>`;
    return view;
  },
  after_render: async () => {}
};

export default Navbar;

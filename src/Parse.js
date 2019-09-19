export function parseSearchQuery() {
  let value = decodeURI(window.location.search);
  value = value.split('=')[1];
  return value.slice(0, value.length - 1);
}

export function getResourse(pathname) {
  console.log(`pathname: ${pathname}`);
  const paths = pathname.split('/');
  console.log(`paths: ${paths}`);
  console.log(`path: ${paths[2]}`);
  return paths[2];
}

export function getGifUrl(pathname) {
  const paths = pathname.split('/');
  return paths[paths.length - 1];
}

export default {
  parseSearchQuery,
  getResourse,
  getGifUrl,
};

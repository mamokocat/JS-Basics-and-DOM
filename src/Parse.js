export function parseSearchQuery() {
  const value = decodeURI(window.location.search);
  return value.split('=')[1];
}

export function getResourse(pathname) {
  const paths = pathname.split('/');
  return paths[1];
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

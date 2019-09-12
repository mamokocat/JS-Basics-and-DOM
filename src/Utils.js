export function getApiQuery(urlParams) {
  let url = '?';
  if (urlParams.id) {
    return url;
  }
  Object.entries(urlParams).forEach(([key, value]) => {
    url += `&${key}=${value}`;
  });

  return url;
}


export function getSearchQuery(searchInput) {
  return `/search?q=${encodeURI(searchInput)}`;
}

export function parseSearchQuery() {
  const value = decodeURI(window.location.search);
  return value.split('=')[1];
}

export default { getApiQuery, getSearchQuery, parseSearchQuery };

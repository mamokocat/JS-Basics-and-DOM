export function getApiQuery(queryParams) {
  let url = '?';
  const params = queryParams;
  params.api_key = 'Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2';
  Object.entries(params).forEach(([key, value]) => {
    url += `${key}=${value}&`;
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

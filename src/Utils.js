function parseUrl(url) {
  const parsedUrl = url.substr(1).split('/');
  return `/${parsedUrl[0]}`;
}

export default parseUrl;

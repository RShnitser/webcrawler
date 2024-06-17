function normailizeUrl(url) {
  const urlObj = new URL(url);
  let path = urlObj.pathname;
  if (path[path.length - 1] === "/") {
    path = path.slice(0, path.length - 1);
  }
  return urlObj.hostname + path;
}

export { normailizeUrl };

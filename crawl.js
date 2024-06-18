import { JSDOM } from "jsdom";

function normailizeUrl(url) {
  const urlObj = new URL(url);
  let path = urlObj.pathname;
  if (path[path.length - 1] === "/") {
    path = path.slice(0, path.length - 1);
  }
  return urlObj.hostname + path;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody);
  const anchors = dom.window.document.querySelectorAll("a");
  const result = [];
  for (const a of anchors) {
    const href = new URL(a.href, baseURL).href;
    result.push(href);
  }

  return result;
}

export { normailizeUrl, getURLsFromHTML };

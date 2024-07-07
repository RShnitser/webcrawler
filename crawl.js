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

async function fetchUrlText(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error("invalid response");
      return;
    }

    if (
      !response.headers.get("content-type") ||
      !response.headers.get("content-type").includes("text/html")
    ) {
      console.error("invalid header");
      return;
    }
    const text = await response.text();
    //console.log(text);
    return text;
  } catch (e) {
    console.error(e.message);
  }
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  const baseObj = new URL(baseURL);
  const currObj = new URL(currentURL);
  if (baseObj.hostname !== currObj.hostname) {
    return pages;
  }
  const normalized = normailizeUrl(currentURL);
  if (normalized in pages) {
    pages[normalized]++;
    return pages;
  }
  pages[normalized] = 1;
  let html = "";
  try {
    html = await fetchUrlText(currentURL);
  } catch (e) {
    console.error(e.message);
    return pages;
  }
  const urls = getURLsFromHTML(html, baseURL);
  //console.log(urls);
  for (const url of urls) {
    pages = await crawlPage(baseURL, url, pages);
  }
  return pages;
}

export { normailizeUrl, getURLsFromHTML, crawlPage };

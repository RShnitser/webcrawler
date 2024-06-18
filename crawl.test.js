import { test, expect } from "@jest/globals";
import { getURLsFromHTML, normailizeUrl } from "./crawl";

test("normalize url", () => {
  expect(normailizeUrl("https://blog.boot.dev/path/")).toBe(
    "blog.boot.dev/path"
  );
  expect(normailizeUrl("https://blog.boot.dev/path")).toBe(
    "blog.boot.dev/path"
  );
  expect(normailizeUrl("http://blog.boot.dev/path/")).toBe(
    "blog.boot.dev/path"
  );
  expect(normailizeUrl("http://blog.boot.dev/path")).toBe("blog.boot.dev/path");
});

test("urls from html", () => {
  expect(
    getURLsFromHTML(
      '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>',
      "https://blog.boot.dev"
    )
  ).toStrictEqual(["https://blog.boot.dev/"]);
});

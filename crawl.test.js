import { test, expect } from "@jest/globals";
import { normailizeUrl } from "./crawl";

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

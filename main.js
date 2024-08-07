import { argv } from "process";
import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

async function main() {
  if (argv.length < 3) {
    console.error("please provide a website");
    return;
  }

  if (argv.lengh > 4) {
    console.error("too many arguments");
    return;
  }

  const baseURL = argv[2];
  console.log(`crawler starting with at url ${baseURL}`);

  const pages = await crawlPage(baseURL);
  printReport(pages);
}

main();

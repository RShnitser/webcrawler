export function printReport(pages) {
  console.log("Starting report");
  const entries = Object.entries(pages);
  const sorted = entries.sort((a, b) => {
    return b[1] - a[1];
  });

  for (const [url, count] of sorted) {
    console.log(`Found ${count} internal links to ${url}`);
  }
}

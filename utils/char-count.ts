export const charCount = (text: string) => {
  const inputLines = text.split('\n');

  const wrappedLines: string[] = [];
  for (const inputLine of inputLines) {
    if (inputLine === "") {
      wrappedLines.push("");
      continue;
    }
    let line = inputLine;
    while (line.length > 60) {
      let breakAt = line.lastIndexOf(' ', 60);
      if (breakAt === -1 || breakAt === 0) breakAt = 60;
      wrappedLines.push(line.slice(0, breakAt).trimEnd());
      line = line.slice(breakAt).trimStart();
    }
    wrappedLines.push(line);
  }

  const pages: string[] = [];
  for (let i = 0; i < wrappedLines.length; i += 25) {
    const pageLines = wrappedLines.slice(i, i + 25);
    pages.push(pageLines.join('\n'));
  }

  console.log("[charCount] Total pages:", pages.length);
  console.log("[charCount] Pages:", pages);

  return { pages, pageCount: pages.length };
};
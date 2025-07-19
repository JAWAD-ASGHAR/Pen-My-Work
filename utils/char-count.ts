export const charCount = (text: string) => {
  const linesWithMax50Chars = text
    .split('\n')
    .flatMap(line => {
      const words = line.split(' ');
      const chunks = [];
      let currentLine = '';

      for (const word of words) {
        if ((currentLine.length ? currentLine.length + 1 : 0) + word.length > 50) {
          if (currentLine) {
            chunks.push(currentLine);
          }
          if (word.length > 50) {
            for (let i = 0; i < word.length; i += 50) {
              chunks.push(word.slice(i, i + 50));
            }
            currentLine = '';
          } else {
            currentLine = word;
          }
        } else {
          currentLine = currentLine ? currentLine + ' ' + word : word;
        }
      }
      if (currentLine) {
        chunks.push(currentLine);
      }
      return chunks.length ? chunks : [""];
    });

  const pages = [];
  for (let i = 0; i < linesWithMax50Chars.length; i += 25) {
    const pageLines = linesWithMax50Chars.slice(i, i + 25);
    pages.push(pageLines.join('\n'));
  }
  return { pages, pageCount: pages.length };
};
export const charCount = (text: string, style: string) => {
  const inputLines = text.split('\n');

  const wrappedLines: string[] = [];
  
  // Apply style-specific text processing
  switch (style.toLowerCase()) {
    case 'caveat':
      // Caveat style: 60 characters per line, 25 lines per page
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
      break;
      
    case 'gloria':
      // Gloria Hallelujah style: placeholder for future implementation
      // TODO: Implement gloria-specific logic
      for (const inputLine of inputLines) {
        if (inputLine === "") {
          wrappedLines.push("");
          continue;
        }
        let line = inputLine;
        while (line.length > 42) {
          let breakAt = line.lastIndexOf(' ', 42);
          if (breakAt === -1 || breakAt === 0) breakAt = 42;
          wrappedLines.push(line.slice(0, breakAt).trimEnd());
          line = line.slice(breakAt).trimStart();
        }
        wrappedLines.push(line);
      }
      break;
      
    case 'patrick':
      // Patrick Hand style: placeholder for future implementation
      // TODO: Implement patrick-specific logic
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
      break;
      
    case 'permanent-marker':
      // Permanent Marker style: placeholder for future implementation
      // TODO: Implement permanent-marker-specific logic
      for (const inputLine of inputLines) {
        if (inputLine === "") {
          wrappedLines.push("");
          continue;
        }
        let line = inputLine;
        while (line.length > 42) {
          let breakAt = line.lastIndexOf(' ', 42);
          if (breakAt === -1 || breakAt === 0) breakAt = 42;
          wrappedLines.push(line.slice(0, breakAt).trimEnd());
          line = line.slice(breakAt).trimStart();
        }
        wrappedLines.push(line);
      }
      break;
      
    case 'reenie-beanie':
      // Reenie Beanie style: placeholder for future implementation
      // TODO: Implement reenie-beanie-specific logic
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
      break;
      
    case 'shadows-into-light':
      // Shadows Into Light style: placeholder for future implementation
      // TODO: Implement shadows-into-light-specific logic
      for (const inputLine of inputLines) {
        if (inputLine === "") {
          wrappedLines.push("");
          continue;
        }
        let line = inputLine;
        while (line.length > 57) {
          let breakAt = line.lastIndexOf(' ', 57);
          if (breakAt === -1 || breakAt === 0) breakAt = 57;
          wrappedLines.push(line.slice(0, breakAt).trimEnd());
          line = line.slice(breakAt).trimStart();
        }
        wrappedLines.push(line);
      }
      break;
      
    case 'edu-sa-hand':
      // Edu SA Hand style: placeholder for future implementation
      // TODO: Implement edu-sa-hand-specific logic
      for (const inputLine of inputLines) {
        if (inputLine === "") {
          wrappedLines.push("");
          continue;
        }
        let line = inputLine;
        while (line.length > 48) {
          let breakAt = line.lastIndexOf(' ', 48);
          if (breakAt === -1 || breakAt === 0) breakAt = 48;
          wrappedLines.push(line.slice(0, breakAt).trimEnd());
          line = line.slice(breakAt).trimStart();
        }
        wrappedLines.push(line);
      }
      break;
      
    default:
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
      break;
  }

  const pages: string[] = [];
  for (let i = 0; i < wrappedLines.length; i += 25) {
    const pageLines = wrappedLines.slice(i, i + 25);
    pages.push(pageLines.join('\n'));
  }

  return { pages, pageCount: pages.length };
};
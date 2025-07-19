import fs from "fs/promises";

export const encodeImage = async (filePath: string): Promise<string> => {
  const imageBuffer = await fs.readFile(filePath);
  return imageBuffer.toString("base64");
};

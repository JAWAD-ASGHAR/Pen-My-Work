"use server"

export const generateSystemMessage = async (
  pageText: string,
  ink: string,
  paper: string,
  additionalQueries: string
): Promise<string> => {
  const additional = additionalQueries
    ? `\nAdditional instructions: ${additionalQueries}`
    : "";

  return [
    `Create a realistic photo of a handwritten assignment on ${paper} notebook paper.`,
    `The handwriting should look like neat student handwriting in ${ink} ink.`,
    ``,
    `Use the exact following text content. Preserve all line breaks exactly as given, including mid-word or awkward breaks.`,
    `Do not add or remove any words or lines.`,
    `Write the text naturally on the ${paper} lines, as a student would write in a notebook.`,
    additional,
    ``, 
    `Text:`,
    pageText
  ].join("\n");
};

export const generateImages = async (pages: string[], ink: string, paper: string, additionalQueries: string) => {
  try {
    console.log("pages", pages);
    let systemMessages = [];
    for (const page of pages) {
      const systemMessage = await generateSystemMessage(page, ink, paper, additionalQueries);
      systemMessages.push(systemMessage);
    }
    
    console.log("systemMessages", systemMessages);
    
    // TODO: Implement actual image generation logic here
    // For now, return a placeholder
    return {
      success: true,
      message: "Image generation completed",
      systemMessages
    };
  } catch (error) {
    console.error("Error generating images:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}; 

"use server"

import { AuthenticatedUser, protectedAction } from "@/lib/auth-middleware";
import { OpenAIAdapter } from "@/llm/openai-adapter";
import { assignment, db } from "@/src/db";

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

export const generateImages = protectedAction(async (user: AuthenticatedUser, pages: string[], ink: string, paper: string, additionalQueries: string) => {
  try {
    console.log("pages", pages);
    let systemMessages = [];
    for (const page of pages) {
      const systemMessage = await generateSystemMessage(page, ink, paper, additionalQueries);
      systemMessages.push(systemMessage);
    }
    
    console.log("systemMessages", systemMessages);
    console.log("paper", paper);
    console.log("systemMessages[0]", systemMessages[0]);

    const openaiAdapter = new OpenAIAdapter();
    const imageURLs = [];
    for (const systemMessage of systemMessages) {
      const images = await openaiAdapter.generateImages(systemMessage, "ruled", user.id);
      if (images.success && images.url) {
        imageURLs.push(images.url);
      }
    }
    console.log("imageURLs", imageURLs);
    const assignmentData = await db.insert(assignment).values({
        userId: user.id,
        imageURLs: imageURLs,
        paper: paper,
        ink: ink, 
        text: pages.join("\n"),
        specialQuery: additionalQueries || null,
        createdAt: new Date(),
        updatedAt: new Date(),
    }).returning();
    console.log("assignmentData", assignmentData);
    return {
      success: true,
      message: "Image generation completed",
      assignmentData: assignmentData
    };
  } catch (error) {
    console.error("Error generating images:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}); 

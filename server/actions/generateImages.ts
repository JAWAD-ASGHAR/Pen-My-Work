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
    `Generate a photorealistic image of ${paper == 'blank' ? 'blank white A4 paper (no lines, no grid)' : paper} paper with handwritten text.`,
    `The text should be written in ${ink} ink with neat student handwriting style.`,
    `The handwriting should look natural and realistic, as if written by a student.`,
    ``,
    `IMPORTANT: Start writing from the very top of the page. Do not leave any empty space at the top.`,
    `Use consistent, normal-sized handwriting. Do not make the text too large or too small.`,
    `Maintain consistent line spacing throughout the page.`,
    ``,
    `Use the exact following text content. Preserve all line breaks exactly as given, including mid-word or awkward breaks.`,
    `Do not add or remove any words or lines.`,
    `Write the text naturally on the ${paper}, as a student would write in a notebook.`,
    additional,
    ``, 
    `Text to include:`,
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

        const openaiAdapter = new OpenAIAdapter();
        const imageURLs = [];
        for (const systemMessage of systemMessages) {
            const images = await openaiAdapter.generateImages(systemMessage, paper as "grid" | "ruled" | "blank", user.id);
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

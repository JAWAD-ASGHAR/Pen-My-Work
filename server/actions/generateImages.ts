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

  const ruledPaperInstructions = paper === 'ruled' 
    ? `For ruled paper: Write only within the ruled lines. Do not write in the left margin area outside the lines. Align text to start at the left edge of the ruled lines.`
    : "";

  return [
    `Generate a photorealistic image of ${paper == 'blank' ? 'blank white A4 paper (no lines, no grid)' : paper} paper with handwritten text.`,
    `The text should be written in ${ink} ink with neat student handwriting style.`,
    `The handwriting should look natural and realistic, as if written by a student.`,
    ``,
    `IMPORTANT: Start writing from the begining of the page.`,
    `Use consistent, normal-sized handwriting. Do not make the text too large or too small.`,
    `Maintain consistent line spacing throughout the page.`,
    ruledPaperInstructions,
    ``,
    `CRITICAL: Write exactly the text provided below. Do not add, remove, or modify any words, punctuation, or formatting.`,
    `Do not make assumptions about what should be written. Write only what is explicitly given.`,
    `Preserve all line breaks, spaces, and formatting exactly as provided in the text.`,
    `Do not complete sentences, add context, or fill in missing information.`,
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
            console.log("systemMessage", systemMessage);
            console.log("paper", paper);

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
            assignmentData: [
                {
                    id: "5a94a70b-3038-4671-a822-ef39f9d425b0",
                    imageURL: ["https://handwritten-assignments.s3.us-east-1.amazonaws.com/generated/1726790400000/1726790400000.png"],
                    paper: paper,
                    ink: ink,
                    text: pages.join("\n"),
                    specialQuery: additionalQueries || null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ]
        };
    } catch (error) {
        console.error("Error generating images:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error occurred"
        };
    }
}); 

"use server"

import { AuthenticatedUser, protectedAction } from "@/lib/auth-middleware";
import { OpenAIAdapter } from "@/llm/openai-adapter";
import { assignment, db } from "@/src/db";

export const generateSystemMessage = async (
  pageText: string,
  ink: string,
  paper: string,
  additionalQueries: string,
  isReferenceImageProvided: boolean = false
): Promise<string> => {
  const additional = additionalQueries
    ? `\nAdditional instructions: ${additionalQueries}`
    : "";

  const ruledPaperInstructions = paper === 'ruled' 
    ? `For ruled paper: Write only within the ruled lines. Do not write in the left margin area outside the lines. Align text to start at the left edge of the ruled lines.`
    : "";

  // Base instructions that apply to all images
  const baseInstructions = [
    `Generate a photorealistic image showing ONLY the entire sheet of ${paper === 'blank' ? 'blank white A4 paper (no lines, no grid)' : paper} paper.`,
    `The image must show the complete page and nothing else. Do NOT include any background, hands, pens, desks, shadows, props, fingers, tables, or any other objects. Only the full page of paper should be visible.`,
    `The paper should contain handwritten text in ${ink} ink, written in a neat student handwriting style.`,
    `The handwriting should look natural and realistic, as if written by a student.`,
    ruledPaperInstructions,
    ``,
    `STRICT: Write exactly the text provided below on the paper. Do not add, remove, or modify any words, punctuation, or formatting.`,
    `Do not make assumptions or add anything extra. Only write what is given.`,
    `Preserve all line breaks, spaces, and formatting exactly as provided in the text.`,
    `Do not complete sentences, add context, or fill in missing information.`,
    `Start writing from the very top/upper left of the page (not centered). If the provided text is less than one page, leave the remaining space on the page empty, do not center the text vertically or horizontally. The text should always begin at the start of the page, and any unused space should remain blank.`,
    `Use consistent, normal-sized handwriting. Do not make the text too large or too small.`,
    `Maintain consistent line spacing throughout the page.`,
  ];

  // Additional instructions for maintaining consistency when reference image is provided
  const consistencyInstructions = isReferenceImageProvided ? [
    ``,
    `CRITICAL CONSISTENCY REQUIREMENTS:`,
    `You have been provided with a reference image showing the previous page. This new page must look like it belongs to the same book/assignment written by the same person.`,
    `Carefully analyze the reference image and match the following characteristics EXACTLY:`,
    `- Font size and letter height: Use the same size handwriting as shown in the reference image`,
    `- Ink color and intensity: Match the exact shade and darkness of the ${ink} ink`,
    `- Writing pressure and stroke thickness: Replicate the same pen pressure and line thickness`,
    `- Letter formation and style: Copy the exact handwriting style, including how letters are formed (loops, curves, angles)`,
    `- Spacing between letters and words: Match the exact spacing patterns`,
    `- Line spacing: Use the same distance between lines of text`,
    `- Margins and positioning: Start writing at the same position and maintain the same margins`,
    `- Paper texture and appearance: Ensure the paper looks identical in texture, color, and quality`,
    `- Overall writing rhythm and flow: The handwriting should feel like it was written in the same session by the same person`,
    ``,
    `This page should be indistinguishable from the reference page in terms of handwriting style, making it look like two consecutive pages from the same notebook or assignment.`,
  ] : [];

  return [
    ...baseInstructions,
    ...consistencyInstructions,
    additional,
    ``,
    `Text to include:`,
    pageText
  ].join("\n");
};

export const generateImages = protectedAction(async (user: AuthenticatedUser, pages: string[], ink: string, paper: string, additionalQueries: string) => {
    try {
        const openaiAdapter = new OpenAIAdapter();
        const imageURLs = [];
        let previousImageUrl: string | undefined = 'https://pbbppplxzyzlvqoenbpc.supabase.co/storage/v1/object/public/handwritten-assignments/generated/HvLQOeABz6MLGBoMNlyBDxa6XgbIamzN/c32a873e-7497-449d-a1c1-31da0450eab9.png';
        
        for (let i = 0; i < pages.length; i++) { 
            const page = pages[i];
            // Generate system message with consistency instructions if reference image is available
            const systemMessage = await generateSystemMessage(
                page, 
                ink, 
                paper, 
                additionalQueries, 
                previousImageUrl ? true : false
            );
            
            console.log(`Generating image ${i + 1}/${pages.length}`);
            console.log("systemMessage", systemMessage);
            console.log("paper", paper);
            
            // Pass the previous image URL as reference for consistent handwriting
            const images = await openaiAdapter.generateImages(
                systemMessage, 
                paper as "grid" | "ruled" | "blank", 
                user.id,
                previousImageUrl
            );
            
            if (images.success && images.url) {
                imageURLs.push(images.url);
                previousImageUrl = images.url;
                console.log(`Image ${i + 1} generated successfully, will use as reference for next image`);
            } else {
                console.error(`Failed to generate image ${i + 1}:`, images.error);
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
            assignmentData
        };
    } catch (error) {
        console.error("Error generating images:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error occurred"
        };
    }
}); 

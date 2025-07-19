import OpenAI from "openai";
import { encodeImage } from "@/utils/imageUtils";
import { supabase } from "@/lib/supbase-client"; 
import { v4 as uuidv4 } from "uuid";
import path from "path";

export class OpenAIAdapter {
    private client: OpenAI;

    constructor() {
        this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
    }

    async generateImages(systemMessage: string, PAGE_TYPE: "grid" | "ruled" | "blank") {
        // Step 1: Choose background
        const baseImageName = {
            grid: "grid_a4.png",
            ruled: "ruled_a4.png",
            blank: "plain_a4.png",
        }[PAGE_TYPE];

        const imagePath = path.resolve("public/", baseImageName);
        console.log("[Step 1] Resolved image path:", imagePath);

        let base64Image;
        try {
            base64Image = await encodeImage(imagePath);
            console.log("[Step 1] Encoded image to base64 successfully.");
        } catch (err) {
            console.error("[Step 1] Failed to encode image:", err);
            return { success: false, error: "Failed to encode image", details: err };
        }
        // const fileId = await createFile(imagePath);

        // Step 2: Call OpenAI to generate
        let response;
        try {
            response = await this.client.responses.create({
                model: "gpt-4.1",
                input: [
                    {
                        role: "user",
                        content: [
                            { type: "input_text", text: systemMessage },
                            {
                                type: "input_image",
                                image_url: `data:image/png;base64,${base64Image}`,
                                detail: "low"
                            }
                        ],
                    },
                ],
                tools: [{ type: "image_generation" }],
            });
            console.log("[Step 2] OpenAI response received:", JSON.stringify(response, null, 2));
        } catch (err) {
            console.error("[Step 2] OpenAI API call failed:", err);
            return { success: false, error: "OpenAI API call failed", details: err };
        }

        // Step 3: Extract image from response
        let imageData;
        try {
            imageData = response.output
                .filter((output) => output.type === "image_generation_call")
                .map((output) => output.result);

            console.log("[Step 3] Extracted image data from response:", imageData);
        } catch (err) {
            console.error("[Step 3] Failed to extract image data:", err);
            return { success: false, error: "Failed to extract image data", details: err };
        }

        if (imageData.length === 0 || !imageData[0]) {
            console.error("[Step 3] No image generated in response.");
            return { success: false, error: "No image generated." };
        }
        const imageBase64 = imageData[0] as string; 
        let imageBuffer;
        try {
            imageBuffer = Buffer.from(imageBase64, "base64");
            console.log("[Step 3] Converted base64 image to buffer.");
        } catch (err) {
            console.error("[Step 3] Failed to convert base64 to buffer:", err);
            return { success: false, error: "Failed to convert base64 to buffer", details: err };
        }

        // Step 4: Upload to Supabase Storage
        const fileName = `generated/${uuidv4()}.png`;
        let uploadResult;
        try {
            uploadResult = await supabase.storage
                .from("handwritten-assignments") 
                .upload(fileName, imageBuffer, {
                    contentType: "image/png",
                    upsert: true,
                });
            if (uploadResult.error) {
                console.error("[Step 4] Upload to Supabase failed:", uploadResult.error);
                return { success: false, error: "Upload failed", details: uploadResult.error };
            }
            console.log("[Step 4] Uploaded image to Supabase Storage:", fileName);
        } catch (err) {
            console.error("[Step 4] Exception during upload to Supabase:", err);
            return { success: false, error: "Upload failed", details: err };
        }

        // Step 5: Return public URL
        let publicUrlData;
        try {
            const { data } = supabase.storage
                .from("handwritten-assignments")
                .getPublicUrl(fileName);
            publicUrlData = data;
            console.log("[Step 5] Got public URL from Supabase:", publicUrlData.publicUrl);
        } catch (err) {
            console.error("[Step 5] Failed to get public URL:", err);
            return { success: false, error: "Failed to get public URL", details: err };
        }

        return { success: true, url: publicUrlData.publicUrl };
    }
}

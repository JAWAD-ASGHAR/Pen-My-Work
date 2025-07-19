import fs from "fs";
import OpenAI, { toFile } from "openai";
import { supabase } from "@/lib/supbase-client"; 
import { v4 as uuidv4 } from "uuid";
import path from "path";

export class OpenAIAdapter {
    private client: OpenAI;

    constructor() {
        this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
    }

    async generateImages(systemMessage: string, PAGE_TYPE: "grid" | "ruled" | "blank", userId: string) {
        // Step 1: Choose background
        const baseImageName = {
            grid: "grid_a4.png",
            ruled: "ruled_a4.png",
            blank: "plain_a4.png",
        }[PAGE_TYPE];

        const imagePath = path.resolve("public/", baseImageName);
        console.log("[Step 1] Resolved image path:", imagePath);

        // Step 2: Prepare image file using toFile
        let imageFile;
        try {
            imageFile = await toFile(fs.createReadStream(imagePath), null, {
                type: "image/png",
            });
            console.log("[Step 2] Created image file using toFile successfully.");
        } catch (err) {
            console.error("[Step 2] Failed to create image file:", err);
            return { success: false, error: "Failed to create image file", details: err };
        }

        // Step 3: Call OpenAI to generate image
        let response;
        try {
            response = await this.client.images.edit({
                model: "gpt-image-1",
                image: imageFile,
                prompt: systemMessage,
                size: "1024x1536",
                quality:"high",
            });
            console.log("[Step 3] OpenAI response received:", JSON.stringify(response, null, 2));
        } catch (err) {
            console.error("[Step 3] OpenAI API call failed:", err);
            return { success: false, error: "OpenAI API call failed", details: err };
        }

        // Step 4: Extract image from response
        if (!response.data || response.data.length === 0) {
            console.error("[Step 4] No image generated in response.");
            return { success: false, error: "No image generated." };
        }

        const imageBase64 = response.data[0].b64_json;
        if (!imageBase64) {
            console.error("[Step 4] No base64 image data in response.");
            return { success: false, error: "No base64 image data in response." };
        }

        let imageBuffer;
        try {
            imageBuffer = Buffer.from(imageBase64, "base64");
            console.log("[Step 4] Converted base64 image to buffer.");
        } catch (err) {
            console.error("[Step 4] Failed to convert base64 to buffer:", err);
            return { success: false, error: "Failed to convert base64 to buffer", details: err };
        }

        // Step 5: Upload to Supabase Storage
        const fileName = `generated/${userId}/${uuidv4()}.png`;
        let uploadResult;
        try {
            uploadResult = await supabase.storage
                .from("handwritten-assignments") 
                .upload(fileName, imageBuffer, {
                    contentType: "image/png",
                    upsert: true,
                });
            if (uploadResult.error) {
                console.error("[Step 5] Upload to Supabase failed:", uploadResult.error);
                return { success: false, error: "Upload failed", details: uploadResult.error };
            }
            console.log("[Step 5] Uploaded image to Supabase Storage:", fileName);
        } catch (err) {
            console.error("[Step 5] Exception during upload to Supabase:", err);
            return { success: false, error: "Upload failed", details: err };
        }

        // Step 6: Return public URL
        let publicUrlData;
        try {
            const { data } = supabase.storage
                .from("handwritten-assignments")
                .getPublicUrl(fileName);
            publicUrlData = data;
            console.log("[Step 6] Got public URL from Supabase:", publicUrlData.publicUrl);
        } catch (err) {
            console.error("[Step 6] Failed to get public URL:", err);
            return { success: false, error: "Failed to get public URL", details: err };
        }
      
        return { success: true, url: publicUrlData.publicUrl };
    }
}

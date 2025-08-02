import fs from "fs";
import axios from "axios";
import path from "path";
import OpenAI, { toFile } from "openai";
import { supabase } from "@/lib/supbase-client";
import { v4 as uuidv4 } from "uuid";

export class OpenAIAdapter {
    private client: OpenAI;

    constructor() {
        this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
    }

    async generateImages(systemMessage: string, PAGE_TYPE: "grid" | "ruled" | "blank", userId: string, referenceImageUrl?: string) {
        const baseImageName = {
            grid: "grid_a4.png",
            ruled: "ruled_a4.png",
            blank: "plain_a4.png",
        }[PAGE_TYPE];

        const baseImagePath = path.resolve("public/", baseImageName);
        const pageImageFile = await toFile(fs.createReadStream(baseImagePath), baseImageName, {
            type: "image/png",
        });

        let imageFiles: File[] = [pageImageFile];

        // Optionally add reference image
        if (referenceImageUrl) {
            try {
                const response = await axios.get(referenceImageUrl, {
                    responseType: "arraybuffer",
                });
                const buffer = Buffer.from(response.data);

                const referenceImageFile = await toFile(buffer, "reference.png", {
                    type: "image/png",
                });

                imageFiles.push(referenceImageFile);
                console.log("[Step 2] Included reference image in image array");
            } catch (err) {
                console.warn("[Step 2] Failed to load reference image from URL, proceeding with just base image:", err);
            }
        }

        // Call OpenAI API with multiple images
        let response;
        try {
            response = await this.client.images.edit({
                model: "gpt-image-1",
                image: imageFiles,
                prompt: systemMessage,
                size: "1024x1536",
                quality: "high",
            });

            console.log("[Step 3] OpenAI response received:", JSON.stringify(response, null, 2));
        } catch (err) {
            console.error("[Step 3] OpenAI API call failed:", err);
            return { success: false, error: "OpenAI API call failed", details: err };
        }

        // Save and upload as before
        if (!response.data?.[0]?.b64_json) {
            return { success: false, error: "No image generated" };
        }

        const imageBuffer = Buffer.from(response.data[0].b64_json, "base64");
        const fileName = `generated/${userId}/${uuidv4()}.png`;

        const upload = await supabase.storage
            .from("handwritten-assignments")
            .upload(fileName, imageBuffer, {
                contentType: "image/png",
                upsert: true,
            });

        if (upload.error) {
            return { success: false, error: "Upload failed", details: upload.error };
        }

        const { data } = supabase.storage
            .from("handwritten-assignments")
            .getPublicUrl(fileName);

        return { success: true, url: data.publicUrl };
    }
}

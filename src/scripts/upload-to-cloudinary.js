import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";

// Load environment variables from .env file
dotenv.config();

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const assetsDir = path.resolve(process.cwd(), "public/assets");

async function uploadImages() {
  console.log("Starting image upload to Cloudinary...");

  try {
    const files = await fs.readdir(assetsDir);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));

    if (imageFiles.length === 0) {
      console.log("No images found in public/assets to upload.");
      return;
    }

    console.log(`Found ${imageFiles.length} images to upload.`);

    for (const file of imageFiles) {
      const filePath = path.join(assetsDir, file);
      const fileName = path.parse(file).name;

      // This public_id matches the structure in your services.jsx file
      const publicId = `kinglaw/services/${fileName}`;

      console.log(`Uploading ${file} with public_id: ${publicId}...`);

      const result = await cloudinary.uploader.upload(filePath, {
        public_id: publicId,
        overwrite: true, // Set to true to overwrite existing images with the same public_id
      });

      console.log(`  ✔ Successfully uploaded. URL: ${result.secure_url}`);
    }

    console.log("\nImage upload process completed!");
  } catch (error) {
    console.error("\nAn error occurred during the upload process:", error);
  }
}

uploadImages();

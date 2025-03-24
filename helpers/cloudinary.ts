import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env. CLOUDINARY_CLOUD_API!,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET!,
});

export const uploadToCloudinary = async (file: any) => {
  try {
    const response = await cloudinary.uploader.upload(file, {
      folder: "products",
    });
    return response.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Image upload failed");
  }
};

import type { NextApiRequest, NextApiResponse } from "next";
import { uploadToCloudinary } from "../../helpers/cloudinary";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const file = req.body.image; // Image file from FormData

    if (!file) {
      return res.status(400).json({ error: "No image provided" });
    }

    // Upload image to Cloudinary
    const imageUrl = await uploadToCloudinary(file);

    return res.status(200).json({ url: imageUrl });
  } catch (error) {
    return res.status(500).json({ error: "Image upload failed", details: error.message });
  }
}

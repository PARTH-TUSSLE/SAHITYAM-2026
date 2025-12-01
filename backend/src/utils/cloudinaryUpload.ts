import cloudinary from "../config/cloudinary";
import { Readable } from "stream";

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
}

/**
 * Upload image to Cloudinary from buffer
 * @param fileBuffer - File buffer from multer
 * @param folder - Cloudinary folder name (e.g., 'payment-screenshots')
 * @returns Promise with Cloudinary upload result
 */
export const uploadToCloudinary = (
  fileBuffer: Buffer,
  folder: string = "sahityam-2026"
): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
        transformation: [
          {
            width: 1200,
            height: 1200,
            crop: "limit", // Limit size but maintain aspect ratio
            quality: "auto", // Automatic quality optimization
            fetch_format: "auto", // Automatic format selection
          },
        ],
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result as CloudinaryUploadResult);
        }
      }
    );

    // Convert buffer to stream and pipe to Cloudinary
    const bufferStream = Readable.from(fileBuffer);
    bufferStream.pipe(uploadStream);
  });
};

/**
 * Delete image from Cloudinary
 * @param publicId - Cloudinary public_id of the image
 * @returns Promise with deletion result
 */
export const deleteFromCloudinary = async (
  publicId: string
): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    throw error;
  }
};

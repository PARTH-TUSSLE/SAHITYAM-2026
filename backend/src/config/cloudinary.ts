import { v2 as cloudinary } from "cloudinary";

let isConfigured = false;

const ensureConfigured = () => {
  if (isConfigured) return;

  const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
  const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error(
      "FATAL ERROR: Cloudinary credentials are not set. " +
        "Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env file."
    );
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });

  isConfigured = true;
};

// Create a proxy to ensure configuration before any cloudinary method is called
const cloudinaryProxy = new Proxy(cloudinary, {
  get(target, prop) {
    ensureConfigured();
    return target[prop as keyof typeof target];
  },
});

export default cloudinaryProxy;

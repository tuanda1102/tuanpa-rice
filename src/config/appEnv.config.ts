const APP_ENV = {
  baseUrl: import.meta.env.VERCEL_BASE_URL,
  cloudinary: {
    name: import.meta.env.VERCEL_CLOUDINARY_NAME,
    apiKey: import.meta.env.VERCEL_CLOUDINARY_API_KEY,
    apiSecret: import.meta.env.VERCEL_CLOUDINARY_API_SECRET,
    apiPreset: import.meta.env.VERCEL_CLOUDINARY_API_UPLOAD_PRESET,
  },
};

export default APP_ENV;

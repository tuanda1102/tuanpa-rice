const APP_ENV = {
  baseUrl: import.meta.env.TUANPA_RICE_BASE_URL,
  cloudinary: {
    name: import.meta.env.TUANPA_RICE_CLOUDINARY_NAME,
    apiKey: import.meta.env.TUANPA_RICE_CLOUDINARY_API_KEY,
    apiSecret: import.meta.env.TUANPA_RICE_CLOUDINARY_API_SECRET,
    apiPreset: import.meta.env.TUANPA_RICE_CLOUDINARY_API_UPLOAD_PRESET,
  },
};

export default APP_ENV;

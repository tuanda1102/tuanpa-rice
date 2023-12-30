import { useMutation } from '@tanstack/react-query';

import APP_ENV from '@/config/appEnv.config';
// import http from '@/config/axios.config';

const uploadApi = async (data: FileList) => {
  // const httpUpload = http;

  const formData = new FormData();
  formData.append('file', data[0]);
  // formData.append('api_key', APP_ENV.cloudinary.apiKey);
  // formData.append('signature', APP_ENV.cloudinary.apiSecret);
  formData.append('upload_preset', APP_ENV.cloudinary.apiPreset);
  formData.append('cloud_name', APP_ENV.cloudinary.name);
  // formData.append('folder', 'Menu');

  // httpUpload.defaults.baseURL = `https://api.cloudinary.com/v1_1/${APP_ENV.cloudinary.name}`;
  // const res = await httpUpload.post('/image/upload', data);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${APP_ENV.cloudinary.name}/image/upload`,
    {
      method: 'POST',
      body: formData,
    },
  );

  const res = response.json();

  return res as any;
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: uploadApi,
  });
};

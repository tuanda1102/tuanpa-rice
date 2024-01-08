import { useMutation } from '@tanstack/react-query';

import APP_ENV from '@/config/appEnv.config';

const uploadApi = async (data: FileList) => {
  const formData = new FormData();
  formData.append('file', data[0]);
  formData.append('upload_preset', APP_ENV.cloudinary.apiPreset);
  formData.append('cloud_name', APP_ENV.cloudinary.name);

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

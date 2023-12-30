import { Cloudinary } from '@cloudinary/url-gen';

import APP_ENV from '@/config/appEnv.config';

const useCloudinary = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: APP_ENV.cloudinary.name,
    },
  });

  return { cld };
};

export default useCloudinary;

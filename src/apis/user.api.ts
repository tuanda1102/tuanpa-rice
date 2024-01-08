import { useQuery } from '@tanstack/react-query';
import axios, { type AxiosError } from 'axios';

import {
  getLocalStorage,
  removeLocalStorageByKey,
} from '@/utils/localStorage.util';
import { type IUser } from '@/types/user';

/**
 * Get User Profile by Access token of Google
 * @returns user profile
 */
const getUserByGoogleAccessToken = async () => {
  const accessToken = getLocalStorage('google_access_token', '');

  if (accessToken) {
    const res = await axios.get<IUser>(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
    );
    return res.data;
  }
  return null;
};

export const useFetchUser = () => {
  const { data: authUser, ...queryProps } = useQuery({
    retry: 2,
    queryKey: ['fetch-user'],
    queryFn: getUserByGoogleAccessToken,
    onError(err: AxiosError) {
      if (err.response?.status === 401) {
        removeLocalStorageByKey('google_access_token');
      }
    },
  });

  return { authUser, ...queryProps };
};

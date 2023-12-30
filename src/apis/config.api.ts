import { useQuery } from '@tanstack/react-query';

import http from '@/config/axios.config';
import { type ISelectOptions } from '@/types/select';

interface IConfigDbRes {
  listUser: string;
}

const getConfigDBApi = async () => {
  const res = await http.get<IConfigDbRes[]>('/tabs/config');
  return res.data;
};

export const useDBConfig = (
  select?: ((data: IConfigDbRes[]) => void) | undefined,
) => {
  return useQuery({
    queryKey: ['get-db-config'],
    queryFn: getConfigDBApi,
    select,
  });
};

export const useListUser = () => {
  return useDBConfig((data) => {
    return data.map((user) => ({
      label: user.listUser,
      value: user.listUser,
    })) as unknown as ISelectOptions[];
  });
};

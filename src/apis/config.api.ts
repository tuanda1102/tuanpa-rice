import { type UseQueryResult, useQuery } from '@tanstack/react-query';

import http from '@/config/axios.config';
import { type ISelectOptions } from '@/types/select';

interface IConfigDbRes {
  listUser: string;
}

const getConfigDBApi = async () => {
  const res = await http.get<IConfigDbRes[]>('/tabs/config');
  return res.data;
};

export const useDBConfig = <T = any>(
  select?: ((data: IConfigDbRes[]) => T | UseQueryResult<T>) | undefined,
) => {
  return useQuery({
    queryKey: ['get-db-config'],
    queryFn: getConfigDBApi,
    select,
  });
};

export const useListUser = () => {
  return useDBConfig<ISelectOptions[]>((data) => {
    return data.map((user) => ({
      label: user.listUser,
      value: user.listUser,
    }));
  }) as unknown as UseQueryResult<ISelectOptions[]>;
};

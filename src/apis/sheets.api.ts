import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
} from '@tanstack/react-query';

import http from '@/config/axios.config';
import { type IOrder, type IMenu } from '@/types/order';

/**
 * Get all data in tab order
 * @returns
 */
const getDataSheets = async () => {
  const res = await http.get<IOrder[]>('');
  return res.data;
};

export const useGetDataSheets = <T = any>(
  select?: ((data: IOrder[]) => T | UseQueryResult<T>) | undefined,
) => {
  return useQuery({
    queryKey: ['get-data-google-sheets'],
    queryFn: getDataSheets,
    select,
  });
};

export const useOrderDetail = (menuId: string) => {
  return useGetDataSheets<IOrder[]>((data) =>
    data.filter((orderItem) => orderItem.menuId === menuId),
  ) as unknown as UseQueryResult<IOrder[]>;
};

/**
 * Thêm menu
 */
const addMenuApi = async (data: IMenu) => {
  const res = await http.post<IMenu>('/tabs/menu', data);
  return res.data;
};

export const useAddMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMenuApi,
    onSuccess() {
      queryClient.invalidateQueries(['get-menu']);
    },
  });
};

/**
 * Lấy menu
 */
const getMenu = async () => {
  const res = await http.get<IMenu[]>('/tabs/menu');
  return res.data;
};

export const useGetMenu = <T = any>(
  select?: ((data: IMenu[]) => T | UseQueryResult<T>) | undefined,
) => {
  return useQuery({
    queryKey: ['get-menu'],
    queryFn: getMenu,
    select,
    staleTime: 30 * 60 * 1000, // 30 min
    cacheTime: 60 * 60 * 1000, // 1 hours
  });
};

/**
 * Lấy 1 menu theo ID
 */
export const useGetMenuById = (menuId: string) => {
  return useGetMenu<IMenu | undefined>((data) =>
    data.find((menuItem) => menuItem.id === menuId),
  ) as unknown as UseQueryResult<IMenu>;
};

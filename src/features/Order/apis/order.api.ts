import { useMutation, useQueryClient } from '@tanstack/react-query';

import http from '@/config/axios.config';
import { type IOrder } from '@/types/order';

/**
 * Thêm đơn
 */
const addOrderApi = async (body: IOrder) => {
  const res = await http.post('', body);
  return res;
};

export const useAddOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addOrderApi,
    onSuccess() {
      queryClient.invalidateQueries(['get-data-google-sheets']);
    },
  });
};

/**
 * Xóa đơn
 */
const deleteOrderById = async (id: string) => {
  const res = await http.delete(`/id/${id}`);
  return res.data;
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrderById,
    onSuccess() {
      queryClient.invalidateQueries(['get-data-google-sheets']);
    },
  });
};

/**
 * Edit đơn
 */
const editOrderById = async ({ id, ...order }: IOrder) => {
  const res = await http.patch(`/id/${id}`, order);
  return res.data;
};

export const useEditOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editOrderById,
    onSuccess() {
      queryClient.invalidateQueries(['get-data-google-sheets']);
    },
  });
};

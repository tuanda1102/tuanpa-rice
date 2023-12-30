import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { type IOrder } from '@/types/order';

interface IOrderSchema extends Omit<IOrder, 'id' | 'price' | 'menuId'> {}

const orderSchema: Yup.ObjectSchema<IOrderSchema> = Yup.object().shape({
  name: Yup.string().required('Chọn người muốn đặt đơn!'),
  foodName: Yup.string().required('Nhập tên món!'),
  status: Yup.string()
    .oneOf(['TRUE', 'FALSE'])
    .required('Chưa có trạng thái thanh toán!'),
});

export const useOrderForm = () => {
  return useForm<IOrderSchema>({
    defaultValues: {
      name: '',
      foodName: '',
      status: 'FALSE',
    },
    mode: 'onChange',
    resolver: yupResolver(orderSchema),
  });
};

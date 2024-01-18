import { type IOrder } from '@/types/order';

const totalPrice = (listOrder: IOrder[]) =>
  listOrder.reduce((sum, order) => sum + (Number(order.price) || 0), 0);

export { totalPrice };

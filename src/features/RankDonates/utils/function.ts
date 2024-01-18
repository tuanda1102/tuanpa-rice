import { type IDonate } from '@/types/donates';
import { type IOrder } from '@/types/order';

interface TotalPrices {
  [key: string]: number;
}

export const calculateRankDonate = (data: IDonate[]) => {
  const totalPrices = data.reduce((accumulator: TotalPrices, currentItem) => {
    const userEmail = currentItem.userEmail.toLowerCase();

    if (!accumulator[userEmail]) {
      accumulator[userEmail] = 0;
    }

    accumulator[userEmail] += currentItem.price;

    return accumulator;
  }, {});
  const dataRankDonate = Object.entries(totalPrices).map(
    ([userEmail, price]) => ({
      userEmail,
      price,
    }),
  );
  return dataRankDonate;
};

const totalPrice = (listOrder: IOrder[]) =>
  listOrder.reduce((sum, order) => sum + (Number(order.price) || 0), 0);

const formatterPrice = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

export { totalPrice, formatterPrice };

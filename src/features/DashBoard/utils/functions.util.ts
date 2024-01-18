import { useId } from 'react';
import { type IOrder } from '@/types/order';

export const totalPrice = (listOrder: IOrder[]) =>
  listOrder.reduce((sum, order) => sum + (Number(order.price) || 0), 0);

interface TotalPrices {
  [key: string]: number;
}

export const calculateRankMissing = (data: IOrder[]) => {
  const totalPrices = data.reduce(
    (accumulator: TotalPrices, currentItem: IOrder | null) => {
      const userEmail = currentItem != null && currentItem.userEmail;

      if (!userEmail) {
        return accumulator; // Skip if userEmail is null or undefined
      }

      if (!accumulator[userEmail]) {
        accumulator[userEmail] = 0;
      }

      accumulator[userEmail] += (currentItem != null && currentItem.price) || 0;

      return accumulator;
    },
    {},
  );

  const resultArray = Object.entries(totalPrices).map(
    ([userEmail, totalAmount]) => ({
      userEmail,
      totalAmount,
      id: useId(),
    }),
  );

  return resultArray;
};

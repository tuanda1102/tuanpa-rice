/* eslint-disable no-restricted-syntax */
import { type IOrder } from '@/types/order';

export const totalPrice = (listOrder: IOrder[]) =>
  listOrder.reduce((sum, order) => sum + (Number(order.price) || 0), 0);

interface TotalPrices {
  [key: string]: number;
}

export const calculateRankMissing = (data: IOrder[]) => {
  const totalPrices: TotalPrices = {};

  for (const currentItem of data) {
    const userEmail = currentItem?.userEmail;

    if (userEmail) {
      totalPrices[userEmail] =
        (totalPrices[userEmail] || 0) + (currentItem?.price || 0);
    }
  }

  const resultArray = Object.entries(totalPrices).map(
    ([userEmail, totalAmount]) => {
      const currentData = data.find((order) => order.userEmail === userEmail);
      const id = currentData?.id;
      return {
        userEmail,
        totalAmount,
        id,
      };
    },
  );

  return resultArray;
};

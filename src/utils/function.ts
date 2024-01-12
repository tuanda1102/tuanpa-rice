import { type IDonate } from '@/types/donates';

interface TotalPrices {
  [key: string]: number;
}

export const calculateRankDonate = (data: IDonate[]) => {
  const totalPrices: TotalPrices = {};

  // eslint-disable-next-line array-callback-return
  data.map((items: IDonate) => {
    const userEmail = items.userEmail.toLowerCase();
    if (!totalPrices[userEmail]) {
      totalPrices[userEmail] = 0;
    }
    totalPrices[userEmail] += items.price;
  });
  const rankDonate = Object.entries(totalPrices).sort(
    (donateFirst, donateSecond) => donateFirst[1] - donateSecond[1],
  );

  return rankDonate;
};

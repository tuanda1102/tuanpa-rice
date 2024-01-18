import { useDonate } from '@/apis/donate.api';
import { calculateRankDonate } from '@/features/RankDonates/utils/function';
import { type IDonate } from '@/types/donates';

export const useCalculateDonates = () => {
  const dataRankDonate = useDonate((data: IDonate[]) => {
    return calculateRankDonate(data) as IDonate[];
  });
  return dataRankDonate.donateList;
};

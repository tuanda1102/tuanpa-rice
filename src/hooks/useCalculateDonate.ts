import { useDonate } from '@/apis/donate.api';
import { type IDonate } from '@/types/donates';
import { calculateRankDonate } from '@/utils/function';

export const useCalculateDonates = () => {
  const dataRankDonate = useDonate((data: IDonate[]) => {
    return calculateRankDonate(data) as IDonate[];
  });
  return dataRankDonate.donateList;
};

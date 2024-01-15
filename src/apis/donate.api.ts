import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addDoc, getDocs } from 'firebase/firestore';

import { type IDonate } from '@/types/donates';
import { DonateCollectionRef } from '@/constants/firebaseCollections.constant';

const getDonate = async () => {
  const donate = await getDocs(DonateCollectionRef);
  return donate.docs.map((elem) => ({
    ...elem.data(),
    id: elem.id,
  })) as IDonate[];
};

export const useDonate = () => {
  const { data: donateList, ...queryOptions } = useQuery({
    queryKey: ['get-Donate'],
    queryFn: getDonate,
  });

  return { donateList, ...queryOptions };
};

const addDonate = async (data: Partial<IDonate>) => {
  const res = await addDoc(DonateCollectionRef, data);
  return res;
};

export const useAddDonate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addDonate,
    onSuccess() {
      queryClient.invalidateQueries(['get-Donate']);
    },
  });
};

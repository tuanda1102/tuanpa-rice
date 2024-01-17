import { Button } from '@nextui-org/react';
import { FaRankingStar } from 'react-icons/fa6';
import { IoArrowBack } from 'react-icons/io5';

import { useNavigate } from 'react-router-dom';
import ModalDonate from '@/components/Modal/ModalDonate';
import { useCalculateDonates } from '@/hooks/useCalculateDonate';
import { ChartDonate } from '@/components/Chart/ChartDonate';
import { type IDonate } from '@/types/donates';

function RankDonate() {
  const navigate = useNavigate();

  const rankDonate = useCalculateDonates();
  const labels = rankDonate?.map((item: IDonate) => {
    return item.userEmail;
  });
  const prices = rankDonate?.map((item: IDonate) => {
    return item.price;
  });

  return (
    <>
      <div className='flex justify-start'>
        <Button
          onClick={() => {
            navigate('/');
          }}
          variant='ghost'
          className='text-white'
          startContent={<IoArrowBack className='text-black  dark:text-white' />}
        />
      </div>
      <div className='flex flex-col w-full justify-center'>
        <div className='flex flex-row w-full justify-center items-end'>
          <p className='text-2xl font-semibold text-end'>Xếp hạng Donate</p>
          <div className='p-[6px]'>
            <FaRankingStar className='text-black  dark:text-white' size={40} />
          </div>
        </div>

        <div className='flex w-full justify-center'>
          <ChartDonate labels={labels} prices={prices} />
        </div>
        <div className='flex justify-center'>
          <ModalDonate />
        </div>
      </div>
    </>
  );
}

export default RankDonate;

import { Button } from '@nextui-org/react';
import { FaRankingStar } from 'react-icons/fa6';
import { IoArrowBack } from 'react-icons/io5';

import { useNavigate } from 'react-router-dom';
import { useDonate } from '@/apis/donate.api';
import { calculateRankDonate } from '@/utils/function';
import { ChartDonate } from '@/components/Chart/ChartDonate';
import ModalDonate from '@/components/Modal/ModalDonate';

function RankDonate() {
  const navigate = useNavigate();
  const { donateList } = useDonate();

  const rankDonate =
    donateList !== undefined ? calculateRankDonate(donateList) : [];

  return (
    <>
      <div className='flex justify-start'>
        <Button
          onClick={() => {
            navigate('/');
          }}
          variant='ghost'
          className='text-white'
          startContent={<IoArrowBack color='black' />}
        />
      </div>
      <div className='flex flex-col w-full justify-center'>
        <div className='flex flex-row w-full justify-center items-end'>
          <p className='text-2xl font-semibold text-end'>Xếp hạng Donate</p>
          <div className='p-[6px]'>
            <FaRankingStar color='black' size={40} />
          </div>
        </div>

        <div>
          <ChartDonate dataDonate={rankDonate} />
        </div>
        <div className='flex justify-center'>
          <ModalDonate />
        </div>
      </div>
    </>
  );
}

export default RankDonate;

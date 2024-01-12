import {
  Modal,
  ModalBody,
  ModalContent,
  Button,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react';
import { FaRankingStar } from 'react-icons/fa6';

import { useDonate } from '@/apis/donate.api';
import { calculateRankDonate } from '@/utils/function';
import { ChartDonate } from '@/components/Chart/ChartDonate';
import ModalDonate from '@/components/Modal/ModalDonate';

function ModalRankDonate() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { DonateList } = useDonate();

  const rankDonate =
    DonateList !== undefined ? calculateRankDonate(DonateList) : [];

  return (
    <div>
      <Tooltip placement='bottom' content='Xếp hạng Donate'>
        <Button
          onPress={onOpen}
          radius='full'
          variant='ghost'
          className='text-white'
          startContent={<FaRankingStar color='black' />}
        />
      </Tooltip>
      <Modal size='md' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalBody>
            <div className='flex flex-col w-full justify-center '>
              <div className='flex flex-row w-full justify-center items-end '>
                <p className='text-2xl font-semibold text-end'>
                  Xếp hạng Donate
                </p>
                <div className='p-[6px]'>
                  <FaRankingStar color='black' />
                </div>
              </div>

              <div>
                <ChartDonate dataDonate={rankDonate} />
              </div>
              <div className='flex  justify-center'>
                <ModalDonate />
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
export default ModalRankDonate;

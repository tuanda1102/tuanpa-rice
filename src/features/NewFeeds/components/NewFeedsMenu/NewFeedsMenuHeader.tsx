import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/use-disclosure';
import { IoMdAdd } from 'react-icons/io';
import ModalMenu from '@/features/NewFeeds/components/Modal/ModalMenu';

function NewFeedsMenuHeader() {
  const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();
  return (
    <div className='mb-4'>
      <div className='text-end'>
        <Button
          size='md'
          onPress={onOpen}
          radius='full'
          color='primary'
          startContent={<IoMdAdd />}
        >
          Tạo Menu
        </Button>
        <ModalMenu
          isOpen={isOpen}
          onClose={onClose}
          onOpenChange={onOpenChange}
        />
      </div>
    </div>
  );
}

export default NewFeedsMenuHeader;

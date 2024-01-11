import {
  Modal,
  type CardProps,
  ModalBody,
  ModalContent,
} from '@nextui-org/react';

import { type IOrder } from '@/types/order';
import FormOrder from '@/features/NewFeeds/components/Form/FormOrder';

interface IModalEditOrder extends CardProps {
  isOpen: boolean;
  editOrderUser?: IOrder;
  shadow?: 'sm' | 'md' | 'lg' | undefined;
  onClose: () => void;
}

function ModalEditOrder({
  isOpen,
  editOrderUser,
  shadow,
  onClose,
  ...passProps
}: IModalEditOrder) {
  return (
    <Modal shadow={shadow} isOpen={isOpen} onClose={onClose} {...passProps}>
      <ModalContent className='p-4 bg-white dark:bg-default-100/50 max-w-[900px]'>
        <ModalBody>
          <FormOrder editOrderUser={editOrderUser} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export default ModalEditOrder;

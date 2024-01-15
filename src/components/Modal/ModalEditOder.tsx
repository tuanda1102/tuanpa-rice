import {
  Modal,
  type ModalProps,
  ModalBody,
  ModalContent,
} from '@nextui-org/react';

import { type IOrder } from '@/types/order';
import FormOrder from '@/features/NewFeeds/components/Form/FormOrder';

interface IModalEditOrder extends Partial<ModalProps> {
  editOrderUser?: IOrder;
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
          <FormOrder
            editOrderUser={editOrderUser}
            onClose={onClose ? () => onClose() : undefined}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export default ModalEditOrder;

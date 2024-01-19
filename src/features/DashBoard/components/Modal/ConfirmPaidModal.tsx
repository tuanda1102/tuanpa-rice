import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  type ModalProps,
} from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateAllOrders } from '@/apis/order.api';
import appToast from '@/utils/toast.util';
import { formatterPrice } from '@/utils/prices.util';

interface IModalProps extends Omit<ModalProps, 'children'> {
  totalMissing: number | null;
  userEmail: string;
}

export default function ConfirmPaidModal({
  totalMissing,
  userEmail,
  onClose,
  ...passProps
}: IModalProps) {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useUpdateAllOrders();

  const handlePaidAll = () => {
    mutate(userEmail, {
      onSuccess() {
        queryClient.invalidateQueries(['get-all-orders']);
        appToast({
          type: 'success',
          props: {
            text: 'Thanh toán thành công!',
          },
        });
      },
      onError() {
        appToast({
          type: 'error',
          props: {
            text: 'Thử lại dùm mình nhá thất bại ruifiii !!!!',
          },
        });
      },
    });
  };
  return (
    <>
      <Modal {...passProps}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className='flex gap-1'>
                <span>Bạn có muốn thanh toán </span>
                <span className='text-blue-400  font-bold'>
                  {formatterPrice.format(totalMissing as number)}
                </span>
              </ModalHeader>
              <ModalBody>
                <div className='flex items-center justify-end gap-2'>
                  <Button color='danger' onClick={onClose}>
                    Hủy
                  </Button>
                  <Button
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    color='success'
                    onClick={() => {
                      handlePaidAll();
                    }}
                  >
                    Thanh toán
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

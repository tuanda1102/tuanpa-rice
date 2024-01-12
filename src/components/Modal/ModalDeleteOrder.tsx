import {
  Modal,
  ModalBody,
  Button,
  ModalContent,
  ModalHeader,
  type ModalProps,
} from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';

import useSearchParamsCustom from '@/hooks/useSearchParamsCustom';
import { type INewFeedsSearchParams } from '@/features/NewFeeds/types/newFeeds';
import { useDeleteOrderById } from '@/apis/order.api';
import appToast from '@/utils/toast.util';
import { type IOrder } from '@/types/order';

interface IModalEditOrder extends Partial<ModalProps> {
  isOpen: boolean;
  orderUserDelete?: IOrder;
}

function ModalEditOrder({
  isOpen,
  orderUserDelete,
  shadow,
  onClose,
  ...passProps
}: IModalEditOrder) {
  const queryClient = useQueryClient();
  const { menuId } = useSearchParamsCustom<Partial<INewFeedsSearchParams>>();
  const deleteOrderMutation = useDeleteOrderById();

  const handleDeleteOrder = () => {
    deleteOrderMutation.mutate(
      {
        menuId: menuId as string,
        orderId: orderUserDelete?.id as string,
      },
      {
        onSuccess() {
          queryClient.invalidateQueries(['get-menu-by-id', menuId]);
          appToast({
            type: 'success',
            props: {
              text: 'Xóa thành công!',
            },
          });
          if (onClose) {
            onClose();
          }
        },
        onError() {
          appToast({
            type: 'error',
            props: {
              text: 'Xóa thất bại, vui lòng thử lại!',
            },
          });
        },
      },
    );
  };

  return (
    <Modal shadow={shadow} isOpen={isOpen} onClose={onClose} {...passProps}>
      <ModalContent>
        <ModalHeader>
          Bạn có chắc chắn muốn đơn
          <span className='mx-2 italic text-primary'>
            {orderUserDelete?.foodName}
          </span>
          !
        </ModalHeader>
        <ModalBody>
          <div className='flex items-center justify-end gap-2'>
            <Button
              isLoading={deleteOrderMutation.isLoading}
              disabled={deleteOrderMutation.isLoading}
              color='danger'
              onClick={() => {
                handleDeleteOrder();
              }}
            >
              Xóa
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export default ModalEditOrder;

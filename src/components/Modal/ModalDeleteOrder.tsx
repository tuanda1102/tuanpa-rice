import {
  Modal,
  ModalBody,
  Button,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';

import useSearchParamsCustom from '@/hooks/useSearchParamsCustom';
import { type INewFeedsSearchParams } from '@/features/NewFeeds/types/newFeeds';
import { useDeleteOrderById } from '@/apis/order.api';
import appToast from '@/utils/toast.util';
import { type IOrder } from '@/types/order';

function ModalEditOrder({
  isOpen,
  orderUserDelete,
  handleClose,
}: {
  isOpen: boolean;
  orderUserDelete?: IOrder;
  handleClose: () => void;
}) {
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
          handleClose();
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
    <Modal
      isOpen={isOpen}
      onClose={() => {
        handleClose();
      }}
    >
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
            <Button onClick={() => handleClose()}>Hủy</Button>
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

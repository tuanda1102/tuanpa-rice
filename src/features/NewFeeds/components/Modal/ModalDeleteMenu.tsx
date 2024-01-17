import {
  Button,
  Modal,
  ModalContent,
  type ModalProps,
  ModalBody,
  ModalHeader,
} from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteMenu } from '@/apis/order.api';
import appToast from '@/utils/toast.util';

interface IModalMenuProps extends Omit<ModalProps, 'children'> {
  menuId: string;
}

function ModalDeleteMenu({ menuId, onClose, ...passProps }: IModalMenuProps) {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useDeleteMenu();

  const handleDeleteMenu = () => {
    mutate(
      { menuId },
      {
        onSuccess() {
          queryClient.invalidateQueries(['get-menus']);
          appToast({
            type: 'success',
            props: {
              text: 'Xóa thành công!',
            },
          });
          onClose?.();
        },
        onError() {
          appToast({
            type: 'error',
            props: {
              text: 'Xóa thất bại!',
            },
          });
          onClose?.();
        },
      },
    );
  };
  return (
    <div>
      <Modal {...passProps}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Bạn có muốn xóa menu này ???
              </ModalHeader>
              <ModalBody>
                <div className='flex items-center justify-end gap-2'>
                  <Button onClick={onClose}>Hủy</Button>
                  <Button
                    isLoading={isLoading}
                    disabled={isLoading}
                    color='danger'
                    onClick={() => {
                      handleDeleteMenu();
                    }}
                  >
                    Xóa
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalDeleteMenu;

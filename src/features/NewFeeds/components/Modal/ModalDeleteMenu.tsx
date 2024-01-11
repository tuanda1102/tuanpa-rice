import {
  Button,
  Modal,
  ModalContent,
  type ModalProps,
  useDisclosure,
  ModalBody,
  ModalHeader,
} from '@nextui-org/react';
import { IoTrashOutline } from 'react-icons/io5';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteMenu } from '@/apis/order.api';
import appToast from '@/utils/toast.util';

interface IModalMenuProps extends Omit<ModalProps, 'children'> {
  menuId: string;
}

function ModalDeleteMenu({ menuId, ...passProps }: IModalMenuProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useDeleteMenu();

  const handleDeleteMenu = () => {
    mutate(
      { menuId },
      {
        onSuccess() {
          queryClient.invalidateQueries(['get-menu']);
          appToast({
            type: 'success',
            props: {
              text: 'Xóa thành công!',
            },
          });
          onClose();
        },
        onError() {
          appToast({
            type: 'error',
            props: {
              text: 'Xóa thất bại!',
            },
          });
          onClose();
        },
      },
    );
  };
  return (
    <div>
      <Button isIconOnly className='border-0' variant='ghost' onClick={onOpen}>
        <IoTrashOutline size={22} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} {...passProps}>
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

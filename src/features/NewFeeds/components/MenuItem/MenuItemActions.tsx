import { Button, useDisclosure } from '@nextui-org/react';
import { useSearchParams } from 'react-router-dom';

import { IoAdd, IoLockClosedOutline, IoLockOpenOutline } from 'react-icons/io5';
import { type IMenu } from '@/types/menu';
import { useUpdateMenu } from '@/apis/order.api';
import appToast from '@/utils/toast.util';
import ModalMenu from '@/features/NewFeeds/components/Modal/ModalMenu';
import { useFetchUser } from '@/apis/user.api';

interface IMenuItemAction {
  menu: IMenu;
}
function MenuItemActions({ menu }: IMenuItemAction) {
  const { id, isBlocked, isSamePrice, createdByUser } = menu;
  const { onClose, isOpen, onOpenChange, onOpen } = useDisclosure();

  const [searchParams, setSearchParams] = useSearchParams();
  const { authUser } = useFetchUser();
  const toggleMenu = useUpdateMenu();

  const handleClickOrder = () => {
    searchParams.set('menuId', id);
    setSearchParams(searchParams);
  };

  const handleToggleMenu = () => {
    const data = { menuId: id, body: { isBlocked: !isBlocked } };
    if (!isBlocked && !isSamePrice) {
      onOpen();
    } else {
      toggleMenu.mutate(data, {
        onSuccess() {
          appToast({
            type: 'success',
            props: {
              text: 'Mở menu thành công nà =))))',
            },
          });
        },
        onError() {
          appToast({
            type: 'error',
            props: {
              title: 'Cóa lỗi :((((',
              text: 'Thử lại dùm mình chứ lỗi mất roài =))))',
            },
          });
        },
      });
    }
  };

  return (
    <div className='flex justify-between items-center'>
      <div>
        {authUser?.email === createdByUser ? (
          <div className='flex items-center gap-x-1'>
            <Button
              isLoading={toggleMenu.isLoading}
              disabled={toggleMenu.isLoading}
              isIconOnly
              className='border-0'
              variant='ghost'
              onClick={handleToggleMenu}
            >
              {isBlocked ? (
                <IoLockClosedOutline size={22} />
              ) : (
                <IoLockOpenOutline size={22} />
              )}
            </Button>
            <ModalMenu
              onClose={onClose}
              onOpenChange={onOpenChange}
              isOpen={isOpen}
              dataMenu={menu}
            />
          </div>
        ) : (
          ''
        )}
      </div>

      <Button
        onClick={handleClickOrder}
        size='sm'
        className='border-0'
        variant='ghost'
        startContent={<IoAdd />}
      >
        Đặt món
      </Button>
    </div>
  );
}

export default MenuItemActions;

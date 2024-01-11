import { Button } from '@nextui-org/react';
import { useSearchParams } from 'react-router-dom';

import { IoAdd, IoLockClosedOutline, IoLockOpenOutline } from 'react-icons/io5';
import { type IMenu } from '@/types/menu';
import { useBlockMenu } from '@/apis/order.api';
import appToast from '@/utils/toast.util';
import ModalDeleteMenu from '@/features/NewFeeds/components/Modal/ModalDeleteMenu';
import { useFetchUser } from '@/apis/user.api';

function MenuItemActions({
  id,
  isBlocked,
  createdByUser,
}: Pick<IMenu, 'id' | 'isBlocked' | 'createdByUser'>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { authUser } = useFetchUser();

  const toggleMenu = useBlockMenu();

  const handleClickOrder = () => {
    searchParams.set('menuId', id);
    setSearchParams(searchParams);
  };

  const handleToggleMenu = () => {
    const data = { menuId: id, body: { isBlocked: !isBlocked } };
    toggleMenu.mutate(data, {
      onSuccess() {
        appToast({
          type: 'success',
          props: {
            text: isBlocked
              ? 'Mở menu thành công nà =))))'
              : 'Đóng menu thành công nà =))))',
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
            <ModalDeleteMenu menuId={id} />
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

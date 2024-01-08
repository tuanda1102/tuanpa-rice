import { Button } from '@nextui-org/react';
import { useSearchParams } from 'react-router-dom';

import { IoAdd, IoLockClosedOutline } from 'react-icons/io5';
import { type IMenu } from '@/types/menu';

function MenuItemActions({ id }: Pick<IMenu, 'id'>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClickOrder = () => {
    searchParams.set('menuId', id);
    setSearchParams(searchParams);
  };

  return (
    <div className='flex justify-between items-center'>
      <Button isIconOnly className='border-0' variant='ghost'>
        <IoLockClosedOutline size={22} />
      </Button>
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

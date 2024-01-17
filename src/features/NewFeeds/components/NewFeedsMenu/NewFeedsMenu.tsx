import { ScrollShadow } from '@nextui-org/react';
import { CgCoffee } from 'react-icons/cg';

import { useMenus } from '@/apis/order.api';
import MenuItem from '@/features/NewFeeds/components/MenuItem/MenuItem';
import NewFeedsMenuHeader from '@/features/NewFeeds/components/NewFeedsMenu/NewFeedsMenuHeader';

function NewFeedsMenu() {
  const { menuList, isSuccess } = useMenus();

  return (
    <div className='min-w-[480px] pt-4 flex flex-col'>
      <NewFeedsMenuHeader />
      <ScrollShadow className='w-full flex-grow px-2'>
        {menuList?.length
          ? menuList.map((menu) => <MenuItem key={menu.id} menu={menu} />)
          : ''}

        {isSuccess && !menuList?.length ? (
          <div className='flex flex-col items-center gap2 text-foreground-400'>
            <CgCoffee size={48} />
            <h5>Không có menu để hiển thị</h5>
          </div>
        ) : (
          ''
        )}
      </ScrollShadow>
    </div>
  );
}

export default NewFeedsMenu;

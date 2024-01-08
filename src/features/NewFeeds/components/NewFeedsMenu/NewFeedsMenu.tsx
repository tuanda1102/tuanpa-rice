import { ScrollShadow } from '@nextui-org/react';

import { useMenu } from '@/apis/order.api';
import MenuItem from '@/features/NewFeeds/components/MenuItem/MenuItem';
import NewFeedsMenuHeader from '@/features/NewFeeds/components/NewFeedsMenu/NewFeedsMenuHeader';

function NewFeedsMenu() {
  const { menuList } = useMenu();

  return (
    <div className='max-w-[480px] flex flex-col'>
      <NewFeedsMenuHeader />
      <ScrollShadow className='w-full flex-grow px-2'>
        {menuList?.length &&
          menuList.map((menu) => <MenuItem key={menu.id} menu={menu} />)}
      </ScrollShadow>
    </div>
  );
}

export default NewFeedsMenu;

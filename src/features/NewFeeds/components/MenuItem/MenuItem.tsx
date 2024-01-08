import { Image } from '@nextui-org/react';

import { type IMenu } from '@/types/menu';
import MenuItemContent from './MenuItemContent';
import MenuItemHeader from './MenuItemHeader';

function MenuItem({ menu }: { menu: IMenu }) {
  return (
    <div className='flex flex-col items-center gap-2 pb-4 mb-4 border-b-1 border-gray-400'>
      <MenuItemHeader
        userAvatar={menu.createdByUser}
        userEmail={menu.createdByUser}
      />

      {menu.image ? <Image className='rounded' src={menu.image} /> : ''}

      <MenuItemContent
        id={menu.id}
        isContentOnly={!menu.image}
        createdByUser={menu.createdByUser}
        title={menu.title}
        menuLink={menu.menuLink}
      />
    </div>
  );
}

export default MenuItem;

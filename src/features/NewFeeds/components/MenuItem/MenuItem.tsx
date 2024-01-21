import { Image } from '@nextui-org/react';

import { type IMenu } from '@/types/menu';
import MenuItemContent from './MenuItemContent';
import MenuItemHeader from './MenuItemHeader';

function MenuItem({ menu }: { menu: IMenu }) {
  return (
    <div className='flex flex-col items-center gap-2 pb-4 mb-4 border-b-1 border-gray-400'>
      <MenuItemHeader menu={menu} />

      {menu.image ? (
        <Image className='z-0 drop-shadow-lg rounded' src={menu.image} />
      ) : (
        ''
      )}

      <MenuItemContent menu={menu} />
    </div>
  );
}

export default MenuItem;

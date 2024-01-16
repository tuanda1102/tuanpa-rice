import { Link } from '@nextui-org/react';

import { type IMenu } from '@/types/menu';
import MenuItemActions from './MenuItemActions';

interface IMenuItemContentProps {
  menu: IMenu;
}

function MenuItemContent({ menu }: IMenuItemContentProps) {
  const { createdByUser, title, menuLink, image } = menu;
  const isContentOnly = !image;
  return (
    <div className='w-full'>
      {!isContentOnly && <MenuItemActions menu={menu} />}
      <p className='text-small italic'>
        {!isContentOnly && (
          <span className='font-semibold me-2'>{createdByUser}</span>
        )}
        {title}
      </p>
      {menuLink ? (
        <Link
          className='text-small'
          href={menuLink}
          target='_blank'
          rel='noreferrer'
        >
          Nhấp vào link order
        </Link>
      ) : (
        ''
      )}
      {isContentOnly && <MenuItemActions menu={menu} />}
    </div>
  );
}

export default MenuItemContent;

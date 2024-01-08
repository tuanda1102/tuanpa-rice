import { Link } from '@nextui-org/react';

import { type IMenu } from '@/types/menu';
import MenuItemActions from './MenuItemActions';

interface IMenuItemContentProps
  extends Pick<IMenu, 'title' | 'createdByUser' | 'menuLink' | 'id'> {
  isContentOnly: boolean;
}

function MenuItemContent({
  isContentOnly = false,
  title,
  menuLink,
  id,
  createdByUser,
}: IMenuItemContentProps) {
  return (
    <div className='w-full'>
      {!isContentOnly && <MenuItemActions id={id} />}
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
      {isContentOnly && <MenuItemActions id={id} />}
    </div>
  );
}

export default MenuItemContent;

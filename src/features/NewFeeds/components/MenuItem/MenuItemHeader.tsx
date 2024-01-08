import { Avatar, Button } from '@nextui-org/react';
import { type HTMLAttributes } from 'react';
import { GoKebabHorizontal } from 'react-icons/go';

interface IMenuItemHeaderProps extends HTMLAttributes<HTMLDivElement> {
  userEmail: string;
  userAvatar: string;
}

function MenuItemHeader({ userAvatar, userEmail }: IMenuItemHeaderProps) {
  return (
    <div className='flex justify-between items-center w-full'>
      <div className='flex items-center gap-3'>
        <Avatar
          isBordered
          size='sm'
          color='secondary'
          className='text-sm'
          src={userAvatar}
        />
        <span>{userEmail}</span>
      </div>

      <Button isIconOnly variant='ghost' className='border-0'>
        <GoKebabHorizontal size={18} />
      </Button>
    </div>
  );
}

export default MenuItemHeader;

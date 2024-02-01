import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from '@nextui-org/react';
import { type HTMLAttributes } from 'react';
import { CiEdit } from 'react-icons/ci';
import { GoKebabHorizontal } from 'react-icons/go';
import { MdDeleteOutline } from 'react-icons/md';
import { useFetchUser } from '@/apis/user.api';
import ModalDeleteMenu from '@/features/NewFeeds/components/Modal/ModalDeleteMenu';
import ModalMenu from '@/features/NewFeeds/components/Modal/ModalMenu';
import { type IMenu } from '@/types/menu';

interface IMenuItemHeaderProps extends HTMLAttributes<HTMLDivElement> {
  menu: IMenu;
}

function MenuItemHeader({ menu }: IMenuItemHeaderProps) {
  const deleteDisclosure = useDisclosure();
  const updateDisclosure = useDisclosure();
  const { authUser } = useFetchUser();
  const { createdByUser, id } = menu;
  return (
    <div className='flex justify-between items-center w-full'>
      <div className='flex items-center gap-3'>
        <Avatar
          isBordered
          size='sm'
          color='secondary'
          className='text-sm'
          src={createdByUser}
        />
        <span>{createdByUser}</span>
      </div>

      {authUser?.email === createdByUser && (
        <Button isIconOnly variant='ghost' className='border-0'>
          <Dropdown placement='bottom-end'>
            <DropdownTrigger>
              <Button>
                <GoKebabHorizontal size={18} />
              </Button>
            </DropdownTrigger>

            <DropdownMenu aria-label='menu Actions' variant='flat'>
              <DropdownItem
                startContent={<CiEdit size={22} />}
                onClick={updateDisclosure.onOpen}
                key='edit'
              >
                Sửa menu
              </DropdownItem>
              <DropdownItem
                startContent={<MdDeleteOutline size={22} />}
                key='delete'
                color='danger'
                onClick={deleteDisclosure.onOpen}
              >
                Xóa menu
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <ModalMenu
            dataMenu={menu}
            onClose={updateDisclosure.onClose}
            onOpenChange={updateDisclosure.onOpenChange}
            isOpen={updateDisclosure.isOpen}
            isEdit
          />

          <ModalDeleteMenu
            menuId={id}
            onClose={deleteDisclosure.onClose}
            onOpenChange={deleteDisclosure.onOpenChange}
            isOpen={deleteDisclosure.isOpen}
          />
        </Button>
      )}
    </div>
  );
}

export default MenuItemHeader;

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { FcDonate } from 'react-icons/fc';
import { IoIosLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { useFetchUser } from '@/apis/user.api';
import { PUBLIC_URL } from '@/constants/routerUrl';
import { removeLocalStorageByKey } from '@/utils/localStorage.util';
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher';
import ModalQRCode from '@/components/Modal/ModalQRCode';

function Header() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { authUser } = useFetchUser();

  const handleLogout = () => {
    removeLocalStorageByKey('google_access_token');
    queryClient.removeQueries();
    navigate(PUBLIC_URL.login, { replace: true });
  };

  return (
    <header className='h-header flex gap-2 items-center justify-between'>
      <ModalQRCode />
      <div className='flex gap-2 justify-end items-center'>
        <Button
          size='lg'
          radius='full'
          color='danger'
          className='text-white'
          startContent={<FcDonate />}
        >
          Góp tiền nuôi Xoăn cùng TuanPA
        </Button>

        <ThemeSwitcher />

        <Dropdown placement='bottom-end'>
          <DropdownTrigger>
            <Avatar
              isBordered
              as='button'
              className='transition-transform'
              src={authUser?.picture}
            />
          </DropdownTrigger>

          <DropdownMenu aria-label='Profile Actions' variant='flat'>
            <DropdownItem
              startContent={<IoIosLogOut size={20} />}
              onClick={() => {
                handleLogout();
              }}
              key='logout'
              color='danger'
            >
              Đăng xuất
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
}

export default Header;

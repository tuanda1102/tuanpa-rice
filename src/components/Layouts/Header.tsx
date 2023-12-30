import { Button } from '@nextui-org/react';
import { FcDonate } from 'react-icons/fc';
import ModalMenu from '@/features/Order/components/Modal/ModalMenu';

function Header() {
  return (
    <header className='h-header flex items-center'>
      {/* <div className='w-full py-3 px-7 flex gap-2 justify-end items-center bg-white border border-gray-200 rounded-[36px]'> */}
      <div className='w-full flex gap-2 justify-end items-center'>
        <Button
          size='lg'
          radius='full'
          color='danger'
          className='text-white'
          startContent={<FcDonate />}
        >
          Mời TuanPA ly cà phê
        </Button>
        <ModalMenu />
      </div>
    </header>
  );
}

export default Header;

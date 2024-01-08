import { useTheme } from 'next-themes';
import { type ReactNode } from 'react';
import { IoClose } from 'react-icons/io5';
import { type CloseButtonProps, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CloseButton({ closeToast }: CloseButtonProps) {
  return (
    <i onClick={closeToast} className='w-[26px] cursor-pointer'>
      <IoClose size={26} />
    </i>
  );
}

function AppToastProvider({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  return (
    <>
      {children}
      <ToastContainer
        closeButton={CloseButton}
        className='!min-w-[488px]'
        toastClassName='!text-foreground !rounded-2xl !p-6 !bg-background'
        position='bottom-right'
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme as 'light' | 'dark'}
      />
    </>
  );
}

export default AppToastProvider;

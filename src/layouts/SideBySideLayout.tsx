import { type HTMLAttributes, type ReactNode } from 'react';

import APP_IMAGES from '@/assets/images';

interface ISideBySideLayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function SideBySideLayout({ children }: ISideBySideLayoutProps) {
  return (
    <div className='h-screen'>
      <div className='fixed inset-0 flex gap-4'>
        <img
          className='w-1/2 object-cover'
          src={APP_IMAGES.sideBySideBanner}
          alt='login-banner'
        />
        <div className='w-1/2'>
          <div className='h-full flex items-center justify-center'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBySideLayout;

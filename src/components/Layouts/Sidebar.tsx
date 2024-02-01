import { Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';

import ListSidebar from '@/components/SidebarItem/ListSidebar';
import APP_IMAGES from '@/assets/images';

function Sidebar() {
  return (
    <aside
      id='default-sidebar'
      className='flex dark:bg-black bg-white'
      aria-label='Sidebar'
    >
      <div className='h-full w-sidebar border-r-2 px-3 py-4 flex flex-col justify-between overflow-y-auto'>
        <Link to='/'>
          <Image
            className='mb-10 object-cover w-[80px] h-[80px]'
            src={APP_IMAGES.logo}
          />
        </Link>

        <ListSidebar />

        <span className='text-secondary'>v2.0.0</span>
      </div>
    </aside>
  );
}

export default Sidebar;

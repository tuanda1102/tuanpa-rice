import { Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';

import ListSidebar from '@/components/SidebarItem/ListSidebar';

function Sidebar() {
  return (
    <aside
      id='default-sidebar'
      className='flex dark:bg-black bg-white w-[200px]'
      aria-label='Sidebar'
    >
      <div className='h-full w-[200px] border-r-2 px-3 py-4 flex flex-col justify-between overflow-y-auto'>
        <div>
          <Link to='/'>
            <Image
              className='mb-10'
              height={80}
              width={80}
              src='https://scontent.fdad1-4.fna.fbcdn.net/v/t1.6435-9/129351049_2943481109206930_5974791713550558502_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=M8VZemg_yFMAX9uoZ8e&_nc_ht=scontent.fdad1-4.fna&oh=00_AfDCb849-N7znv7AQHu1QwGCc5eAKkx9EITZrtHo7CbN7w&oe=65B5FF54'
            />
          </Link>
          <ListSidebar />
        </div>
        <div>
          <span className='text-secondary'>v2.0.0</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

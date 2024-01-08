import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/react';
import { Tooltip } from '@nextui-org/tooltip';
import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside
      id='default-sidebar'
      className='fixed top-0 left-0 z-40 w-sidebar h-screen transition-transform -translate-x-full sm:translate-x-0'
      aria-label='Sidebar'
    >
      <div className='h-full px-3 py-4 flex flex-col items-center overflow-y-auto'>
        <Link to='/'>
          <Image
            className='mb-10'
            height={60}
            width={60}
            src='https://scontent.fdad1-4.fna.fbcdn.net/v/t1.6435-9/129351049_2943481109206930_5974791713550558502_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=M8VZemg_yFMAX9uoZ8e&_nc_ht=scontent.fdad1-4.fna&oh=00_AfDCb849-N7znv7AQHu1QwGCc5eAKkx9EITZrtHo7CbN7w&oe=65B5FF54'
          />
        </Link>
        <ul className='space-y-2 h-full flex flex-col items-center gap-4'>
          <li>
            <Tooltip content='Order'>
              <Button color='primary' isIconOnly>
                <IoMdAdd />
              </Button>
            </Tooltip>
          </li>
        </ul>
        <span className='text-secondary'>v2.0.0</span>
      </div>
    </aside>
  );
}

export default Sidebar;

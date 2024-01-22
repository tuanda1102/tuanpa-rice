import { type ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { FaRankingStar } from 'react-icons/fa6';
import { MdOutlineRestaurantMenu } from 'react-icons/md';

import { PRIVATE_URL } from '@/constants/routerUrl';

interface IDataListSide {
  id: number;
  name: string;
  link: string;
  icon: ReactElement;
}

const dataListSide = [
  {
    id: 1,
    name: 'Menu',
    link: PRIVATE_URL.newFeeds,
    icon: (
      <MdOutlineRestaurantMenu
        className='text-black  dark:text-white '
        size={24}
      />
    ),
  },
  {
    id: 2,
    name: 'Dashboard',
    link: PRIVATE_URL.dashboard,
    icon: <AiOutlineHome className='text-black  dark:text-white ' size={24} />,
  },
  {
    id: 3,
    name: 'RankDonates',
    link: PRIVATE_URL.rankDonate,
    icon: <FaRankingStar className='text-black dark:text-white ' size={24} />,
  },
];

function ListSidebar() {
  const { pathname } = useLocation();
  return (
    <>
      {dataListSide?.map((item: IDataListSide) => (
        <div
          key={item.id}
          className='w-full py-2 hover:bg-[#F5F7F8] hover:rounded-lg dark:hover:bg-blue-600'
        >
          <Link to={item?.link} className='p-2 flex flex-row justify-start'>
            <div>{item?.icon}</div>
            <p
              className={`px-3 text-lg ${
                pathname === item?.link
                  ? 'text-blue-500 underline-offset-1 underline'
                  : ''
              }`}
            >
              {item?.name}
            </p>
          </Link>
        </div>
      ))}
    </>
  );
}
export default ListSidebar;

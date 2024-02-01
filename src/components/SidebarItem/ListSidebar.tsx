import { type ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { VscLayoutMenubar } from 'react-icons/vsc';
import { TfiDashboard } from 'react-icons/tfi';
import { FcDonate } from 'react-icons/fc';

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
    icon: <VscLayoutMenubar size={24} />,
  },
  {
    id: 2,
    name: 'Thống kê',
    link: PRIVATE_URL.dashboard,
    icon: <TfiDashboard size={24} />,
  },
  {
    id: 3,
    name: 'Donate',
    link: PRIVATE_URL.rankDonate,
    icon: <FcDonate size={24} />,
  },
];

function ListSidebar() {
  const { pathname } = useLocation();

  return (
    <div className='flex flex-col gap-4 h-full'>
      {dataListSide?.map((item: IDataListSide) => (
        <Link
          key={item.id}
          to={item?.link}
          className={`py-3 flex flex-col items-center text-center rounded-lg hover:bg-primary-50 ${
            pathname === item?.link ? 'bg-primary-50' : ''
          }`}
        >
          <i>{item?.icon}</i>
          <span className='text-xs'>{item?.name}</span>
        </Link>
      ))}
    </div>
  );
}
export default ListSidebar;

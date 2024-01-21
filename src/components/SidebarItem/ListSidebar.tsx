import { type ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface IDataListSide {
  id: number;
  name: string;
  link: string;
  icon: ReactElement;
}

function ListSidebar({ data }: { data: IDataListSide[] }) {
  const { pathname } = useLocation();
  return (
    <>
      {data?.map((item: IDataListSide) => (
        <div
          key={item.id}
          className='w-full py-2 hover:bg-[#F5F7F8] hover:rounded-lg dark:hover:bg-blue-600'
        >
          <Link to={item?.link} className='p-2 flex flex-row justify-start'>
            {' '}
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

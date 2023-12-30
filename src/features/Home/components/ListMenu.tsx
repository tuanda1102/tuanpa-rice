import { useGetMenu } from '@/apis/sheets.api';
import { PUBLIC_URL } from '@/constants/routerUrl';
import MenuCard from '@/features/Home/components/MenuCard';
import SkeletonMenuCard from '@/features/Home/components/SkeletonMenuCard';

function ListMenu() {
  const { data, isLoading } = useGetMenu();

  return (
    <div className='grid sm:grid-cols-2 xl:grid-cols-4 gap-4'>
      {isLoading && <SkeletonMenuCard />}

      {data?.length
        ? data.map((menuItem) => (
            <MenuCard
              to={`${PUBLIC_URL.order}/${menuItem.id}`}
              key={menuItem.id}
              title={menuItem.title}
              imageUrl={menuItem.image as string}
              timestamp={new Date(String(menuItem.createdAt)).toLocaleString()}
            />
          ))
        : ''}
    </div>
  );
}

export default ListMenu;

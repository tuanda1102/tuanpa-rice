import FormOrder from '@/features/NewFeeds/components/Form/FormOrder';
import TableOrder from '@/components/Table/TableOrder';
import NewFeedsMenu from '@/features/NewFeeds/components/NewFeedsMenu/NewFeedsMenu';
import useSearchParamsCustom from '@/hooks/useSearchParamsCustom';
import { type INewFeedsSearchParams } from '../types/newFeeds';

function NewFeeds() {
  const { menuId } = useSearchParamsCustom<INewFeedsSearchParams>();

  return (
    <div className='flex gap-4 h-full'>
      <NewFeedsMenu />

      <div className='w-full h-full flex flex-col justify-between items-center gap-4'>
        <TableOrder />
        {menuId ? (
          <div className='flex-grow'>
            <FormOrder />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default NewFeeds;

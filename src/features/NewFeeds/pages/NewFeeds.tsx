import FormOrder from '@/features/NewFeeds/components/Form/FormOrder';
import TableOrder from '@/components/Table/TableOrder';
import NewFeedsMenu from '@/features/NewFeeds/components/NewFeedsMenu/NewFeedsMenu';
import useSearchParamsCustom from '@/hooks/useSearchParamsCustom';
import { type INewFeedsSearchParams } from '@/features/NewFeeds/types/newFeeds';
import { useMenus } from '@/apis/order.api';

function NewFeeds() {
  const { menuId } = useSearchParamsCustom<INewFeedsSearchParams>();

  const { menuList } = useMenus();

  const currentMenu = menuList?.find((item) => item.id === menuId);
  return (
    <div className='flex gap-4 h-full'>
      <NewFeedsMenu />

      <div className='w-full h-full flex flex-col justify-between items-center gap-4'>
        <TableOrder
          price={currentMenu?.price}
          priceSale={currentMenu?.priceSale}
          isSamePrice={currentMenu?.isSamePrice}
        />
        {menuId && !currentMenu?.isBlocked ? (
          <div className='flex-grow'>
            <FormOrder
              price={currentMenu?.price}
              isSamePrice={currentMenu?.isSamePrice}
            />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default NewFeeds;

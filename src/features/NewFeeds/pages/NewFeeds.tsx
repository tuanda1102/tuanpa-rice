import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { endOfDay, startOfDay } from 'date-fns';

import FormOrder from '@/features/NewFeeds/components/Form/FormOrder';
import TableOrder from '@/components/Table/TableOrder';
import NewFeedsMenu from '@/features/NewFeeds/components/NewFeedsMenu/NewFeedsMenu';
import useSearchParamsCustom from '@/hooks/useSearchParamsCustom';
import { type INewFeedsSearchParams } from '@/features/NewFeeds/types/newFeeds';
import { useMenus } from '@/apis/order.api';

function NewFeeds() {
  const { menuId } = useSearchParamsCustom<INewFeedsSearchParams>();
  const location = useLocation();

  const [dateValue, setDateValue] = useState<Date>(new Date());
  const startAt = (date: Date): Date => {
    const parsed = startOfDay(date);
    return parsed;
  };
  const endAt = (date: Date): Date => {
    const parsed = endOfDay(date);
    return parsed;
  };

  const startDate = startAt(dateValue);
  const endDate = endAt(dateValue);

  const { menuList } = useMenus(startDate, endDate);

  useEffect(() => {
    if (location.search) {
      const params = new URLSearchParams(location.search);
      const valueDate = params.get('date');
      const dateParam = new Date(valueDate!);
      setDateValue(dateParam || new Date());
    }
  }, [location]);

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

import { ScrollShadow } from '@nextui-org/react';
import { CgCoffee } from 'react-icons/cg';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { startOfDay, endOfDay } from 'date-fns';

import { useMenus } from '@/apis/order.api';
import MenuItem from '@/features/NewFeeds/components/MenuItem/MenuItem';

function NewFeedsMenuContent() {
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

  const { menuList, isSuccess } = useMenus(startDate, endDate);

  useEffect(() => {
    if (location.search) {
      const params = new URLSearchParams(location.search);
      const valueDate = params.get('date');
      const dateParam = new Date(valueDate!);
      setDateValue(dateParam || new Date());
    }
  }, [location]);
  return (
    <>
      <ScrollShadow className='w-full flex-grow p-2'>
        {menuList && menuList?.length
          ? menuList.map((menu) => <MenuItem key={menu.id} menu={menu} />)
          : ''}

        {isSuccess && !menuList?.length ? (
          <div className='flex flex-col items-center gap2 text-foreground-400'>
            <CgCoffee size={48} />
            <h5>Không có menu để hiển thị</h5>
          </div>
        ) : (
          ''
        )}
      </ScrollShadow>
    </>
  );
}

export default NewFeedsMenuContent;

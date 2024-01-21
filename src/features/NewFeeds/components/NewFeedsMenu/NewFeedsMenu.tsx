import { ScrollShadow } from '@nextui-org/react';
import { CgCoffee } from 'react-icons/cg';
import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { startOfDay, endOfDay } from 'date-fns';

import { useMenus } from '@/apis/order.api';
import MenuItem from '@/features/NewFeeds/components/MenuItem/MenuItem';
import NewFeedsMenuHeader from '@/features/NewFeeds/components/NewFeedsMenu/NewFeedsMenuHeader';
import CDatePicker from '@/components/DatePicker/CDatePicker';

function NewFeedsMenu() {
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

  const { menuList, isLoading, isSuccess } = useMenus(startDate, endDate);

  const methods = useForm();
  const { watch } = methods;
  const dateWatch = watch('date');

  useEffect(() => {
    setDateValue(dateWatch);
  }, [dateWatch]);
  return (
    <>
      <div className='min-w-[480px] pt-4 flex flex-col'>
        <div className='flex flex-row justify-between'>
          <FormProvider {...methods}>
            <form>
              <CDatePicker name='date' id='date' isLoading={isLoading} />
            </form>
          </FormProvider>
          <NewFeedsMenuHeader />
        </div>

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
      </div>
    </>
  );
}

export default NewFeedsMenu;

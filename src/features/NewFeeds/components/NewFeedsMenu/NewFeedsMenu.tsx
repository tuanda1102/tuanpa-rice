import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { startOfDay, endOfDay } from 'date-fns';
import { useSearchParams } from 'react-router-dom';

import { useMenus } from '@/apis/order.api';
import NewFeedsMenuHeader from '@/features/NewFeeds/components/NewFeedsMenu/NewFeedsMenuHeader';
import CDatePicker from '@/components/DatePicker/CDatePicker';
import NewFeedsMenuContent from '@/features/NewFeeds/components/NewFeedsMenu/NewFeedsMenuContent';

function NewFeedsMenu() {
  const [searchParams, setSearchParams] = useSearchParams();
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
    searchParams.set('date', dateWatch);
    setSearchParams(searchParams);
    setDateValue(dateWatch || new Date());
  }, [dateWatch, searchParams, setSearchParams]);
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
        <NewFeedsMenuContent menuList={menuList} isSuccess={isSuccess} />
      </div>
    </>
  );
}

export default NewFeedsMenu;

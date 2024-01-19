import { ScrollShadow } from '@nextui-org/react';
import { CgCoffee } from 'react-icons/cg';
import { useMemo, useState } from 'react';
import { BsCalendarDate } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import { Timestamp } from 'firebase/firestore';

import { useMenus } from '@/apis/order.api';
import MenuItem from '@/features/NewFeeds/components/MenuItem/MenuItem';
import NewFeedsMenuHeader from '@/features/NewFeeds/components/NewFeedsMenu/NewFeedsMenuHeader';

function NewFeedsMenu() {
  const { menuList, isSuccess } = useMenus();
  const today = new Date();
  const [datePickerValue, setDatePickerValue] = useState<Date | null>(today);

  const matchedDatelist = useMemo(() => {
    return menuList?.filter((item) => {
      if (item.createdAt instanceof Timestamp) {
        return (
          item.createdAt.toDate().toDateString() ===
          datePickerValue?.toDateString()
        );
      }
      return false; // Handle the case where createdAt is not a Timestamp
    });
  }, [menuList, datePickerValue]);

  const handleSubmitDate = (date: Date | null) => {
    setDatePickerValue(date);
  };

  return (
    <>
      <div className='min-w-[480px] pt-4 flex flex-col'>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-row items-center h-[32px] hover:border-blue-500 hover:rounded-lg hover:border-3 justify-between'>
            <BsCalendarDate className='text-black dark:text-white' size={24} />
            <DatePicker
              maxDate={datePickerValue}
              placeholderText='Select date'
              onChange={(date) => handleSubmitDate(date)}
              selected={datePickerValue}
              className='border-none focus:outline-none pl-2 rounded-lg w-[110px]'
            />
          </div>
          <NewFeedsMenuHeader />
        </div>
        <ScrollShadow className='w-full flex-grow px-2'>
          {menuList && matchedDatelist?.length
            ? matchedDatelist.map((menu) => (
                <MenuItem key={menu.id} menu={menu} />
              ))
            : ''}

          {isSuccess && !matchedDatelist?.length ? (
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

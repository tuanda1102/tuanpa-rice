import { Controller, useFormContext } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import { BsCalendarDate } from 'react-icons/bs';
import DatePicker, { type ReactDatePickerProps } from 'react-datepicker';

interface DatePickerCustomProps extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
  isLoading?: boolean;
}

function CDatePicker({ name, isLoading, ...passProps }: DatePickerCustomProps) {
  const { trigger, control } = useFormContext();
  const today = new Date();

  return (
    <Controller
      control={control}
      name={name || 'date-input'}
      render={({ field }) => (
        <div className='flex flex-row items-center h-[32px] hover:border-blue-500 hover:rounded-lg hover:border-2 justify-between'>
          <BsCalendarDate
            className='text-black ml-4 dark:text-white'
            size={24}
          />
          <DatePicker
            maxDate={today}
            disabled={isLoading}
            placeholderText='Select date'
            {...field}
            {...passProps}
            onChange={(e) => {
              field.onChange(e);
              trigger(name);
            }}
            selected={field.value || today}
            className='border-none bg-transparent focus:outline-none pl-2 rounded-lg w-[110px]'
          />
        </div>
      )}
    />
  );
}
export default CDatePicker;

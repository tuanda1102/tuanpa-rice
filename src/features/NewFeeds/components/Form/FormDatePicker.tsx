import { useForm, FormProvider } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import CDatePicker from '@/components/DatePicker/CDatePicker';
import useSearchParamsCustom from '@/hooks/useSearchParamsCustom';

function FormDatePiker() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { date } = useSearchParamsCustom();

  const methods = useForm({
    values: {
      date: date ? new Date(date) : new Date(),
    },
  });

  return (
    <FormProvider {...methods}>
      <form>
        <CDatePicker
          name='date'
          id='date'
          onDateChange={(value) => {
            if (value) {
              searchParams.set('date', String(value));
              setSearchParams(searchParams);
            }
          }}
        />
      </form>
    </FormProvider>
  );
}

export default FormDatePiker;

import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import CDatePicker from '@/components/DatePicker/CDatePicker';

function FormDatePiker() {
  const [searchParams, setSearchParams] = useSearchParams();

  const methods = useForm();
  const { watch } = methods;
  const dateWatch = watch('date');

  useEffect(() => {
    searchParams.set('date', dateWatch || new Date());
    setSearchParams(searchParams);
  }, [dateWatch, searchParams, setSearchParams]);
  return (
    <>
      <FormProvider {...methods}>
        <form>
          <CDatePicker name='date' id='date' />
        </form>
      </FormProvider>
    </>
  );
}

export default FormDatePiker;

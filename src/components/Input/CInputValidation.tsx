import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '@nextui-org/react';

import { type ICInputProps } from '@/types/input';

function CInputValidation({
  name,
  classNameWrapper = 'mb-3',
  ...passProps
}: ICInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className={classNameWrapper}>
          <Input
            autoComplete='off'
            errorMessage={
              errors[name]?.message ? String(errors[name]?.message) : ''
            }
            isInvalid={!!errors[name]?.message}
            {...field}
            {...passProps}
          />
        </div>
      )}
    />
  );
}

export default CInputValidation;

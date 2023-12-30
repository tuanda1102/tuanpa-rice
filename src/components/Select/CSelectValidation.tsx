import { Controller, useFormContext } from 'react-hook-form';

import { CSelect } from '@/components/Select';
import { type ICSelectProps } from '@/types/select';

export default function CSelectValidation({
  name = '',
  ...passProps
}: ICSelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <CSelect
          errorMessage={errors[name]?.message as string}
          isValid={!!errors[name]?.message}
          {...field}
          {...passProps}
        />
      )}
    />
  );
}

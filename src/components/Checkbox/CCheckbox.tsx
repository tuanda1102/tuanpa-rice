import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox, type CheckboxProps } from '@nextui-org/react';

interface ICCheckboxProps extends CheckboxProps {
  classNameWrapper?: string;
  name: string;
}

function CCheckbox({
  name,
  classNameWrapper = 'mb-3',
  children,
  ...passProps
}: ICCheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className={classNameWrapper}>
          <Checkbox {...field} {...passProps}>
            {children}
          </Checkbox>
        </div>
      )}
    />
  );
}

export default CCheckbox;

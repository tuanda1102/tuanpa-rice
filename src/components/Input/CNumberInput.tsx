import NumberFormat, { type NumberFormatProps } from 'react-number-format';
import { useFormContext } from 'react-hook-form';

import { type ICInputProps } from '@/types/input';
import CInputValidation from '@/components/Input/CInputValidation';

interface ICNumberInput extends NumberFormatProps<ICInputProps> {
  disabled?: boolean;
}

function CNumberInput({
  disabled,
  label,
  id,
  placeholder = '',
  name,
  suffix = 'VNĐ',
  required = false,
  ...passProps
}: ICNumberInput) {
  const { setValue, trigger, getValues } = useFormContext();

  return (
    <div>
      <NumberFormat
        thousandSeparator
        suffix={suffix}
        customInput={CInputValidation}
        name={name}
        id={id}
        required={required}
        disabled={disabled}
        label={label}
        value={getValues(name)}
        placeholder={placeholder}
        onValueChange={(values) => {
          setValue(name, values.floatValue);
          trigger(name);
        }}
        onBlur={() => {
          trigger(name);
        }}
        {...passProps}
      />
    </div>
  );
}

export default CNumberInput;

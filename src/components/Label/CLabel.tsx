import { type HTMLAttributes } from 'react';

interface ICLabelProps extends HTMLAttributes<HTMLLabelElement> {
  isRequired?: boolean;
}

function CLabel({
  children,
  isRequired,
  className,
  ...passProps
}: ICLabelProps) {
  return (
    <label {...passProps} className={`font-semibold mb-4 ${className}`}>
      {children}
      {isRequired && <span className='text-danger ms-1'>*</span>}
    </label>
  );
}

export default CLabel;

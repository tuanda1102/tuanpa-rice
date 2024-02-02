import { type HTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@/components/ErrorMessage';

interface ICInputUploadFileProps extends HTMLAttributes<HTMLInputElement> {
  label?: string;
  disabled: boolean;
  classNameWrapper?: string;
  description?: string;
  name: string;
}

function CInputUploadFile({
  label = '',
  description = '',
  classNameWrapper = 'mb-3',
  id,
  name,
  disabled = false,
  ...passProps
}: ICInputUploadFileProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={classNameWrapper}>
      {label && (
        <label
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <input
        {...register(name)}
        id={id}
        name={name}
        type='file'
        disabled={disabled}
        className='
          block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600
          file:border-0
          file:bg-gray-100 file:me-4
          file:py-3 file:px-4
          dark:file:bg-gray-700 dark:file:text-gray-400
        '
        aria-describedby='file_input_help'
        {...passProps}
      />

      {description && (
        <p
          className='mt-1 text-sm text-gray-500 dark:text-gray-300'
          id='file_input_help'
        >
          {description}
        </p>
      )}

      {errors[name]?.message && (
        <ErrorMessage>{String(errors[name]?.message)}</ErrorMessage>
      )}
    </div>
  );
}

export default CInputUploadFile;

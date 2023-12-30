import { type ToastOptions, toast } from 'react-toastify';

import { type IToastWrapperProps } from '@/types/toast';

/**
 * Custome các dạng toast rồi bỏ vào object này
 */
const toastFunctions = {
  success: toast.success, // Khi có design, có thể thay đổi Fn default này thành một custome fn khác
  error: toast.error,
};

type ToastType = keyof typeof toastFunctions;

interface IAppToast {
  props: IToastWrapperProps;
  type?: ToastType;
  options?: Partial<ToastOptions>;
}

function ToastWrapper({ title = '', text = '', redirect }: IToastWrapperProps) {
  return (
    <div className='flex flex-col items-start gap-1 text-sm'>
      {title && <h5 className='text-lg font-normal'>{title}</h5>}

      <p className='line-clamp-3'>{text}</p>

      {redirect && (
        <a
          className='text-info'
          href={redirect.linkRedirect}
          target='_blank'
          rel='noreferrer'
        >
          {redirect.name}
        </a>
      )}
    </div>
  );
}

const appToast = ({ props, type, options }: IAppToast) => {
  const toastTypeFn = type ? toastFunctions[type] : toast;

  toastTypeFn(<ToastWrapper {...props} />, {
    ...options,
  });
};

export default appToast;

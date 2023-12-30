import { type HTMLAttributes } from 'react';

function ErrorMessage({ children }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div
      data-slot='helper-wrapper'
      className='group-data-[has-helper=true]:flex p-1 relative flex-col gap-1.5'
    >
      <div data-slot='error-message' className='text-tiny text-danger'>
        {children}
      </div>
    </div>
  );
}

export default ErrorMessage;

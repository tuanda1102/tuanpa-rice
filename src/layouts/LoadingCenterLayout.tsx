import { Spinner } from '@nextui-org/react';

function LoadingCenterLayout() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Spinner />
    </div>
  );
}

export default LoadingCenterLayout;

import { Spinner } from '@nextui-org/react';

function LoadingCenterLayout() {
  return (
    <div className='fixed inset-0 grid items-center'>
      <Spinner />
    </div>
  );
}

export default LoadingCenterLayout;

import { type ReactNode, Suspense } from 'react';

import { LoadingCenterLayout } from '@/layouts';
// import { withErrorBoundary } from 'react-error-boundary';

interface PageWrapperProps {
  children: ReactNode;
}

function PageWrapper({ children }: PageWrapperProps) {
  return <Suspense fallback={<LoadingCenterLayout />}>{children}</Suspense>;
}

// export default withErrorBoundary(PageWrapper, {
//   fallback: <GeneralError />,
//   onError(error, info) {
//     // eslint-disable-next-line no-console
//     console.log('ERROR-BOUNDARY', error);
//     // eslint-disable-next-line no-console
//     console.log('INFO-ERROR-BOUNDARY', info);
//     throw Error(error.message);
//   },
// });

export default PageWrapper;

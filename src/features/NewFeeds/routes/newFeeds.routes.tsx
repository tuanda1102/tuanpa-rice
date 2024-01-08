import { lazy } from 'react';

import { PRIVATE_URL } from '@/constants/routerUrl';
import { type IRoute } from '@/types/routes';

const NewFeeds = lazy(() => import('@/features/NewFeeds/pages/NewFeeds'));

const newFeedsRoutes: IRoute[] = [
  {
    path: PRIVATE_URL.newFeeds,
    page: <NewFeeds />,
  },
];

export default newFeedsRoutes;

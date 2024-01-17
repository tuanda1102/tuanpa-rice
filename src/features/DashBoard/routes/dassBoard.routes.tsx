import { lazy } from 'react';

import { PRIVATE_URL } from '@/constants/routerUrl';
import { type IRoute } from '@/types/routes';

const DashBoard = lazy(() => import('@/features/DashBoard/pages/DashBoard'));

const dashBoardRoutes: IRoute[] = [
  {
    path: PRIVATE_URL.dashboard,
    page: <DashBoard />,
  },
];

export default dashBoardRoutes;

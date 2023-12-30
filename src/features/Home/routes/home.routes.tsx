import { lazy } from 'react';

import { PUBLIC_URL } from '@/constants/routerUrl';
import { type IRoute } from '@/types/routes';

const Home = lazy(() => import('@/features/Home/pages/Home'));

const homeRoutes: IRoute[] = [
  {
    path: PUBLIC_URL.home,
    page: <Home />,
  },
];

export default homeRoutes;

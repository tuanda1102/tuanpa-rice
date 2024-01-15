import { lazy } from 'react';

import { PRIVATE_URL } from '@/constants/routerUrl';
import { type IRoute } from '@/types/routes';

const RankDonate = lazy(
  () => import('@/features/RankDonates/pages/RankDonate'),
);

const rankDonateRoutes: IRoute[] = [
  {
    path: PRIVATE_URL.rankDonate,
    page: <RankDonate />,
  },
];

export default rankDonateRoutes;

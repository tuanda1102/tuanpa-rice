import { lazy } from 'react';

import { PUBLIC_URL } from '@/constants/routerUrl';
import { type IRoute } from '@/types/routes';

const OrderDetail = lazy(() => import('@/features/Order/pages/OderDetail'));

const orderRoutes: IRoute[] = [
  {
    path: `${PUBLIC_URL.order}/:id`,
    page: <OrderDetail />,
  },
];

export default orderRoutes;

import { lazy } from 'react';

import { PUBLIC_URL } from '@/constants/routerUrl';
import { type IRoute } from '@/types/routes';
import { SideBySideLayout } from '@/layouts';

const Login = lazy(() => import('@/features/Authentication/pages/Login'));

const authenticationRoutes: IRoute[] = [
  {
    path: PUBLIC_URL.login,
    page: <Login />,
    layout: SideBySideLayout,
    logoutRequired: true,
  },
];

export default authenticationRoutes;

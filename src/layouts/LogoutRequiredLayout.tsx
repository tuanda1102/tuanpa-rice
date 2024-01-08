import { Navigate, useLocation } from 'react-router-dom';

import { useFetchUser } from '@/apis/user.api';
import { PRIVATE_URL } from '@/constants/routerUrl';

interface LogoutRequiredLayoutProps {
  children: JSX.Element;
  pathname: string;
}

function LogoutRequiredLayout({
  children,
  pathname,
}: LogoutRequiredLayoutProps) {
  const location = useLocation();
  const { authUser } = useFetchUser();

  if (authUser?.email) {
    if (location.pathname === pathname) {
      return <Navigate to={PRIVATE_URL.home} replace />;
    }
    return <Navigate to={pathname} replace />;
  }

  return children;
}

export default LogoutRequiredLayout;

import { lazy, Suspense } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import publicRoutes from '@/routes/public';
import renderRoutes from '@/utils/routes.util';

const InternalServerError = lazy(() => import('@/pages/InternalServerError'));
const PageNotFound = lazy(() => import('@/pages/PageNotFound'));

/**
 * Define public router
 */
function PublicOutletRouter() {
  return <Outlet />;
}

/**
 * Define all routes of App
 */
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicOutletRouter />}>
          {renderRoutes(publicRoutes)}
        </Route>

        <Route
          path='/internal-server-error'
          element={
            <Suspense>
              <InternalServerError />
            </Suspense>
          }
        />

        <Route
          path='*'
          element={
            <Suspense>
              <PageNotFound />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

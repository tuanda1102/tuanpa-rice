import { Fragment } from 'react';
import { Route } from 'react-router-dom';

import { type IRoute } from '@/types/routes';
import PageWrapper from '@/pages/PageWrapper';
import { DefaultLayout } from '@/layouts';

/**
 * Render all routes
 * @param routes
 * @returns router
 */
const renderRoutes = (routes: IRoute[]) => {
  return routes.map((route) => {
    let Layout;
    if (route.layout === undefined) {
      Layout = DefaultLayout;
    } else if (route.layout === null) {
      Layout = Fragment;
    } else {
      Layout = route.layout;
    }

    let { path } = route;

    if (route.params) {
      path = `${route.path}/${route.params}`;
    }

    return (
      <Route
        key={route.path}
        path={path}
        element={
          <Layout>
            <PageWrapper>{route.page}</PageWrapper>
          </Layout>
        }
      />
    );
  });
};

export default renderRoutes;

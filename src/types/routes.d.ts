import { type FC, type ReactNode } from 'react';

declare namespace React {
  function lazy<T extends ComponentType<any>>(
    factory: () => Promise<{ default: T }>,
  ): T;
}

export interface IRoute {
  title?: string | React.Element | ReactNode;
  documentTitle?: string | React.Element | ReactNode;
  path: string;
  layout?: React.Component | FC | JSX.Element | null;
  query?: object;
  params?: string;
  page: JSX.Element | React.LazyExoticComponent<FC<{ any }>> | FC;
  logoutRequired?: boolean;
  isFlexColumn?: boolean;
}

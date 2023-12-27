import { NextUIProvider, type NextUIProviderProps } from '@nextui-org/react';

function GlobalStylesProvider({ children, ...passProps }: NextUIProviderProps) {
  return <NextUIProvider {...passProps}>{children}</NextUIProvider>;
}

export default GlobalStylesProvider;

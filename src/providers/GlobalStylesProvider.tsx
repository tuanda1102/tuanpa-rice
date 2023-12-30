import { NextUIProvider, type NextUIProviderProps } from '@nextui-org/react';

function GlobalStylesProvider({ children, ...passProps }: NextUIProviderProps) {
  return (
    <NextUIProvider {...passProps}>
      <main className='text-foreground bg-background'>{children}</main>
    </NextUIProvider>
  );
}

export default GlobalStylesProvider;

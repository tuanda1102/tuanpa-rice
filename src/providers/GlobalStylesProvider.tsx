import { NextUIProvider, type NextUIProviderProps } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import 'apexcharts/dist/apexcharts.css';
import 'react-datepicker/dist/react-datepicker.css';

function GlobalStylesProvider({ children, ...passProps }: NextUIProviderProps) {
  return (
    <NextUIProvider {...passProps}>
      <NextThemesProvider attribute='class' defaultTheme='dark'>
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export default GlobalStylesProvider;

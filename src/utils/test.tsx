import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { RenderOptions, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FC, ReactNode } from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import routes from 'routes';
import { Context as ResponsiveContext } from 'react-responsive';
import Toaster from 'components/Toast/Toaster';
import { generalErrorToast } from 'hooks';

interface RenderAppOptions {
  route?: string;
  screen?: 'mobile' | 'tablet' | 'desktop';
}

interface ProviderProps {
  children: ReactNode;
}

// https://tanstack.com/query/latest/docs/react/guides/testing
const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
        cacheTime: Infinity,
      },
    },
    logger: {
      /* eslint-disable no-console */
      log: console.log,
      warn: console.warn,
      // ✅ no more errors on the console for tests
      error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
      /* eslint-enable no-console */
    },
    queryCache: new QueryCache({
      onError: generalErrorToast,
    }),
  });

export const renderApp = ({
  route,
  screen = 'desktop',
  ...options
}: RenderOptions & RenderAppOptions = {}) => {
  const queryClient = createQueryClient();
  const router = createMemoryRouter(routes, {
    initialEntries: [route ?? '/'],
  });
  const responsiveConfig = {
    width:
      (screen === 'mobile' && 767) || (screen === 'tablet' && 1023) || 1024,
  };

  const Providers: FC<ProviderProps> = ({ children }) => (
    <ResponsiveContext.Provider value={responsiveConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ResponsiveContext.Provider>
  );

  return {
    router,
    queryClient,
    ...render(
      <>
        <RouterProvider router={router} />
        <Toaster />
      </>,
      { wrapper: Providers, ...options }
    ),
  };
};

// re-export everything
export * from '@testing-library/react';
export { userEvent };

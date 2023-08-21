import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Toaster from 'components/Toast/Toaster';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from 'routes';
import { queryClient } from 'utils';

import '@fontsource/inter';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import './index.css';

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

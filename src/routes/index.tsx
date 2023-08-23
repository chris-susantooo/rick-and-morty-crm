import { RouteObject } from 'react-router-dom';
import queryClient from 'utils/queryClient';
import contactListLoader from './Contact/List/loader';
import contactDetailsLoader from './Contact/Details/loader';
import Home from './Home';
import Layout from './Layout';

export default [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'contact',
        lazy: async () => ({
          Component: (await import('./Contact')).default,
        }),
        loader: contactListLoader(queryClient),
        children: [
          {
            path: ':id',
            lazy: async () => ({
              Component: (await import('./Contact/Details')).default,
            }),
            loader: contactDetailsLoader(queryClient),
          },
        ],
      },
    ],
  },
] satisfies RouteObject[];

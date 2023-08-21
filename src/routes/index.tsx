import { RouteObject } from 'react-router-dom';
import queryClient from 'utils/queryClient';
import Contact from './Contact';
import ContactDetails from './Contact/Details';
import { loader as contactLoader } from './Contact/List';
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
        element: <Contact />,
        loader: contactLoader(queryClient),
        children: [
          {
            path: ':id',
            element: <ContactDetails />,
          },
        ],
      },
    ],
  },
] satisfies RouteObject[];

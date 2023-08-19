import { RouteObject } from 'react-router-dom';
import Layout from './Layout';
import Index from './Index';
import Contacts from './Contacts';
import ContactDetails from './ContactDetails';

export default [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: 'contact',
        element: <Contacts />,
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

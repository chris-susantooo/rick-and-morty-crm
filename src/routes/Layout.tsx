import SideMenu from 'components/SideMenu';
import TopMenu from 'components/TopMenu';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const appRoutes = [
  {
    name: 'Contact',
    path: '/contact',
  },
];
export type AppRoutes = typeof appRoutes;

const Layout: FC = () => (
  <div className="flex h-screen flex-col overflow-y-auto lg:flex-row">
    <TopMenu className="flex lg:hidden" routes={appRoutes} />
    <SideMenu className="hidden lg:fixed lg:flex" routes={appRoutes} />
    <Outlet />
  </div>
);

export default Layout;

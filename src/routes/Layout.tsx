import SideMenu from 'components/SideMenu';
import TopMenu from 'components/TopMenu';
import { useResponsive } from 'hooks';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const appRoutes = [
  {
    name: 'Contact',
    path: '/contact',
  },
];
export type AppRoutes = typeof appRoutes;

const Layout: FC = () => {
  const { isDesktop } = useResponsive();

  return (
    <div className="flex h-screen flex-col overflow-y-auto lg:flex-row">
      {isDesktop ? (
        <SideMenu className="fixed" routes={appRoutes} />
      ) : (
        <TopMenu className="flex" routes={appRoutes} />
      )}
      <Outlet />
    </div>
  );
};

export default Layout;

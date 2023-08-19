import Button from 'components/Button';
import { H4 } from 'components/Typography';
import { HTMLProps, forwardRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import type { AppRoutes } from 'routes/Layout';
import { cn } from 'utils';

interface Props extends HTMLProps<HTMLElement> {
  routes: AppRoutes;
}

const SideMenu = forwardRef<HTMLElement, Props>(
  ({ className, routes, ...rest }, ref) => (
    <aside
      ref={ref}
      className={cn(
        'h-full w-[16rem] shrink-0 flex-col border-e border-e-gray-100 px-6',
        className
      )}
      {...rest}
    >
      <nav className="mt-1 flex flex-col space-y-1">
        <Link to="/" className="my-3">
          <H4>Rick and Morty</H4>
        </Link>

        {routes.map(({ path, name }) => (
          <NavLink to={path} key={path}>
            {({ isActive }) => (
              <Button
                className="w-full justify-start"
                variant={isActive ? 'secondary' : 'ghost'}
              >
                {name}
              </Button>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
);

export default SideMenu;

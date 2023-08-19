import { HTMLProps, forwardRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import type { AppRoutes } from 'routes/Layout';
import { cn } from 'utils';
import Button from './Button';
import { H4 } from './Typography';

interface Props extends HTMLProps<HTMLDivElement> {
  routes: AppRoutes;
}

const TopMenu = forwardRef<HTMLDivElement, Props>(
  ({ className, routes, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        'container sticky top-0 z-20 w-full border-b border-b-gray-100 backdrop-blur-md',
        className
      )}
      data-testid="top-menu"
      {...rest}
    >
      <nav className="flex items-center">
        <Link to="/" className="my-4 me-4">
          <H4>Rick and Morty</H4>
        </Link>

        {routes.map(({ path, name }) => (
          <NavLink to={path} key={path}>
            {({ isActive }) => (
              <Button
                className={cn(isActive && 'font-semibold')}
                variant="link"
              >
                {name}
              </Button>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  )
);

export default TopMenu;

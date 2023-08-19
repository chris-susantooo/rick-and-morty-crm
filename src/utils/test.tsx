import { RenderOptions, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import routes from 'routes/config';

interface RenderAppOptions {
  route?: string;
}

export const renderApp = ({
  route,
  ...options
}: RenderOptions & RenderAppOptions = {}) => {
  const router = createMemoryRouter(routes, {
    initialEntries: [route ?? '/'],
  });

  return {
    router,
    ...render(<RouterProvider router={router} />, {
      ...options,
    }),
  };
};

// re-export everything
export * from '@testing-library/react';
export { userEvent };

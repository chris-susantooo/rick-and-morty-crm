import { FC, ReactElement, ReactNode } from 'react';
import { RenderOptions, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

interface Props {
  children: ReactNode;
}

const Providers: FC<Props> = ({ children }) =>
  // Put providers here, e.g.
  // <ThemeProvider theme="light">
  //   <TranslationProvider messages={defaultStrings}>
  children;
//   </TranslationProvider>
// </ThemeProvider>

const customRender = (ui: ReactElement, options?: RenderOptions & any) =>
  render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from '@testing-library/react';
export { userEvent };

// override render method
export { customRender as render };

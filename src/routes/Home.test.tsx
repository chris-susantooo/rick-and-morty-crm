import { renderApp, screen } from 'test-utils';

describe('Index page', () => {
  it('should render Index page by default and set page title', () => {
    renderApp();

    expect(document.title).toBe('Home | Rick and Morty');
    expect(
      screen.getByRole('heading', { name: 'Welcome!' })
    ).toBeInTheDocument();
  });
});

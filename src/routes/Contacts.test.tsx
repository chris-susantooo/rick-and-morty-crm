import { renderApp, screen } from 'test-utils';

describe('Contacts page', () => {
  it('should render Contacts page and set page title', () => {
    renderApp({ route: '/contact' });

    expect(document.title).toBe('Contacts | Rick and Morty');
    expect(screen.getByText('Contacts')).toBeInTheDocument();
  });
});

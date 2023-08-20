import { renderApp, screen, userEvent, waitFor } from 'test-utils';

vi.mock('rick-and-morty-api', () => ({
  getCharacters: () =>
    Promise.resolve({
      status: 200,
      data: {
        results: [],
      },
    }),
}));

describe('Layout', () => {
  describe.each(['mobile', 'tablet', 'desktop'] as const)(
    'navigation in %s',
    layout => {
      it('should render app title and nav links', () => {
        renderApp({ screen: layout });

        expect(
          screen.getByRole('heading', { name: 'Rick and Morty' })
        ).toBeInTheDocument();

        expect(
          screen.getByRole('link', { name: 'Contact' })
        ).toBeInTheDocument();
      });

      it('should navigate to /contact page when clicking on contact nav link', async () => {
        renderApp({ screen: layout });

        await userEvent.click(screen.getByRole('button', { name: 'Contact' }));

        await waitFor(() => {
          expect(document.title).toBe('Contact | Rick and Morty');
        });
      });

      it('should navigate to / page when clicking on app title', async () => {
        renderApp({ route: '/contact', screen: layout });
        await waitFor(() => {
          expect(document.title).toBe('Contact | Rick and Morty');
        });

        await userEvent.click(
          screen.getByRole('heading', { name: 'Rick and Morty' })
        );

        expect(document.title).toBe('Home | Rick and Morty');
      });
    }
  );
});

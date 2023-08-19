import { renderApp, screen, userEvent, within } from 'test-utils';

describe('Layout', () => {
  describe('SideMenu', () => {
    it('should render app title and nav links', () => {
      renderApp();
      const sideMenu = within(screen.getByRole('complementary'));

      expect(
        sideMenu.getByRole('heading', { name: 'Rick and Morty' })
      ).toBeInTheDocument();

      expect(
        sideMenu.getByRole('link', { name: 'Contact' })
      ).toBeInTheDocument();
    });

    it('should navigate to /contact page when clicking on contact nav link', async () => {
      renderApp();
      const sideMenu = within(screen.getByRole('complementary'));

      await userEvent.click(sideMenu.getByText('Contact'));

      expect(document.title).toBe('Contacts | Rick and Morty');
    });

    it('should navigate to / page when clicking on app title', async () => {
      renderApp({ route: '/contact' });
      const sideMenu = within(screen.getByRole('complementary'));

      await userEvent.click(
        sideMenu.getByRole('heading', { name: 'Rick and Morty' })
      );

      expect(document.title).toBe('Home | Rick and Morty');
    });
  });

  describe('TopMenu', () => {
    it('should render app title and nav links', () => {
      renderApp();
      const topMenu = within(screen.getByTestId('top-menu'));

      expect(
        topMenu.getByRole('heading', { name: 'Rick and Morty' })
      ).toBeInTheDocument();

      expect(
        topMenu.getByRole('link', { name: 'Contact' })
      ).toBeInTheDocument();
    });

    it('should navigate to /contact page when clicking on contact nav link', async () => {
      renderApp();
      const sideMenu = within(screen.getByTestId('top-menu'));

      await userEvent.click(sideMenu.getByText('Contact'));

      expect(document.title).toBe('Contacts | Rick and Morty');
    });

    it('should navigate to / page when clicking on app title', async () => {
      renderApp({ route: '/contact' });
      const sideMenu = within(screen.getByTestId('top-menu'));

      await userEvent.click(
        sideMenu.getByRole('heading', { name: 'Rick and Morty' })
      );

      expect(document.title).toBe('Home | Rick and Morty');
    });
  });
});

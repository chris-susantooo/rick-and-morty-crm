import { getCharacters } from 'rickmortyapi';
import { renderApp, screen } from 'test-utils';

vi.mock('rickmortyapi');
const mockGetCharacters = vi.mocked(getCharacters);

describe('Contact page', () => {
  beforeEach(() => {
    mockGetCharacters.mockResolvedValue({
      status: 200,
      data: { results: [] },
      statusMessage: 'OK',
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it.each(['mobile', 'tablet', 'desktop'] as const)(
    'should render contact list page on %s',
    async layout => {
      renderApp({ route: '/contact', screen: layout });

      expect(
        await screen.findByRole('heading', { name: 'Contact' })
      ).toBeInTheDocument();
      expect(document.title).toBe('Contact | Rick and Morty');
    }
  );

  it('should not render contact list page on mobile with /contact/:id route', async () => {
    renderApp({ route: '/contact/1', screen: 'mobile' });

    expect(mockGetCharacters).not.toHaveBeenCalled();

    expect(
      screen.queryByRole('heading', { name: 'Contact' })
    ).not.toBeInTheDocument();
  });
});

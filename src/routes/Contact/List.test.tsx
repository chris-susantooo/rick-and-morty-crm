import { Character, getCharacters } from 'rickmortyapi';
import { renderApp, screen, userEvent, waitFor } from 'test-utils';
import characters from './__mocks__/characters.json';

vi.mock('rickmortyapi');
const mockGetCharacters = vi.mocked(getCharacters);

const waitForRouteReady = async () => {
  expect(
    await screen.findByRole('heading', { name: 'Contact' })
  ).toBeInTheDocument();
};

const selectOption = async (triggerLabel: string, optionLabel: string) => {
  await userEvent.click(screen.getByRole('button', { name: triggerLabel }));
  await userEvent.click(screen.getByRole('menuitem', { name: optionLabel }));
};

describe('Contact list page', () => {
  beforeEach(() => {
    mockGetCharacters.mockResolvedValue({
      status: 200,
      data: { results: characters as Character[] },
      statusMessage: 'OK',
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should search as you type', async () => {
    renderApp({ route: '/contact' });
    await waitForRouteReady();

    expect(mockGetCharacters).toHaveBeenCalledWith({
      page: 1,
    });

    await userEvent.type(
      screen.getByPlaceholderText('Search Characters'),
      'rick'
    );

    await waitFor(() => {
      expect(mockGetCharacters).toHaveBeenCalledWith({
        name: 'rick',
        page: 1,
      });
    });

    expect(screen.getByDisplayValue('rick')).toBeInTheDocument();
  });

  it('should filter by status and gender', async () => {
    renderApp({ route: '/contact' });
    await waitForRouteReady();

    await selectOption('Status', 'Alive');
    expect(screen.getByRole('button', { name: 'Alive' })).toBeInTheDocument();

    await selectOption('Gender', 'Female');
    expect(screen.getByRole('button', { name: 'Female' })).toBeInTheDocument();
    await waitFor(() => {
      expect(mockGetCharacters).toHaveBeenCalledWith({
        status: 'alive',
        gender: 'female',
        page: 1,
      });
    });
  });

  it('should render reset filter button when there is an active filter', async () => {
    renderApp({ route: '/contact' });
    await waitForRouteReady();

    await selectOption('Status', 'Unknown');
    await selectOption('Gender', 'Genderless');
    await waitFor(() => {
      expect(mockGetCharacters).toHaveBeenCalledWith({
        status: 'unknown',
        gender: 'genderless',
        page: 1,
      });
    });

    await userEvent.click(screen.getByRole('button', { name: 'Reset' }));
    await waitFor(() => {
      expect(mockGetCharacters).toHaveBeenCalledWith({
        page: 1,
      });
    });
  });

  it('should render contact list items', async () => {
    const { asFragment } = renderApp({ route: '/contact' });
    await waitForRouteReady();

    const contacts = screen.getAllByRole('listitem');
    expect(contacts).toHaveLength(20);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render not found message on 404 error', async () => {
    mockGetCharacters.mockResolvedValue({
      status: 404,
      data: { results: [] },
      statusMessage: 'OK',
    });

    renderApp({ route: '/contact' });
    await waitForRouteReady();

    expect(await screen.findByText("No one's here 😿")).toBeInTheDocument();
  });

  it('should focus on search input when "/" is pressed', async () => {
    renderApp({ route: '/contact' });
    await waitForRouteReady();

    await userEvent.type(screen.getByRole('main'), '/');
    expect(screen.getByPlaceholderText('Search Characters')).toHaveFocus();
  });
});

import {
  getCharacter,
  getCharacters,
  getEpisode,
  type Character,
  type Episode,
} from 'rickmortyapi';
import { renderApp, screen, userEvent, waitFor, within } from 'test-utils';
import characters from '../__mocks__/characters.json';
import episodes from '../__mocks__/episodes.json';

vi.mock('rickmortyapi');
const mockGetCharacter = vi.mocked(getCharacter);
const mockGetCharacters = vi.mocked(getCharacters);
const mockGetEpisode = vi.mocked(getEpisode);

const waitForRouteReady = async () => {
  expect(
    await screen.findByRole('heading', { name: 'Contact' })
  ).toBeInTheDocument();
  await waitFor(() => {
    expect(document.title).toBe('Rick Sanchez | Rick and Morty');
  });
  await waitFor(() => {
    expect(mockGetEpisode).toHaveBeenCalled();
  });
};

describe('Contact details page', () => {
  beforeEach(async () => {
    await import('routes/Contact');
    mockGetCharacter.mockResolvedValue({
      status: 200,
      data: characters[0] as Character,
      statusMessage: 'OK',
    });
    mockGetCharacters.mockResolvedValue({
      status: 200,
      data: { results: characters as Character[] },
      statusMessage: 'OK',
    });
    mockGetEpisode.mockResolvedValue({
      status: 200,
      data: episodes as Episode[],
      statusMessage: 'OK',
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render personal info', async () => {
    renderApp({ route: '/contact/1' });

    await waitForRouteReady();
    expect(mockGetCharacter).toHaveBeenCalledWith(1);

    const contactDetails = within(screen.getByTestId('contact-details-page'));
    // heading and avatar
    expect(
      contactDetails.getByRole('heading', { name: 'Rick Sanchez' })
    ).toBeInTheDocument();
    expect(contactDetails.getByAltText('Rick Sanchez')).toHaveAttribute(
      'src',
      characters[0].image
    );

    const contactPersonalInfo = within(
      screen.getByTestId('contact-personal-info')
    );

    [
      { label: 'Status', value: 'Alive' },
      { label: 'Gender', value: 'Male' },
      { label: 'Species', value: 'Human' },
      { label: 'Location', value: 'Citadel of Ricks' },
      { label: 'Origin', value: 'Earth (C-137)' },
      { label: 'Created Date', value: 'November 04, 2017' },
    ].forEach(({ label, value }) => {
      expect(contactPersonalInfo.getByText(label)).toBeInTheDocument();
      expect(contactPersonalInfo.getByText(value)).toBeInTheDocument();
    });
  });

  it('should render multiple episodes', async () => {
    renderApp({ route: '/contact/1' });

    await waitForRouteReady();
    const contactDetails = within(screen.getByTestId('contact-details-page'));

    expect(contactDetails.getByText('Episodes')).toBeInTheDocument();

    const table = within(screen.getByRole('table'));

    const rows = table.getAllByRole('row');
    expect(rows).toHaveLength(1 + 3);
    ['Name', 'Air Date', 'Episode', 'Created Date'].forEach(header =>
      expect(table.getByText(header)).toBeInTheDocument()
    );

    const firstRow = within(rows[1]);
    [
      'Close Rick-counters of the Rick Kind',
      'April 7, 2014',
      'S01E10',
      'November 10, 2017',
    ].forEach(cell =>
      expect(firstRow.getByRole('cell', { name: cell })).toBeInTheDocument()
    );
  });

  it('should render single episode', async () => {
    mockGetEpisode.mockResolvedValue({
      status: 200,
      data: episodes[0] as Episode,
      statusMessage: 'OK',
    });

    renderApp({ route: '/contact/1' });
    await waitForRouteReady();

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(1 + 1);
    });

    [
      'Close Rick-counters of the Rick Kind',
      'April 7, 2014',
      'S01E10',
      'November 10, 2017',
    ].forEach(cell =>
      expect(screen.getByRole('cell', { name: cell })).toBeInTheDocument()
    );
  });

  it('should render no episodes', async () => {
    mockGetEpisode.mockResolvedValue({
      status: 200,
      data: [],
      statusMessage: 'OK',
    });

    renderApp({ route: '/contact/1' });
    await waitForRouteReady();

    expect(await screen.findAllByRole('row')).toHaveLength(2);
    expect(
      screen.getByText('This character did not appear in any episodes 🈳')
    ).toBeInTheDocument();
  });

  it('should render back button on mobile', async () => {
    renderApp({ route: '/contact/1', screen: 'mobile' });

    const backBtn = await screen.findByRole('button', { name: 'Back' });
    expect(backBtn).toBeInTheDocument();

    await userEvent.click(backBtn);
    expect(document.title).toBe('Contact | Rick and Morty');
  });
});

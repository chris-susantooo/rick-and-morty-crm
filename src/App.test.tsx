import App from 'App';
import { render, screen, userEvent } from 'test-utils';

describe('App', () => {
  it('should render title', () => {
    render(<App />);
    expect(screen.getByText('Vite + React')).toBeInTheDocument();
  });

  it('should initialize count as 0', () => {
    render(<App />);
    expect(screen.getByText('count is 0')).toBeInTheDocument();
  });

  it('should increment count when clicking on button', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByText('count is 1')).toBeInTheDocument();
  });
});

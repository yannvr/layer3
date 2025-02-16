import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { LeaderBoard as LeaderBoardRaw } from './leader-board';

const mockUsers: { users: any } = {
  users: [
    {
      rank: 1,
      address: '0xF222f955Ecced246f3181d14fB4629469cEB7681',
      avatarCid: 'QmTUefEyqzfSugwvbCnTjzRdFvp4L5yA6qjEx1yspsr17z',
      username: 'yakugakusei.eth',
      gmStreak: 248,
      xp: 169164,
      level: 41,
    },
    {
      rank: 2,
      address: '0x1234567890abcdef1234567890abcdef12345678',
      avatarCid: 'QmExampleCid2',
      username: 'user2.eth',
      gmStreak: 150,
      xp: 120000,
      level: 30,
    },
  ],
};

describe('LeadBoard Component', () => {
  beforeEach(() => {
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders loading state initially', () => {
    render(<LeaderBoardRaw />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders error state when fetch fails', async () => {
    // @ts-ignore
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      })
    );
    render(<LeaderBoardRaw />);
    await waitFor(() =>
      expect(screen.getByText(/error/i)).toBeInTheDocument()
    );
  });

  test('renders users after successful fetch', async () => {
    render(<LeaderBoardRaw />);
    await waitFor(() =>
      expect(screen.getByText('Leaderboard')).toBeInTheDocument()
    );
    expect(screen.getByText('yakugakusei.eth')).toBeInTheDocument();
    expect(screen.getByText('user2.eth')).toBeInTheDocument();
  });
});

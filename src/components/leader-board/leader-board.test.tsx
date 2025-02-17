import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LeaderBoardRaw } from './leader-board';

const mockUsers = {
  users: [
    {
      rank: 1,
      address: '0xF222f955Ecced246f3181d14fB4629469cEB7681',
      avatarCid: 'QmTUefEyqzfSugwvbCnTjzRdFvp4L5yA6qjEx1yspsr17z',
      username: 'yakugakusei.eth',
      gmStreak: 248,
      xp: 169164,
      level: 41,
      nfts: [
        {
          identifier: '1',
          display_image_url: 'https://example.com/nft1.png',
          name: 'NFT 1',
          opensea_url: 'https://opensea.io/assets/1',
          collection: 'Example Collection',
          contract: '0xExampleContract',
          token_standard: 'ERC-721',
          description: 'Example NFT description',
          external_link: 'https://example.com',
          image_original_url: 'https://example.com/nft1-original.png',
          image_url: 'https://example.com/nft1.png',
          display_animation_url: null,
          metadata_url: 'https://example.com/metadata/1',
          updated_at: '2023-10-01T00:00:00Z',
          animation_url: null,
          background_color: null,
          is_disabled: false,
          is_nsfw: false,
          traits: [],
        },
      ],
    },
    {
      rank: 2,
      address: '0x1234567890abcdef1234567890abcdef12345678',
      avatarCid: 'QmExampleCid2',
      username: 'user2.eth',
      gmStreak: 150,
      xp: 120000,
      level: 30,
      nfts: [],
    },
  ],
};

describe('LeaderBoard Component', () => {
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

  // Basic rendering test below for the key states of the component

  test('renders loading state initially', () => {
    render(
      <MemoryRouter>
        <LeaderBoardRaw loading={true} />
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders error state when fetch fails', async () => {
    // @ts-ignore
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      })
    );
    render(
      <MemoryRouter>
        <LeaderBoardRaw error="Failed to load data" />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(screen.getByText(/error/i)).toBeInTheDocument()
    );
  });

  test('renders users after successful fetch', async () => {
    render(
      <MemoryRouter>
        <LeaderBoardRaw users={mockUsers.users} />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(screen.getByText('Leaderboard')).toBeInTheDocument()
    );
    expect(screen.getByText('yakugakusei.eth')).toBeInTheDocument();
    expect(screen.getByText('user2.eth')).toBeInTheDocument();
  });

  // Use snapshot testing to test NFT rendering
  test('matches snapshot when populated with NFTs', async () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LeaderBoardRaw users={mockUsers.users} />
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByText('yakugakusei.eth')).toBeInTheDocument());
    expect(asFragment()).toMatchSnapshot();
  });

  test('matches snapshot when populated without NFTs', async () => {
    const usersWithoutNFTs = mockUsers.users.map((user: any) => ({ ...user, nfts: [] }));
    const { asFragment } = render(
      <MemoryRouter>
        <LeaderBoardRaw users={usersWithoutNFTs} />
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByText('yakugakusei.eth')).toBeInTheDocument());
    expect(asFragment()).toMatchSnapshot();
  });
});

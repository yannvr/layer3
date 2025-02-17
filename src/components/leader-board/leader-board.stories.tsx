// filepath: src/components/leader-board/leader-board.stories.tsx
import type { Meta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { LeaderBoardRaw } from './leader-board';
import { LEADER_BOARD_USER_MOCK } from './leader-board.hooks';

export default {
  title: 'Components/LeaderBoard',
  component: LeaderBoardRaw,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

export const Default = {
  args: {
    users: LEADER_BOARD_USER_MOCK.users,
    loading: false,
    error: null,
  },
};

export const TopThree = {
  args: {
    users: LEADER_BOARD_USER_MOCK.users.slice(0, 3),
    loading: false,
    error: null,
  },
};

export const Loading = {
  args: {
    users: [],
    loading: true,
    error: null,
  },
};

export const Error = {
  args: {
    users: [],
    loading: false,
    error: 'Failed to fetch leaderboard data',
  },
};

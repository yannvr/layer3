import type { Meta, StoryObj } from '@storybook/react';
import { LeaderBoard } from './leader-board';
import { LEADER_BOARD_USER_MOCK } from './leader-board.hooks';

export default {
  title: 'Components/LeadBoard',
  component: LeaderBoard
} as Meta;


export const LeadBoard: StoryObj = {
  args: {
    usersOverride: LEADER_BOARD_USER_MOCK,
  },
};

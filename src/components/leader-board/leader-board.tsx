import { FC } from 'react';
import { Link } from 'react-router-dom';
import useLeaderboardData, { User } from './leader-board.hooks';
import {
  Avatar,
  Container,
  GmStreak,
  Level,
  List,
  ListItem,
  RankBadge,
  Stats,
  Title,
  UserInfo,
  Username,
  XP,
} from './leader-board.styles';

interface LeaderBoardProps {
  users?: User[];
  loading?: boolean;
  error?: string | null;
}

const LeaderBoardUser: FC<{ user: User }> = ({ user }) => (
  <ListItem>
    <UserInfo>
      <RankBadge>{user.rank}</RankBadge>
      <Avatar src={`https://ipfs.io/ipfs/${user.avatarCid}`} alt={user.username} />
      <Username as={Link} to={`/user/${user.address}`}>
        {user.username}
      </Username>
    </UserInfo>

    <Stats>
      <GmStreak> 🔥 {user.gmStreak} </GmStreak>
      <XP> {user.xp} XP </XP>
      <Level>🎖 {user.level}</Level>
    </Stats>
  </ListItem>
);

export const LeaderBoardRaw: FC<LeaderBoardProps> = ({ users = [], loading = false, error = null }) => {
  if (loading) {
    return <Container className="text-center">Loading...</Container>;
  }

  if (error) {
    return <Container className="text-center text-red-500">Error: {error}</Container>;
  }

  return (
    <Container>
      <Title>Leaderboard</Title>
      <List>
        {users.map((user) => (
          <LeaderBoardUser key={user.address} user={user} />
        ))}
      </List>
    </Container>
  );
};

const LeaderBoard: FC<LeaderBoardProps> = (props) => {
  const { users, loading, error } = useLeaderboardData();
  return <LeaderBoardRaw users={users} loading={loading} error={error} {...props} />;
};

export default LeaderBoard;

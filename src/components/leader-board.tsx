import { FC } from 'react';
import useLeaderboardData, { User } from './leader-board.hooks';
import {
  Avatar,
  Container,
  GmStreak,
  Level,
  List,
  ListItem,
  NFTContainerHover,
  RankBadge,
  Stats,
  Title,
  Tooltip,
  UserInfo,
  Username,
  Xp,
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
      <Username href={`https://app.layer3.xyz/{user.username}`} target="_blank">
        {user.username}
      </Username>
    </UserInfo>

    <Stats>
      <GmStreak>{user.gmStreak} GM</GmStreak>
      <Xp>{user.xp} XP</Xp>
      <Level>Lvl {user.level}</Level>
      <div>
        {user.nfts && user.nfts.length > 0 && (
          <NFTContainerHover>
            <img src="/src/assets/nft-icon.png" alt="NFT" width="20" height="20" />
            <Tooltip>
              {user.nfts.map(
                (nft) =>
                  nft.display_image_url && (
                    <div key={nft.identifier}>
                      <a href={nft.opensea_url} target="_blank" rel="noopener noreferrer">
                        <img src={nft.display_image_url} alt={nft.name} width="50" height="50" />
                      </a>
                      <p>{nft.name}</p>
                    </div>
                  ),
              )}
            </Tooltip>
          </NFTContainerHover>
        )}
      </div>
    </Stats>
  </ListItem>
);

export const LeaderBoard: FC<LeaderBoardProps> = ({ users: propUsers, loading: propLoading, error: propError }) => {
  const { users: hookUsers, loading: hookLoading, error: hookError } = useLeaderboardData();
  const users = propUsers ?? hookUsers;
  const loading = propLoading ?? hookLoading;
  const error = propError ?? hookError;

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

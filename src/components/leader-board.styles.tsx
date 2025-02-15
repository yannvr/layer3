import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', 'Helvetica Rounded', 'Helvetica', 'ui-sans-serif', 'system-ui', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

/**
 * Container for the entire leaderboard area.
 * Uses a dark background and white text to match a typical layer3.xyz look.
 */
export const Container = styled.div`
  background-color: #0f0f0f;
  color: #ffffff;
  border-radius: 0.5rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
`;

/**
 * Leaderboard Title
 */
export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`;

/**
 * List that wraps each user entry.
 * Divided by a subtle border.
 */
export const List = styled.ul`
  border-top: 1px solid #2c2c2c;
  border-bottom: 1px solid #2c2c2c;
`;

/**
 * Individual item for each user on the leaderboard.
 * Uses flex layout to separate user info and stats.
 */
export const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #2c2c2c;

  &:last-of-type {
    border-bottom: none;
  }
`;

/**
 * Container for user info (avatar, rank, name, etc.).
 */
export const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

/**
 * Displays the rank in a small circular badge.
 */
export const RankBadge = styled.span`
  background-color: #292929;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  color: #ffd966;
  font-weight: 700;
  margin-right: 0.75rem;
  font-size: 0.875rem; /* ~14px */
`;

/**
 * User avatar image
 */
export const Avatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  margin-right: 0.75rem;
`;

/**
 * Username text styling
 */
export const Username = styled.span`
  font-weight: 600;
  color: #ffffff;
`;

/**
 * Container for the user’s stats (GM Streak, XP, Level).
 */
export const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

/**
 * GM Streak text, styled in gold/yellow for emphasis.
 */
export const GmStreak = styled.span`
  color: #ffd966;
`;

/**
 * XP text, styled in green for contrast.
 */
export const Xp = styled.span`
  color: #00ff7f;
`;

/**
 * Level text, styled in a lighter gray to differentiate from the other stats.
 */
export const Level = styled.span`
  color: #bbbbbb;
`;

/**
 * Container for the NFT icon and tooltip.
 */
export const NFTContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

/**
 * NFT icon.
 */
export const NFTIcon = styled.span`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  background-color: #ffd966;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #0f0f0f;
`;

/**
 * Tooltip for displaying NFTs.
 */
export const Tooltip = styled.div`
  visibility: hidden;
  width: 200px;
  background-color: #0f0f0f;
  color: #ffffff;
  text-align: center;
  border-radius: 0.5rem;
  padding: 0.5rem;
  position: absolute;
  z-index: 1;
  bottom: 125%; /* Position above the icon */
  left: 50%;
  margin-left: -100px; /* Center the tooltip */
  opacity: 0;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;

  &::after {
    content: '';
    position: absolute;
    top: 100%; /* Arrow at the bottom */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #0f0f0f transparent transparent transparent;
  }
`;

/**
 * Show the tooltip on hover.
 */
export const NFTContainerHover = styled(NFTContainer)`
  &:hover ${Tooltip} {
    visibility: visible;
    opacity: 1;
  }
`;

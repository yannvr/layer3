// filepath: /Users/yannvallery-radot/dev/iview/layer3/src/components/leader-board.styles.tsx
import styled, { createGlobalStyle } from 'styled-components';
import fireIcon from '../assets/fire.png';
import rankBadgeIcon from '../assets/rank-badge.png';

export const GlobalStyle = createGlobalStyle`
  :root {
    --color-background: #0f0f0f;
    --color-text: #ffffff;
    --color-border: #2c2c2c;
    --color-rank-badge: #292929;
    --color-rank-badge-text: #ffd966;
    --color-gm-streak: #ffd966;
    --color-xp: #00ff7f;
    --color-level: #bbbbbb;
    --color-tooltip-background: #0f0f0f;
    --color-tooltip-text: #ffffff;
    --color-tooltip-arrow: #0f0f0f;
    --color-nft-icon-background: #ffd966;
    --color-nft-icon-text: #0f0f0f;
  }

  body {
    font-family: 'Inter', 'Helvetica Rounded', 'Helvetica', 'ui-sans-serif', 'system-ui', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: var(--color-background);
    color: var(--color-text);
  }
`;

export const Container = styled.div`
  background-color: var(--color-background);
  color: var(--color-text);
  border-radius: 0.5rem;
  padding: 0;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`;

export const List = styled.ul`
  padding: 0;
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);

  // Don't be rough around the edges :)
  &:first-child {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  &:last-child {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
 }


  &:last-of-type {
    border-bottom: none;
  }

  &:nth-child(1) {
    background-color: rgba(255, 215, 0, 0.2); /* Gold */
    color: #000000; /* Ensure text contrast */
  }

  &:nth-child(2) {
    background-color: rgba(192, 192, 192, 0.2); /* Silver */
    color: #000000; /* Ensure text contrast */
  }

  &:nth-child(3) {
    background-color: rgba(205, 127, 50, 0.2); /* Bronze */
    color: #000000; /* Ensure text contrast */
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const RankBadge = styled.span`
  background-color: var(--color-rank-badge);
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  color: var(--color-rank-badge-text);
  font-weight: 700;
  margin-right: 0.75rem;
  font-size: 0.875rem; /* ~14px */
`;

export const Avatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  margin-right: 0.75rem;
`;

export const Username = styled.a`
  display: flex;
  align-items: center;
  font-weight: 600;
  color: var(--color-text);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const GmStreak = styled.span`
  display: flex;
  align-items: center;
  color: var(--color-gm-streak);
  background-image: url(${fireIcon});
  background-size: contain;
  background-repeat: no-repeat;
  padding-left: 1.5rem; /* Adjust padding to make space for the icon */
`;

export const Xp = styled.span`
  display: flex;
  align-items: center;
  color: var(--color-xp);
  background-image: url(${rankBadgeIcon});
  background-size: contain;
  background-repeat: no-repeat;
  padding-left: 1.5rem; /* Adjust padding to make space for the icon */
`;

export const Level = styled.span`
  color: var(--color-level);
`;

export const NFTContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

export const NFTIcon = styled.span`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  background-color: var(--color-nft-icon-background);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: var(--color-nft-icon-text);
`;

export const Tooltip = styled.div`
  visibility: hidden;
  width: 200px;
  background-color: var(--color-tooltip-background);
  color: var(--color-tooltip-text);
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
    border-color: var(--color-tooltip-arrow) transparent transparent transparent;
  }
`;

export const NFTContainerHover = styled(NFTContainer)`
  &:hover ${Tooltip} {
    visibility: visible;
    opacity: 1;
  }
`;

import { createRoot } from 'react-dom/client';
import { LeaderBoard } from './components/leader-board';
import { GlobalStyle } from './components/leader-board.styles';

const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(
  <>
    <GlobalStyle />
    <LeaderBoard />
  </>,
);

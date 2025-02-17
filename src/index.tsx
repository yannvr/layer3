import { createRoot } from 'react-dom/client';
import { LeaderBoard } from './components/leader-board/leader-board';
import { GlobalStyle } from './components/leader-board/leader-board.styles';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('app') as HTMLElement);
root.render(
  <>
    <GlobalStyle />
    <App />
  </>,
);

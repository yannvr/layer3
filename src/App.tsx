
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProfile from './components/leader-board/user-profile/user-profile';
import LeaderBoard from './components/leader-board/leader-board';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LeaderBoard />} />
        <Route path="/user/:walletAddress" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;

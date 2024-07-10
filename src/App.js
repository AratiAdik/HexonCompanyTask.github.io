import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import RepositoryPage from './RepositoryPage';
import RepositoryContents from './RepositoryContents';
import HistoryPage from './HistoryPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user/:username" element={<RepositoryPage />} />
        <Route path="/user/:username/repo/:repoName/contents/*" element={<RepositoryContents />} />
        <Route path="/user/:username/repo/:repoName/history" element={<HistoryPage />} />
      </Routes>
    </Router>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const HistoryPage = () => {
  const { username, repoName } = useParams();
  const [commits, setCommits] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCommits = async () => {
      const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}/commits`, {
        params: { per_page: 20, page },
      });
      setCommits(response.data);
    };

    fetchCommits();
  }, [username, repoName, page]);

  return (
    <div>
      <h2>Commit History</h2>
      <ul>
        {commits.map(commit => (
          <li key={commit.sha}>
            <p>{commit.commit.message}</p>
            <p>{commit.commit.author.name}</p>
          </li>
        ))}
      </ul>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default HistoryPage;

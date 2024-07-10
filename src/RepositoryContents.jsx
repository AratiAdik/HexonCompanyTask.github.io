import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const RepositoryContents = () => {
  const { username, repoName, path } = useParams();
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchContents = async () => {
      const url = path 
        ? `https://api.github.com/repos/${username}/${repoName}/contents/${path}`
        : `https://api.github.com/repos/${username}/${repoName}/contents`;
      const response = await axios.get(url);
      setContents(response.data);
    };

    fetchContents();
  }, [username, repoName, path]);

  return (
    <div>
      <h2>{repoName}</h2>
      <ul>
        {contents.map(item => (
          <li key={item.sha}>
            {item.type === 'dir' ? (
              <Link to={`/user/${username}/repo/${repoName}/contents/${item.path}`}>
                {item.name}
              </Link>
            ) : (
              <a href={item.download_url} target="_blank" rel="noopener noreferrer">
                {item.name}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepositoryContents;

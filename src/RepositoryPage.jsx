import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const RepositoryPage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    axios.get(`https://api.github.com/users/${username}`)
      .then(response => setProfile(response.data))
      .catch(error => console.error(error));

    axios.get(`https://api.github.com/users/${username}/repos`)
      .then(response => setRepos(response.data))
      .catch(error => console.error(error));
  }, [username]);

  return (
    <div>
      {profile && (
        <div>
          <img src={profile.avatar_url} alt={`${profile.login}'s avatar`} />
          <h2>{profile.login}</h2>
        </div>
      )}
      <ul>
        {repos.map(repo => (
          <li key={repo.id}>
            <Link to={`/user/${username}/repo/${repo.name}`}>
              {repo.name}
            </Link>
            <p>{repo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepositoryPage;

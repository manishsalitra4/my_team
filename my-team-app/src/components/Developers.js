import React from 'react';
import { useNavigate } from 'react-router-dom';

function Developers({ data }) {
  const navigate = useNavigate();

  const onDeveloperClick = (developer) => {
    navigate(`/developer/${developer.id}`, { state: { developerData: developer } });
  };

  return (
    <div>
      {data.map(developer => (
        <div
          className="developer-profile"
          key={developer.id}
          onClick={() => onDeveloperClick(developer)}
        >
          <div className="developer-photo">
            <img src={developer.image_url} alt={developer.name} />
          </div>
          <div className="developer-info">
            <p>Developer Name: {developer.name}</p>
            <p>Email: {developer.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Developers;

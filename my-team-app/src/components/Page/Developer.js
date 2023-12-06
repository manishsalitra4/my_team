import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Profile from '../Profile';
import Projects from '../Projects';
import '../Home.css';

function Developer() {
  const [projectsData, setProjectsData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { developerData } = location.state || {};
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE3MDE4NjE4MjN9.4cE3j0IxfCVHGfgkcS9fhugiNcMMv2cBYOKYyeZMS50";

  useEffect(() => {
    const id = developerData.id;

    fetch(`http://localhost:3000/users/${id}/show_projects`, {
      headers: {
        token: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setProjectsData(data))
      .catch((error) => console.error('Error fetching projects:', error));
  }, [developerData.id]);

  const handleTabClick = (tab) => {
    navigate(`/${tab.toLowerCase()}`);
  };

  if (!developerData) {
    return <div>No developer data found</div>;
  }

  return (
    <div className="home-container">
      <div className="home-profile">
        <Profile data={developerData} />
      </div>
      <div className="tab">
        <div className="nav-bar">
          <button onClick={() => handleTabClick('Home')}>
            Home
          </button>
          {/* Add more buttons for other tabs */}
        </div>
        <div className="tab-content">
          <Projects data={projectsData} />
        </div>
      </div>
    </div>
  );
}

export default Developer;

import React, { useState, useEffect } from 'react';
import './Home.css';
import Developers from './Developers';
import Profile from './Profile';
import Projects from './Projects';

function Home() {
  const [activeTab, setActiveTab] = useState('projects');
  const [projectsData, setProjectsData] = useState([]);
  const [developersData, setDevelopersData] = useState([]);
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE3MDE4NjE4MjN9.4cE3j0IxfCVHGfgkcS9fhugiNcMMv2cBYOKYyeZMS50";

  useEffect(() => {

  // Fetch projects data
  fetch('http://localhost:3000/projects', {
    headers: {
      token: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => setProjectsData(data))
    .catch((error) => console.error('Error fetching projects:', error));

  // Fetch developers data
  fetch('http://localhost:3000/users', {
    headers: {
      token: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => setDevelopersData(data))
    .catch((error) => console.error('Error fetching developers:', error));
}, [token]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="home-container">
      <div className="home-profile">
        <Profile data={{  id: 1000,
    name: 'Admin User',
    email: 'admin@example.com',
    image_url: 'https://via.placeholder.com/150'}} />
      </div>
      <div className="tab">
        <div className="nav-bar">
          <button
            className={activeTab === 'projects' ? 'active' : ''}
            onClick={() => handleTabClick('projects')}
          >
            Projects
          </button>
          <button
            className={activeTab === 'developers' ? 'active' : ''}
            onClick={() => handleTabClick('developers')}
          >
            Developers
          </button>
        </div>
        <div className="tab-content">
          {activeTab === 'projects' && <Projects data={projectsData} />}
          {activeTab === 'developers' && <Developers data={developersData} />}
        </div>
      </div>
    </div>
  );
}

export default Home;

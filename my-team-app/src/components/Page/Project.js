import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Developers from '../Developers';
import AddDeveloper from './AddDeveloper';
import RemoveDeveloper from './RemoveDeveloper';
// import EditProject from './EditProject';
import './Project.css';

function Project() {
  const [activeTab, setActiveTab] = useState();
  const [developersData, setDevelopersData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { projectData } = location.state || {};
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE3MDE4NjE4MjN9.4cE3j0IxfCVHGfgkcS9fhugiNcMMv2cBYOKYyeZMS50";

  useEffect(() => {
    const id = projectData.id;

    fetch(`http://localhost:3000/projects/${id}/show_developer`, {
      headers: {
        token: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setDevelopersData(data))
      .catch((error) => console.error('Error fetching projects:', error));
  }, [projectData.id]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  
  const handleClick = (tab) => {
    navigate(`/${tab.toLowerCase()}`);
  };


  const renderTabContent = () => {
    switch (activeTab) {
      case 'Add-developer':
        return <AddDeveloper project={projectData} />;
      case 'Remove-developer':
        return <RemoveDeveloper project={projectData} developers ={developersData} />;
      default:
        return <Developers data={developersData} />;
    }
  };

  return (
    <div className="project-page">
      <div className="container">
        <div className="project-container" key={projectData.id}>
          <div className="project-photo">
            <img src={projectData.image_url} alt={projectData.name} />
          </div>
          <div className="project-info">
            <p>{projectData.name}</p>
          </div>
        </div>
        <div className="button-container">
          <button className="home-button" onClick={() => handleClick('Home')}>
            Home
          </button>
          <button className="add-developer-button" onClick={() => handleTabClick('Add-developer')}>
            Add Developer
          </button>
          <button className="remove-developers-button" onClick={() => handleTabClick('Remove-developer')}>
            Remove Developers
          </button>
          <button className="edit-project-button">
            Edit Project
          </button>
        </div>
      </div>
      <div className="tab-content" style={{ zIndex: 1 }}>
        {renderTabContent()}
      </div>
    </div>
  );
}

export default Project;

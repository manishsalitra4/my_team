import React from 'react';
import { useNavigate } from 'react-router-dom';

function Projects({ data }) { 
  const navigate = useNavigate();

  const onDeveloperClick = (project) => {
    navigate(`/project/${project.id}`, { state: { projectData: project } });
  };

  return (
    <div>
      {data.map(project => (
        <div className="project-profile" key={project.id}  onClick={() => onDeveloperClick(project)}>
          <div className="project-photo">
            <img src={project.image_url} alt={project.name} />
          </div>
          <div className="project-info">
            <p>{project.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Projects;

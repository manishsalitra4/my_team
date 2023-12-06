// RemoveDevelopers.js
import React from 'react';

const RemoveDeveloper = ({ project, developers }) => {
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE3MDE4NjE4MjN9.4cE3j0IxfCVHGfgkcS9fhugiNcMMv2cBYOKYyeZMS50";

  const onRemoveDeveloper = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/projects/${project.id}/remove_developer/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          token: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error removing developer from project:', error);
    }
  };

  return (
    <div>
      <h2>Remove Developer</h2>
      <ul>
        {developers.map((developer) => (
          <li key={developer.id}>
            {developer.name}
            <button onClick={() => onRemoveDeveloper(developer.id)}>Remove Developer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RemoveDeveloper;

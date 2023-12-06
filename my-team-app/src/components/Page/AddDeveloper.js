import React, { useState, useEffect } from 'react';

const AddDeveloper = ({ project }) => {
  const [availableDevelopers, setAvailableDevelopers] = useState([]);
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE3MDE4NjE4MjN9.4cE3j0IxfCVHGfgkcS9fhugiNcMMv2cBYOKYyeZMS50";

  useEffect(() => {
    const fetchAvailableDevelopers = async () => {
      try {
        const response = await fetch(`http://localhost:3000/projects/available_developers`, {
          headers: {
            token: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setAvailableDevelopers(data);
      } catch (error) {
        console.error('Error fetching available developers:', error);
      }
    };

    fetchAvailableDevelopers();
  }, [token]);  // Include token in the dependency array

  const onAddDeveloper = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/projects/${project.id}/add_developer/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error adding developer to project:', error);
    }
  };

  return (
    <div>
      <h2>Add Developer</h2>
      {/* List of available developers */}
      <ul>
        {availableDevelopers.map((developer) => (
          <li key={developer.id}>
            {developer.name}
            <button onClick={() => onAddDeveloper(developer.id)}>Add Developer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddDeveloper;

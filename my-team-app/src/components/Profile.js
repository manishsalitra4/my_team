// AdminProfile.js
import React from 'react';

function AdminProfile({ data }) {
  return (
    <div className="admin-profile-container">
      <div className="admin-profile-photo">
        <img src={data.image_url} alt={data.name} />
      </div>
      <div className="admin-profile-info">
        <p>Name: {data.name}</p>
        <p>Email: {data.email}</p>
      </div>
    </div>
  );
}

export default AdminProfile;

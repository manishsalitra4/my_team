import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Developer from './components/Page/Developer';
import Project from './components/Page/Project';

import AddDeveloper from './components/Page/AddDeveloper';
import RemoveDeveloper from './components/Page/RemoveDeveloper';
// import EditProject from './components/Page/EditProject';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* This matches the root URL */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/developer/:id" element={<Developer />} />
        <Route path="/project/:id" element={<Project />} />
        <Route path="/add-developer" component={AddDeveloper} />
        <Route path="/remove-developer" component={RemoveDeveloper} />
      </Routes>
    </Router>
  );
}

export default App;

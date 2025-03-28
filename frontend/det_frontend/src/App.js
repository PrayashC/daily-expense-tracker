import React from "react";
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './window/Home'
import Login from "./window/Login";
import Signup from "./window/Signup"

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
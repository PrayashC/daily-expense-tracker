import React from "react";
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './window/Home'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DaysMoment from './pages/DaysMoment';
import DaysTime from './pages/DaysTime';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/daysmoment" element={<DaysMoment />} />
        <Route path="/daystime" element={<DaysTime />} />
      </Routes>
    </Router>
  );
}

export default App;

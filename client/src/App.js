import React, { useState, useEffect } from 'react';
import './App.css';
import CircularClock from './components/CircularClock';
import DateDisplay from './components/DateDisplay';
import QuoteDisplay from './components/QuoteDisplay';
import { motion } from 'framer-motion';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [momentsLeft, setMomentsLeft] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentDate(now);

      // Calculate moments (seconds) passed today
      const secondsPassed =
        now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
      const momentsRemaining = 86400 - secondsPassed;
      setMomentsLeft(momentsRemaining);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="App">
      <motion.div
        className="container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="app-title">DaysMoment</h1>
          <p className="app-subtitle">Every second counts. Make it matter.</p>
        </motion.div>

        <DateDisplay currentDate={currentDate} />

        <motion.div
          className="clock-section"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
        >
          <CircularClock momentsLeft={momentsLeft} />
        </motion.div>

        <QuoteDisplay />

        <motion.footer
          className="footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p>Made with ❤️ in Bangladesh</p>
        </motion.footer>
      </motion.div>
    </div>
  );
}

export default App;

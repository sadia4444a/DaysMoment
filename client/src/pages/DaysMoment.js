import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CircularClock from '../components/CircularClock';
import DateDisplay from '../components/DateDisplay';
import QuoteDisplay from '../components/QuoteDisplay';
import './DaysMoment.css';

function DaysMoment() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [momentsLeft, setMomentsLeft] = useState(0);
  const navigate = useNavigate();

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
    <div className="daysmoment-page">
      <button className="back-home-btn" onClick={() => navigate('/')}>
        ← Home
      </button>

      <motion.div
        className="daysmoment-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="daysmoment-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="daysmoment-title">DaysMoment</h1>
          <p className="daysmoment-subtitle">
            Every second counts. Make it matter.
          </p>
        </motion.div>

        <DateDisplay currentDate={currentDate} />

        <motion.div
          className="daysmoment-clock-section"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
        >
          <CircularClock momentsLeft={momentsLeft} />
        </motion.div>

        <QuoteDisplay />

        <motion.footer
          className="daysmoment-footer"
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

export default DaysMoment;

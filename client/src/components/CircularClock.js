import React from 'react';
import { motion } from 'framer-motion';
import './CircularClock.css';

const CircularClock = ({ momentsLeft }) => {
  const totalMoments = 86400;
  const percentage = (momentsLeft / totalMoments) * 100;
  const circumference = 2 * Math.PI * 100;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return { hours, minutes, secs };
  };

  const time = formatTime(momentsLeft);

  return (
    <div className="circular-clock">
      <svg width="240" height="240" viewBox="0 0 240 240">
        {/* Background circle */}
        <circle
          cx="120"
          cy="120"
          r="100"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth="15"
        />

        {/* Progress circle */}
        <motion.circle
          cx="120"
          cy="120"
          r="100"
          fill="none"
          stroke="#ffffff"
          strokeWidth="15"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 120 120)"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />

        {/* Inner glow circle */}
        <circle
          cx="120"
          cy="120"
          r="92"
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="2"
        />
      </svg>

      <div className="clock-content">
        <motion.div
          className="moments-left"
          key={momentsLeft}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="moments-number">{momentsLeft.toLocaleString()}</span>
          <span className="moments-label">moments left</span>
        </motion.div>

        <div className="time-breakdown">
          <div className="time-unit">
            <span className="time-value">
              {String(time.hours).padStart(2, '0')}
            </span>
            <span className="time-label">hours</span>
          </div>
          <span className="time-separator">:</span>
          <div className="time-unit">
            <span className="time-value">
              {String(time.minutes).padStart(2, '0')}
            </span>
            <span className="time-label">minutes</span>
          </div>
          <span className="time-separator">:</span>
          <div className="time-unit">
            <span className="time-value">
              {String(time.secs).padStart(2, '0')}
            </span>
            <span className="time-label">seconds</span>
          </div>
        </div>

        <div className="percentage">
          {percentage.toFixed(2)}% of today remains
        </div>
      </div>
    </div>
  );
};

export default CircularClock;

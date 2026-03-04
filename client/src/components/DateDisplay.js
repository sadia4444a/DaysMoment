import React from 'react';
import { motion } from 'framer-motion';
import './DateDisplay.css';

const DateDisplay = ({ currentDate }) => {
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayName = dayNames[currentDate.getDay()];
  const monthName = monthNames[currentDate.getMonth()];
  const date = currentDate.getDate();
  const year = currentDate.getFullYear();

  // Convert to 12-hour format
  let hours = currentDate.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12
  const hoursStr = String(hours).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  return (
    <motion.div
      className="date-display"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      <div className="date-info">
        <span className="day-name">{dayName}</span>
        <span className="date-number">{date}</span>
        <span className="date-suffix">{getOrdinalSuffix(date)}</span>
        <span className="month-year">
          {monthName} {year}
        </span>
        <span className="time-display">
          • {hoursStr}:{minutes}:{seconds} {ampm}
        </span>
      </div>
    </motion.div>
  );
};

export default DateDisplay;

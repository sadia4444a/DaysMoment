import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TaskTracker.css';

const motivationalQuotes = [
  "Keep going! You're doing amazing! 🌟",
  "Don't worry, you will get it! 💪",
  'Every moment of progress counts! ✨',
  "Stay focused, you're on the right path! 🎯",
  'Believe in yourself and keep pushing! 🚀',
  "You're stronger than you think! 💫",
  'Progress, not perfection! 🌈',
  "One step at a time, you've got this! 🌸",
  'Your effort today shapes tomorrow! ⭐',
  'Keep shining, keep striving! ✨',
];

function TaskTracker({ onClose }) {
  const [view, setView] = useState('create'); // 'create', 'timer', 'history', 'search'
  const [taskName, setTaskName] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [currentTask, setCurrentTask] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [todayActivities, setTodayActivities] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentQuote, setCurrentQuote] = useState('');
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const elapsedRef = useRef(0);

  useEffect(() => {
    setCurrentQuote(
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)],
    );
    fetchTodayActivities();
  }, []);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote(
        motivationalQuotes[
          Math.floor(Math.random() * motivationalQuotes.length)
        ],
      );
    }, 30000); // Change quote every 30 seconds

    return () => clearInterval(quoteInterval);
  }, []);

  const fetchTodayActivities = async () => {
    try {
      const response = await fetch(
        'http://localhost:5001/api/activities/today',
      );
      const data = await response.json();
      setTodayActivities(data);
    } catch (error) {
      console.error('Error fetching today activities:', error);
    }
  };

  const startTask = () => {
    if (!taskName.trim() || (!hours && !minutes)) return;

    const totalMinutes = (parseInt(hours) || 0) * 60 + (parseInt(minutes) || 0);
    const totalSeconds = totalMinutes * 60;

    setCurrentTask({
      name: taskName,
      totalDuration: totalSeconds,
    });
    setTimeRemaining(totalSeconds);
    startTimeRef.current = Date.now();
    elapsedRef.current = 0;
    setView('timer');
    setIsPaused(false);
    startTimer(totalSeconds);
  };

  const startTimer = (duration) => {
    timerRef.current = setInterval(() => {
      elapsedRef.current = Math.floor(
        (Date.now() - startTimeRef.current) / 1000,
      );
      const remaining = duration - elapsedRef.current;

      if (remaining <= 0) {
        completeTask();
      } else {
        setTimeRemaining(remaining);
      }
    }, 1000);
  };

  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      setIsPaused(true);
    }
  };

  const resumeTimer = () => {
    startTimeRef.current = Date.now() - elapsedRef.current * 1000;
    setIsPaused(false);
    startTimer(currentTask.totalDuration);
  };

  const stopTask = async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const timeSpent = elapsedRef.current;

    await logActivity(currentTask.name, timeSpent, false);

    resetTask();
  };

  const completeTask = async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    await logActivity(currentTask.name, currentTask.totalDuration, true);

    resetTask();
  };

  const logActivity = async (taskName, timeSpent, completed) => {
    try {
      const response = await fetch('http://localhost:5001/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskName,
          timeSpent,
          completed,
          date: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        fetchTodayActivities();
      }
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  const resetTask = () => {
    setCurrentTask(null);
    setTimeRemaining(0);
    setTaskName('');
    setHours('');
    setMinutes('');
    setIsPaused(false);
    elapsedRef.current = 0;
    setView('create');
  };

  const searchByDate = async () => {
    if (!searchDate) return;

    try {
      const response = await fetch(
        `http://localhost:5001/api/activities/date/${searchDate}`,
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching activities:', error);
    }
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatDuration = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) {
      return `${h}h ${m}m`;
    }
    return `${m}m`;
  };

  const calculateProgress = () => {
    if (!currentTask) return 0;
    return (
      ((currentTask.totalDuration - timeRemaining) /
        currentTask.totalDuration) *
      100
    );
  };

  const getTotalTimeToday = () => {
    return todayActivities.reduce(
      (total, activity) => total + activity.timeSpent,
      0,
    );
  };

  return (
    <motion.div
      className="task-tracker-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="task-tracker-container"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="tracker-header">
          <h2 className="tracker-title">Time Tracker</h2>
          <motion.p
            className="motivational-quote"
            key={currentQuote}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentQuote}
          </motion.p>
        </div>

        <div className="nav-tabs">
          <button
            className={`nav-tab ${view === 'create' || view === 'timer' ? 'active' : ''}`}
            onClick={() => setView('create')}
            disabled={view === 'timer'}
          >
            Track Time
          </button>
          <button
            className={`nav-tab ${view === 'history' ? 'active' : ''}`}
            onClick={() => setView('history')}
            disabled={view === 'timer'}
          >
            Today's Log
          </button>
          <button
            className={`nav-tab ${view === 'search' ? 'active' : ''}`}
            onClick={() => setView('search')}
            disabled={view === 'timer'}
          >
            Search
          </button>
        </div>

        <div className="tracker-content">
          <AnimatePresence mode="wait">
            {view === 'create' && (
              <motion.div
                key="create"
                className="create-task-view"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="form-group">
                  <label>Task Name</label>
                  <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="What are you working on?"
                    maxLength={50}
                  />
                </div>

                <div className="time-inputs">
                  <div className="form-group">
                    <label>Hours</label>
                    <input
                      type="number"
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                      placeholder="0"
                      min="0"
                      max="24"
                    />
                  </div>
                  <div className="form-group">
                    <label>Minutes</label>
                    <input
                      type="number"
                      value={minutes}
                      onChange={(e) => setMinutes(e.target.value)}
                      placeholder="0"
                      min="0"
                      max="59"
                    />
                  </div>
                </div>

                <button
                  className="start-btn"
                  onClick={startTask}
                  disabled={!taskName.trim() || (!hours && !minutes)}
                >
                  Start Task
                </button>
              </motion.div>
            )}

            {view === 'timer' && currentTask && (
              <motion.div
                key="timer"
                className="timer-view"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <h3 className="current-task-name">{currentTask.name}</h3>

                <div className="timer-display">
                  <svg className="progress-ring" width="200" height="200">
                    <circle
                      className="progress-ring-circle-bg"
                      cx="100"
                      cy="100"
                      r="90"
                    />
                    <motion.circle
                      className="progress-ring-circle"
                      cx="100"
                      cy="100"
                      r="90"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: calculateProgress() / 100 }}
                      transition={{ duration: 0.5 }}
                    />
                  </svg>
                  <div className="timer-text">
                    <div className="time-remaining">
                      {formatTime(timeRemaining)}
                    </div>
                    <div className="time-label">remaining</div>
                  </div>
                </div>

                <div className="timer-controls">
                  {!isPaused ? (
                    <button
                      className="control-btn pause-btn"
                      onClick={pauseTimer}
                    >
                      Pause
                    </button>
                  ) : (
                    <button
                      className="control-btn resume-btn"
                      onClick={resumeTimer}
                    >
                      Resume
                    </button>
                  )}
                  <button className="control-btn stop-btn" onClick={stopTask}>
                    Stop & Save
                  </button>
                </div>
              </motion.div>
            )}

            {view === 'history' && (
              <motion.div
                key="history"
                className="history-view"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="history-header">
                  <h3>Today's Activities</h3>
                  <div className="total-time">
                    Total: {formatDuration(getTotalTimeToday())}
                  </div>
                </div>

                <div className="activities-list">
                  {todayActivities.length === 0 ? (
                    <p className="no-data">No activities tracked today yet.</p>
                  ) : (
                    todayActivities.map((activity, index) => (
                      <motion.div
                        key={index}
                        className="activity-item"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="activity-info">
                          <span className="activity-name">
                            {activity.taskName}
                          </span>
                          <span
                            className={`activity-status ${activity.completed ? 'completed' : 'stopped'}`}
                          >
                            {activity.completed ? '✓ Completed' : '⏸ Stopped'}
                          </span>
                        </div>
                        <div className="activity-time">
                          {formatDuration(activity.timeSpent)}
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {view === 'search' && (
              <motion.div
                key="search"
                className="search-view"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="search-form">
                  <label>Search by Date</label>
                  <div className="search-input-group">
                    <input
                      type="date"
                      value={searchDate}
                      onChange={(e) => setSearchDate(e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                    />
                    <button className="search-btn" onClick={searchByDate}>
                      Search
                    </button>
                  </div>
                </div>

                <div className="search-results">
                  {searchResults.length > 0 && (
                    <>
                      <div className="search-header">
                        <h3>
                          Results for{' '}
                          {new Date(searchDate).toLocaleDateString()}
                        </h3>
                        <div className="total-time">
                          Total:{' '}
                          {formatDuration(
                            searchResults.reduce(
                              (sum, a) => sum + a.timeSpent,
                              0,
                            ),
                          )}
                        </div>
                      </div>
                      <div className="activities-list">
                        {searchResults.map((activity, index) => (
                          <motion.div
                            key={index}
                            className="activity-item"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <div className="activity-info">
                              <span className="activity-name">
                                {activity.taskName}
                              </span>
                              <span
                                className={`activity-status ${activity.completed ? 'completed' : 'stopped'}`}
                              >
                                {activity.completed
                                  ? '✓ Completed'
                                  : '⏸ Stopped'}
                              </span>
                            </div>
                            <div className="activity-time">
                              {formatDuration(activity.timeSpent)}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  )}
                  {searchDate && searchResults.length === 0 && (
                    <p className="no-data">
                      No activities found for this date.
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default TaskTracker;

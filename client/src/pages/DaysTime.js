import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './DaysTime.css';

const motivationalQuotes = [
  'Keep going! You are doing amazing!',
  'Do not worry, you will get it!',
  'Every moment of progress counts!',
  'Stay focused, you are on the right path!',
  'Believe in yourself and keep pushing!',
];

function DaysTime() {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [currentTask, setCurrentTask] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(7200);
  const [initialTime, setInitialTime] = useState(7200);
  const [isPaused, setIsPaused] = useState(false);
  const [todayActivities, setTodayActivities] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentQuote, setCurrentQuote] = useState('');
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isTodayTasksOpen, setIsTodayTasksOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const timerRef = useRef(null);

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
    }, 30000);
    return () => clearInterval(quoteInterval);
  }, []);

  useEffect(() => {
    if (currentTask && !isPaused && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            completeTask();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentTask, isPaused, timeRemaining]);

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
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    const totalSeconds = h * 3600 + m * 60;
    if (totalSeconds > 0 && taskName.trim()) {
      setCurrentTask({
        name: taskName,
        totalTime: totalSeconds,
        startTime: Date.now(),
      });
      setTimeRemaining(totalSeconds);
      setInitialTime(totalSeconds);
      setIsPaused(false);
    }
  };

  const pauseTimer = () => {
    setIsPaused(true);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  const completeTask = async () => {
    if (currentTask) {
      const timeSpent = currentTask.totalTime;
      await saveActivity(currentTask.name, timeSpent, true);
      resetTask();
    }
  };

  const stopTask = async () => {
    if (currentTask) {
      const timeSpent = currentTask.totalTime - timeRemaining;
      await saveActivity(currentTask.name, timeSpent, false);
      resetTask();
    }
  };

  const saveActivity = async (name, timeSpent, completed) => {
    try {
      await fetch('http://localhost:5001/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskName: name, timeSpent, completed }),
      });
      fetchTodayActivities();
    } catch (error) {
      console.error('Error saving activity:', error);
    }
  };

  const resetTask = () => {
    setCurrentTask(null);
    setTimeRemaining(7200);
    setInitialTime(7200);
    setTaskName('');
    setHours('');
    setMinutes('');
    setIsPaused(false);
  };

  const deleteActivity = async (activityId) => {
    try {
      await fetch(`http://localhost:5001/api/activities/${activityId}`, {
        method: 'DELETE',
      });
      fetchTodayActivities();
      if (searchResults.length > 0) searchByDate();
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
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
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hrs > 0) return `${hrs}h ${mins}m`;
    return `${mins}m`;
  };

  const getTotalTimeToday = () => {
    return todayActivities.reduce(
      (sum, activity) => sum + activity.timeSpent,
      0,
    );
  };

  const calculateProgress = () => {
    if (initialTime === 0) return 0;
    return ((initialTime - timeRemaining) / initialTime) * 100;
  };

  const getTodayStats = () => {
    const completed = todayActivities.filter((a) => a.completed).length;
    const total = todayActivities.length;
    return { completed, total };
  };

  return (
    <div className="daystime-page">
      <button className="back-home-btn-time" onClick={() => navigate('/')}>
        ← Home
      </button>

      <div className="daystime-container">
        <div className="daystime-content">
          <div className="left-sidebar">
            <div className="collapsible-section">
              <button
                className="section-toggle"
                onClick={() => setIsCreateTaskOpen(!isCreateTaskOpen)}
              >
                <span className="section-toggle-title">Create Task</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  style={{
                    transform: isCreateTaskOpen
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <AnimatePresence>
                {isCreateTaskOpen && (
                  <motion.div
                    className="section-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="task-form">
                      <div className="form-field">
                        <label>Task Name</label>
                        <input
                          type="text"
                          className="text-input"
                          value={taskName}
                          onChange={(e) => setTaskName(e.target.value)}
                          placeholder="What are you working on?"
                          maxLength={50}
                          disabled={currentTask !== null}
                        />
                      </div>
                      <div className="time-inputs">
                        <div className="form-field">
                          <label>Hours</label>
                          <input
                            type="number"
                            value={hours}
                            onChange={(e) => {
                              setHours(e.target.value);
                              const h = parseInt(e.target.value) || 0;
                              const m = parseInt(minutes) || 0;
                              const totalSeconds = h * 3600 + m * 60;
                              setTimeRemaining(totalSeconds);
                              setInitialTime(totalSeconds);
                            }}
                            placeholder="0"
                            min="0"
                            max="24"
                            disabled={currentTask !== null}
                          />
                        </div>
                        <div className="form-field">
                          <label>Minutes</label>
                          <input
                            type="number"
                            value={minutes}
                            onChange={(e) => {
                              setMinutes(e.target.value);
                              const h = parseInt(hours) || 0;
                              const m = parseInt(e.target.value) || 0;
                              const totalSeconds = h * 3600 + m * 60;
                              setTimeRemaining(totalSeconds);
                              setInitialTime(totalSeconds);
                            }}
                            placeholder="0"
                            min="0"
                            max="59"
                            disabled={currentTask !== null}
                          />
                        </div>
                      </div>
                      {!currentTask ? (
                        <button
                          className="action-btn primary"
                          onClick={startTask}
                          disabled={!taskName.trim() || (!hours && !minutes)}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                          >
                            <path d="M5 3v12l9-6z" fill="currentColor" />
                          </svg>
                          Start Timer
                        </button>
                      ) : (
                        <div className="control-btns">
                          {!isPaused ? (
                            <button
                              className="action-btn secondary"
                              onClick={pauseTimer}
                            >
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                              >
                                <rect
                                  x="4"
                                  y="2"
                                  width="3"
                                  height="14"
                                  rx="1"
                                  fill="currentColor"
                                />
                                <rect
                                  x="11"
                                  y="2"
                                  width="3"
                                  height="14"
                                  rx="1"
                                  fill="currentColor"
                                />
                              </svg>
                              Pause
                            </button>
                          ) : (
                            <button
                              className="action-btn secondary"
                              onClick={resumeTimer}
                            >
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                              >
                                <path d="M5 2v14l10-7z" fill="currentColor" />
                              </svg>
                              Resume
                            </button>
                          )}
                          <button
                            className="action-btn danger"
                            onClick={stopTask}
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                            >
                              <rect
                                x="4"
                                y="4"
                                width="10"
                                height="10"
                                rx="1"
                                fill="currentColor"
                              />
                            </svg>
                            Stop
                          </button>
                        </div>
                      )}
                      {currentTask && (
                        <div className="current-task-box">
                          <span className="task-badge">RUNNING</span>
                          <p className="task-name-display">
                            {currentTask.name}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="collapsible-section">
              <button
                className="section-toggle"
                onClick={() => setIsTodayTasksOpen(!isTodayTasksOpen)}
              >
                <div className="section-toggle-header">
                  <span className="section-toggle-title">Today's Tasks</span>
                  <span className="badge">
                    {getTodayStats().completed} / {getTodayStats().total}
                  </span>
                </div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  style={{
                    transform: isTodayTasksOpen
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <AnimatePresence>
                {isTodayTasksOpen && (
                  <motion.div
                    className="section-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="scrollable-content">
                      {todayActivities.length === 0 ? (
                        <p className="empty-text">No tasks completed today</p>
                      ) : (
                        todayActivities.map((activity) => (
                          <motion.div
                            key={activity.id}
                            className="task-card"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <div className="task-info">
                              <div className="task-title">
                                {activity.taskName}
                              </div>
                              <div className="task-meta">
                                <span className="duration">
                                  {formatDuration(activity.timeSpent)}
                                </span>
                                <span
                                  className={`status-tag ${activity.completed ? 'completed' : 'stopped'}`}
                                >
                                  {activity.completed
                                    ? '✓ Completed'
                                    : '⏸ Stopped'}
                                </span>
                              </div>
                            </div>
                            <button
                              className="delete-icon"
                              onClick={() => deleteActivity(activity.id)}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M12 4L4 12M4 4l8 8"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </button>
                          </motion.div>
                        ))
                      )}
                    </div>
                    <div className="total-bar">
                      <span>Total Time Today</span>
                      <span className="total-value">
                        {formatDuration(getTotalTimeToday())}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="collapsible-section">
              <button
                className="section-toggle"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <span className="section-toggle-title">Search History</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  style={{
                    transform: isSearchOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    className="section-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="search-box">
                      <input
                        type="date"
                        className="date-picker"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                      />
                      <button
                        className="action-btn primary"
                        onClick={searchByDate}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <circle
                            cx="8"
                            cy="8"
                            r="5"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M12 12l4 4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        Search
                      </button>
                    </div>
                    <div className="scrollable-content">
                      {searchResults.length > 0 && (
                        <>
                          <div className="result-info">
                            <span className="result-label">
                              {new Date(searchDate).toLocaleDateString(
                                'en-US',
                                {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric',
                                },
                              )}
                            </span>
                            <span className="badge">
                              {formatDuration(
                                searchResults.reduce(
                                  (sum, a) => sum + a.timeSpent,
                                  0,
                                ),
                              )}
                            </span>
                          </div>
                          {searchResults.map((activity) => (
                            <motion.div
                              key={activity.id}
                              className="task-card"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              <div className="task-info">
                                <div className="task-title">
                                  {activity.taskName}
                                </div>
                                <div className="task-meta">
                                  <span className="duration">
                                    {formatDuration(activity.timeSpent)}
                                  </span>
                                  <span
                                    className={`status-tag ${activity.completed ? 'completed' : 'stopped'}`}
                                  >
                                    {activity.completed
                                      ? '✓ Completed'
                                      : '⏸ Stopped'}
                                  </span>
                                </div>
                              </div>
                              <button
                                className="delete-icon"
                                onClick={() => deleteActivity(activity.id)}
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    d="M12 4L4 12M4 4l8 8"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </button>
                            </motion.div>
                          ))}
                        </>
                      )}
                      {searchDate && searchResults.length === 0 && (
                        <p className="empty-text">
                          No tasks found for this date
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="right-main">
            <div className="clock-section">
              <motion.p
                className="quote-text"
                key={currentQuote}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                "{currentQuote}"
              </motion.p>
              <div className="clock-wrapper">
                <div className="clock-circle">
                  <svg width="100%" height="100%" viewBox="0 0 400 400">
                    <circle
                      cx="200"
                      cy="200"
                      r="180"
                      fill="none"
                      stroke="#f0f0f0"
                      strokeWidth="16"
                    />
                    <motion.circle
                      cx="200"
                      cy="200"
                      r="180"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="16"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 180}
                      strokeDashoffset={
                        2 * Math.PI * 180 * (1 - calculateProgress() / 100)
                      }
                      transform="rotate(-90 200 200)"
                      initial={false}
                      animate={{
                        strokeDashoffset:
                          2 * Math.PI * 180 * (1 - calculateProgress() / 100),
                      }}
                      transition={{ duration: 1, ease: 'linear' }}
                    />
                  </svg>
                  <div className="clock-center">
                    <motion.div
                      className="clock-time"
                      key={timeRemaining}
                      initial={{ scale: 1.05 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {formatTime(timeRemaining)}
                    </motion.div>
                    <div className="clock-label">
                      {currentTask ? 'Remaining' : 'Set Time'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DaysTime;

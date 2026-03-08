import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      id: 'daysmoment',
      title: 'DaysMoment',
      description: 'Visualize how much time is left in your day',
      path: '/daysmoment',
      color: '#6366f1',
      delay: 0,
    },
    {
      id: 'daystime',
      title: 'DaysTime',
      description: 'Track tasks and manage your daily activities',
      path: '/daystime',
      color: '#8b5cf6',
      delay: 0.1,
    },
    // Add more features here in the future
  ];

  return (
    <div className="home-page">
      <div className="home-background-pattern"></div>

      <motion.div
        className="home-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="home-hero"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="home-title">Make Every Day Count</h1>
          <p className="home-description">
            Powerful tools to track your time, manage tasks, and make the most
            of every moment
          </p>
        </motion.div>

        <motion.div
          className="features-grid"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="feature-card"
              onClick={() => navigate(feature.path)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + feature.delay, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="feature-card-inner">
                <div
                  className="feature-accent"
                  style={{ background: feature.color }}
                ></div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
                <div className="feature-arrow">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M7.5 15L12.5 10L7.5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.footer
          className="home-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p>Made with ❤️ in Bangladesh</p>
        </motion.footer>
      </motion.div>
    </div>
  );
}

export default Home;

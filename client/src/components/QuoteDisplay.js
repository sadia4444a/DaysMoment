import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import './QuoteDisplay.css';

const QuoteDisplay = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/quotes/random');
      setQuote(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quote:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial quote
    fetchQuote();

    // Fetch new quote every 1 minute (60000 ms)
    const interval = setInterval(() => {
      fetchQuote();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="quote-display"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.8 }}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="quote-loading"
          >
            <div className="loading-spinner"></div>
          </motion.div>
        ) : quote ? (
          <motion.div
            key={quote.quote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="quote-content"
          >
            <div className="quote-icon">"</div>
            <p className="quote-text">{quote.quote}</p>
            {quote.author && <p className="quote-author">— {quote.author}</p>}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuoteDisplay;

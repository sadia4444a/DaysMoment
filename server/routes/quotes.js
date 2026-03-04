const express = require('express');
const router = express.Router();
const quotes = require('../data/quotes.json');

// Get random quote
router.get('/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  res.json(quotes[randomIndex]);
});

// Get all quotes
router.get('/', (req, res) => {
  res.json(quotes);
});

// Get quote by category
router.get('/category/:category', (req, res) => {
  const { category } = req.params;
  const filteredQuotes = quotes.filter(
    (q) => q.category.toLowerCase() === category.toLowerCase(),
  );
  res.json(filteredQuotes);
});

module.exports = router;

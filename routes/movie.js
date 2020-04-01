const express = require('express');
const router = express.Router();
const quotes = require('../controller/getQuotes');

router.get('/', (req, res) => {
  res.send('Enter the IMDB ID of the movie to proceed');
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  await quotes(id);
  res.send(id);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const getQuotes = require('../controller/getQuotes');

router.get('/', (req, res) => {
  res.send('Enter the IMDB ID of the movie to proceed');
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  let quotes = await getQuotes(id);
  res.json(quotes);
});

module.exports = router;

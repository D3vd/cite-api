const express = require('express');
const router = express.Router();
const getQuotes = require('../controller/getQuotes');

router.get('/', (req, res) => {
  res.send('Enter the IMDB ID of the movie to proceed');
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  let { quotes, error } = await getQuotes(id);

  // ERROR HANDLING
  // For Invalid IMDB ID and No Quotes in IMDB Page
  if (error !== null) {
    if (error === 'Invalid IMDB ID') {
      res.status(404).json({
        code: 404,
        message: 'Invalid IMDB ID. Please check the ID and try again.'
      });
      return;
    } else if (error === 'No quotes for movie') {
      res.status(200).json({
        code: 200,
        quotes: [],
        length: 0,
        message: `Movie with id ${id} does not have any quotes on it's IMDB Page`
      });
      return;
    }
  }

  // Successful Response
  res.status(200).json({
    code: 200,
    quotes,
    length: quotes.length,
    message: `Successfully found ${quotes.length} quotes for movie ${id}`
  });
});

module.exports = router;

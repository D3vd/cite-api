const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Enter the IMDB ID of the movie to proceed');
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(id);
});

module.exports = router;

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    code: 200,
    message: 'The app has been awoken!'
  });
});

module.exports = router;

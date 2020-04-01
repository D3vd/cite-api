const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Try /movie/imbd_id/ to use the api');
});

module.exports = router;

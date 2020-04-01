const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));

app.get('/', (req, res) => res.send('Try movie/imdb_id/ to use the API'));

app.get('/movie/:imdb_id', (req, res) => {
  res.send(req.params.imdb_id);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

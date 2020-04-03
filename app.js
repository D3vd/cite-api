const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(logger('tiny'));
app.use(cors());

// Routes
app.use('/', require('./routes/index'));
app.use('/movie', require('./routes/movie'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

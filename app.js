const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const Database = require('./controller/database');

const app = express();

app.use(logger('tiny'));
app.use(cors());

// Routes
app.use('/', require('./routes/index'));
app.use('/movie', require('./routes/movie'));

// Initialize MongoDB
db = new Database();

const PORT = process.env.PORT || 5000;

mongoose.connection.once('open', () => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});

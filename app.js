const express = require('express');
const logger = require('morgan');

const app = express();

app.use(logger('tiny'));

// Routes
app.use('/', require('./routes/index'));
app.use('/movie', require('./routes/movie'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

let mongoose = require('mongoose');

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    const uri = process.env.MONGODB_URI;

    mongoose
      .connect(`${uri}`, { useUnifiedTopology: true, useNewUrlParser: true })
      .then(() => {
        console.log('Database connection successful');
      })
      .catch(err => {
        console.error('Database connection error', err);
      });
  }
}

module.exports = Database;

const mongoose = require('mongoose');

let quotesSchema = new mongoose.Schema({
  id: String,
  name: String,
  poster: String,
  quotes: [[String]],
  length: Int
});

module.exports = mongoose.model('Quotes', quotesSchema);

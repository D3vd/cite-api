const mongoose = require('mongoose');

let quotesJSON = {
  id: String,
  name: String,
  poster: String,
  quotes: [[String]],
  count: Number
};

let QuotesSchema = new mongoose.Schema(quotesJSON, {
  timestamps: true
});

module.exports = mongoose.model('Quotes', QuotesSchema);

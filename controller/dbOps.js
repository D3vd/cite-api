let Quotes = require('../models/quotes');

async function getFromDB(id) {
  let quotes = await Quotes.findOne({
    id
  });

  return quotes;
}

async function writeToDB(id, name, quotes, poster) {
  let quotesJSON = {};

  if (quotes === undefined) {
    quotesJSON = {
      id,
      name,
      quotes,
      poster,
      count: 0
    };
  } else {
    quotesJSON = {
      id,
      name,
      quotes,
      poster,
      count: quotes.length
    };
  }

  var quotesDoc = new Quotes(quotesJSON);
  await quotesDoc.save();
}

module.exports = { writeToDB, getFromDB };

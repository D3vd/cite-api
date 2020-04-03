const scrapeQuotes = require('./scrape');
const DB = require('./dbOps');

async function getQuotes(id) {
  let DBQuotes = await DB.getFromDB(id);

  if (DBQuotes === null) {
    let { quotes, name, poster, error } = await scrapeQuotes(id);

    if (error !== 'Invalid IMDB ID') {
      await DB.writeToDB(id, name, quotes, poster);
    }

    return {
      quotes,
      name,
      poster,
      error
    };
  }

  return {
    quotes: DBQuotes.quotes,
    name: DBQuotes.name,
    poster: DBQuotes.name,
    error: ''
  };
}

module.exports = getQuotes;

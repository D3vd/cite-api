const scrapeQuotes = require('./scrape');

async function getQuotes(id) {
  let quotes = await scrapeQuotes(id);

  return quotes;
}

module.exports = getQuotes;

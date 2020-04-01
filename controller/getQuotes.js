const scrapeQuotes = require('./scrape');

async function getQuotes(id) {
  await scrapeQuotes(id);
}

module.exports = getQuotes;

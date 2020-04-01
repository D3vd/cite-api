const scrapeQuotes = require('./scrape');

async function getQuotes(id) {
  let { quotes, error } = await scrapeQuotes(id);

  return { quotes, error };
}

module.exports = getQuotes;

const scrapeQuotes = require('./scrape');

async function getQuotes(id) {
  let { quotes, name, poster, error } = await scrapeQuotes(id);

  return { quotes, name, poster, error };
}

module.exports = getQuotes;

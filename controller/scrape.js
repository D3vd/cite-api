const puppeteer = require('puppeteer');

async function scrape(id) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Visit the quotes page of the movie
  await page.goto(`https://www.imdb.com/title/${id}/quotes/`, {
    waitUntil: 'networkidle2'
  });

  let { quotes, error } = await page.evaluate(() => {
    let quotes_content = document.getElementById('quotes_content');

    // Check if the IMDB ID is invalid
    // 'quotes_content' will not be present if ID is invalid
    if (quotes_content === null) {
      return {
        raw_quotes: [],
        error: 'Invalid IMDB ID'
      };
    }

    // Check if the movie's page has no quotes
    // If the movie's page has no quotes then a div with id 'no_content' will be present
    if (quotes_content.querySelector('#no_content') !== null) {
      return {
        raw_quotes: [],
        error: 'No quotes for movie'
      };
    }

    let quotes_raw_list = quotes_content.querySelector('.list').children;

    let length = quotes_raw_list.length;

    raw = [];

    for (let i = 0; i < length; i++) {
      let quote_children = quotes_raw_list[i].querySelector('.sodatext')
        .children;

      let quote_array = [];

      quote_children.forEach(element => {
        inner = element.innerHTML
          .replace(/\r?\n|\r/g, '')
          .replace(/<a.*?>/g, '')
          .replace(/<span.*?>/g, '')
          .replace(/<\/a>/g, '')
          .replace(/<\/span>/g, '');

        quote_array.push(inner);
      });

      raw.push(quote_array);
    }

    return {
      quotes: raw,
      error: null
    };
  });

  await browser.close();

  return {
    quotes,
    error
  };
}

module.exports = scrape;

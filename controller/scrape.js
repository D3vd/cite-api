const puppeteer = require('puppeteer');

async function scrape(id) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  //TODO: Add wrong ID Error handling and no quotes

  // Visit the quotes page of the movie
  await page.goto(`https://www.imdb.com/title/${id}/quotes/`, {
    waitUntil: 'networkidle2'
  });

  let raw_quotes = await page.evaluate(() => {
    let quotes_raw_list = document
      .getElementById('quotes_content')
      .querySelector('.list').children;

    let length = quotes_raw_list.length;

    raw = [];

    for (let i = 0; i < length; i++) {
      let quote_children = quotes_raw_list[i].querySelector('.sodatext')
        .children;

      let quote_array = [];

      quote_children.forEach(element => {
        inner = element.innerHTML.replace(/\r?\n|\r/g, '');
        quote_array.push(inner);
      });

      let quote_object = {
        cnt: i + 1,
        quote: quote_array
      };

      raw.push(quote_object);
    }

    return raw;
  });

  console.log(raw_quotes);

  await browser.close();
}

module.exports = scrape;

const puppeteer = require('puppeteer');

async function scrape(id) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Visit the quotes page of the movie
  await page.goto(`https://www.imdb.com/title/${id}/quotes/`, {
    waitUntil: 'networkidle2'
  });

  await browser.close();
}

module.exports = scrape;

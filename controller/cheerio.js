const axios = require('axios');
const cheerio = require('cheerio');

async function scrape(id) {
  let html = null;
  let error = null;

  await axios
    .get(`https://www.imdb.com/title/${id}/quotes`)
    .then(res => {
      html = res.data;
    })
    .catch(er => {
      error = er;
    });

  if (error !== null) {
    return {
      quotes: [],
      error: 'Invalid IMDB ID',
      name: '',
      poster: ''
    };
  }

  const $ = cheerio.load(html);

  let content = $('#quotes_content');

  if (content.html() === null) {
    return {
      quotes: [],
      error: 'Invalid IMDB ID',
      name: '',
      poster: ''
    };
  }

  let subpage_block = $('.subpage_title_block');

  let small_poster = subpage_block.find('.poster').attr('src');
  let poster = small_poster.split('@._V1_')[0] + '@._V1_.jpg';

  let name_cnt = subpage_block
    .find('.parent')
    .find('a')
    .text()
    .replace(/\r?\n|\r/g, '');

  let year_cnt = subpage_block
    .find('.parent')
    .find('.nobr')
    .text()
    .replace(/ /g, '')
    .replace(/\r?\n|\r/g, '');

  let name = name_cnt + ' ' + year_cnt;

  if (content.find('#no_content').html() !== null) {
    return {
      quotes: [],
      error: 'No quotes for movie',
      name,
      poster
    };
  }

  let quotes = [];

  content
    .find('.list')
    .find('.sodatext')
    .each(function() {
      let quote = [];
      $(this)
        .find('p')
        .each(function() {
          quote.push(
            $(this)
              .text()
              .replace(/\r?\n|\r/g, '')
              .replace(/<a.*?>/g, '')
              .replace(/<span.*?>/g, '')
              .replace(/<\/a>/g, '')
              .replace(/<\/span>/g, '')
          );
        });
      quotes.push(quote);
    });

  return {
    quotes,
    name,
    poster,
    error: null
  };
}

module.exports = scrape;

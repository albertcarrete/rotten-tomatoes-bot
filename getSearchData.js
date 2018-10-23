import puppeteer from 'puppeteer';
import $ from 'cheerio';

export default async(term) => {
  try{
  let url = `https://www.rottentomatoes.com/search/?search=${encodeURIComponent(term)}`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const html = await page.content();
  var results = [];
  var resulting = $('.results_ul > li > .details', html);
  resulting.each(function(i,elem){
    var year = $('.movie_year',this).text();
    var el = $('span.bold > .articleLink',this);
    var text = el.text();
    var link = el.attr('href');

    if(text && link){
      results.push({
        "text":text+year,
        "command":link.replace('/m/','/tomato ')
      })
    }
  })
  await browser.close();
  return results;
  }catch(err){
    console.log(err);
    return err;
  }
}
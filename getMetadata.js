const $ = require('cheerio');
const puppeteer = require('puppeteer');
const rp = require('request-promise');
const fetch = require("node-fetch");
import {toSeoUrl} from './utils';

// function toSeoUrl(url) {
//   return url.toString()               // Convert to string
//       .replace(/\s+/g,'_')            // Change whitespace to dashes
//       .toLowerCase()                  // Change to lowercase
//       .replace(/[^a-z0-9\-\_]/g,'')     // Remove anything that is not a letter, number or dash
//       .replace(/-+/g,'-')             // Remove duplicate dashes
//       .replace(/^-*/,'')              // Remove starting dashes
//       .replace(/-*$/,'');             // Remove trailing dashes
// }

export default async(param) =>{
  let cleanParam = toSeoUrl(param);
  let url = `https://www.rottentomatoes.com/m/${cleanParam}`;

  try{
    let res = await fetch(url);
    let html = await res.text();
    let critic  = $('.critic-score .meter-value > span',html);
    let audience = $('.audience-score .meter-value > span',html);
    let poster_img = $('.posterImage',html).attr('src');
    var title = $('meta[property="og:title"]', html).attr('content')
    
    let audience_score = "N/A";
    if(audience && audience['0'] && audience['0'].children[0] && audience['0'].children[0].data){
      audience_score= audience['0'].children[0].data;
    }

    let critic_score = "N/A";
    if(critic && critic['0'] && critic['0'].children[0] && critic['0'].children[0].data){
      critic_score = critic['0'].children[0].data + "%";
    }
    
    if(title !== undefined){
      return {audience_score, critic_score, poster_img, title};
    }else{
      return null;
    }

  }catch(err){
    console.log(err);
    return null;
  }
}
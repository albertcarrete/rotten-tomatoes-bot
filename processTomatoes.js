const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

import getMetadata from './getMetadata';
import getSearchData from './getSearchData';

export default async({ match, reply, replyWithPhoto })=>{
  try{
    console.log("Processing tomatoes...")
    let data = await getMetadata(match[1]);
    console.log(data);
    if(data !== null){
      replyWithPhoto({ url: data.poster_img },
      Extra.load({ caption: `*${data.title}*\nCritic: ${data.critic_score} | Audience: ${data.audience_score}` }).markdown())
    }else{
      console.log("searching...");
      let items = await getSearchData(match[1]);
      console.log("items");
      console.log(items);
      if(items.length > 0){
        reply(`We couldn't find a movie titled '${match[1]}', perhaps you meant one of these titles?`, Extra.HTML().markup((m) =>
          m.inlineKeyboard(items.map(item => {return m.callbackButton(`${item.text}`,`${item.command}`);}),{columns:1}).resize()
          ))
      }else{
        reply(`A movie titled ${match[1]} either doesn't exist or there are no scores available.`)
      }
    }
    
  }catch(err){
    console.log(err);
  }
}
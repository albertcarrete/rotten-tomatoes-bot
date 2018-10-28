
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const fetch = require('node-fetch')

import processTomatoes from './processTomatoes';
import getSearchData from './getSearchData';
import keys from './config/keys';
import {toSeoUrl} from './utils';
// const getScores = require('./getScores');
// async/await example.

const bot = new Telegraf(keys.botToken)

bot.action(/tomato (.+)/, async(ctx) => {
  try{
    processTomatoes(ctx);
  }catch(err){
    console.log(err);
  }
})

bot.hears(/tomato (.+)/, async(ctx) => {
  try{
    await processTomatoes(ctx)
  }catch(err){
    console.log(err);
  }
})

bot.hears(/tomatofinder (.+)/, async({match, reply})=>{
  try{
    let items = await getSearchData(match[1]);
    if(items.length > 0){
      reply("Here's a list of movies we found...", Extra.HTML().markup((m) =>
        m.inlineKeyboard(items.map(item => {return m.callbackButton(`${item.text}`,`${item.command}`);}),{columns:1}).resize()
        ))
    }else{
      reply(`We were unable to find anything matching '${match[1]}'.`)
    }
  }catch(err){
    console.log(err);
  }
})

bot.startPolling()
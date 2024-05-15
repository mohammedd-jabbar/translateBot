import express from "express";
import { Telegraf } from "telegraf";
import { translateText, gpt, detectLanguage } from "../lib/functions";
import { TError } from "../types/type";

// dotenv
require("dotenv").config();

// express server
const server = express();

// configure telegram with api key
const bot = new Telegraf(process.env.TELEGRAM_TOKEN as string);

// run the server
server.use(express.json());

bot.command("start", (ctx) => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    "بەخێربێیت من دروست کراووم لەلایەن `@Mohammed_jabbar` \n\n ئەرکی من ئەوەیە نووسینی عەرەبی بکەم بە کوردی بە باشترین شێواز!"
  );
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  try {
    if (msg.from.id.toString() === process.env.SPECIAL_USER && msg.text) {
      // check if the text is arabic or not
      const isArabic = await detectLanguage(msg.text);

      if (isArabic) {
        // send the Arabic text to gpt
        const gptAnswer = await gpt(msg.text);

        // translate English to kurdish
        const translatedText = await translateText(gptAnswer);

        // send the kurdish text to user
        bot.telegram.sendMessage(
          chatId,
          `${translatedText}\n\nدروستکەری بۆت: @Mohammed_jabbar`
        );
      } else {
        bot.telegram.sendMessage(
          chatId,
          "ببوورە ئەم بۆتە تەنها وەرگێران بۆ زمانی عەرەبی ئەکات!"
        );
      }
    } else {
      bot.telegram.sendMessage(chatId, "ببوورە ئەم بۆتە بۆتۆ نیە!");
    }
  } catch (error) {
    console.log(error as TError);
    bot.telegram.sendMessage(chatId, "ببوورە کێشەیەک ڕوویدا!");
  }
});

bot.launch();

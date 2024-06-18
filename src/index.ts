import express from "express";
import { Telegraf } from "telegraf";
import { translateText, gpt, detectLanguage } from "../lib/functions";
import { TError } from "../types/type";

// dotenv
require("dotenv").config();

// express server
const server = express();
const port = 3000;

// configure telegram with api key
const bot = new Telegraf(process.env.TELEGRAM_TOKEN as string);

// run the server
server.use(express.json());

bot.command("start", (ctx) => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    "بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ \n\nبەخێربێیت من دروست کراووم لەلایەن `@Mohammed_jabbar` \n\n ئەرکی من ئەوەیە نووسینی زۆربەی زمانەکان بکەم بە کوردی بە باشترین شێواز بە ژیری دەست کرد و بە وەرگێری گوگڵ!"
  );
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  try {
    if (
      (msg.from.id.toString() === process.env.SPECIAL_USER ||
        msg.from.id.toString() === "1001090091" ||
        msg.from.id.toString() === process.env.SPECIAL_USER2) &&
      msg.text
    ) {
      // check if the text is arabic or not
      const detectLanguageName = await detectLanguage(msg.text);

      if (detectLanguageName) {
        // send the Arabic text to gpt
        const gptAnswer = await gpt(msg.text, detectLanguageName);

        // translate English to kurdish
        const translatedText = await translateText(gptAnswer);
        const translatedTextWithoutGPT = await translateText(msg.text);
        console.log("====================================");
        console.log(`${detectLanguageName} text:`, msg.text);
        console.log("====================================");
        console.log("English text:", gptAnswer);
        console.log("====================================");
        console.log("Kurdish text:", translatedText.replace(/&quot;/g, ""));
        console.log("====================================");
        console.log(
          "Without GPT text:",
          translatedTextWithoutGPT.replace(/&quot;/g, "")
        );

        // send the kurdish text to user
        bot.telegram.sendMessage(
          chatId,
          `١. ورگێرانی زمانی ${detectLanguageName} بۆ کوردی بە ژیری دەستکرد:\n\n'${translatedText.replace(
            /&quot;/g,
            ""
          )}'\n\n٢. ورەگێرانی زمانی ${detectLanguageName} بۆ کوردی بەبێ ژیری دەستکرد بە وەرگێری گوگڵ:\n\n'${translatedTextWithoutGPT.replace(
            /&quot;/g,
            ""
          )}'\n\nدروستکەری بۆت: @Mohammed_jabbar`
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

server.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

bot.launch();

// bot.telegram.sendMessage(
//   chatId,
//   "ببوورە ئەم بۆتە تەنها وەرگێران بۆ زمانی عەرەبی ئەکات!"
// );

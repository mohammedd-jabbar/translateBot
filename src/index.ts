import express from "express";
const expressApp = express();
import { Telegraf } from "telegraf";
import { translate, gpt, isArabic } from "../lib/functions";

require("dotenv").config();

const bot = new Telegraf(process.env.TELEGRAM_TOKEN as string);

expressApp.use(express.json());

bot.command("start", (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, "test");
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  if (msg.from.id.toString() === process.env.SPECIAL_USER && msg.text) {
    if (isArabic(msg.text)) {
      console.log("The user input is in Arabic.");
    } else {
      console.log("The user input is not in Arabic.");
    }

    // const translatedText = await translate(msg.text);
    // const gptAnswer = await gpt(msg.text);
    // console.log(gptAnswer.choices[0].message);
    // bot.telegram.sendMessage(chatId, translatedText);
  } else {
    bot.telegram.sendMessage(chatId, "Sorry this bot is not for you");
  }
});

bot.launch();

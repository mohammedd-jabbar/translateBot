import express from "express";
const expressApp = express();
import axios from "axios";

import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { Translate } from "../lib/functions";

require("dotenv").config();
// import OpenAI from "openai";

const bot = new Telegraf(process.env.TELEGRAM_TOKEN as string);
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API,
// });

expressApp.use(express.json());

bot.command("start", (ctx) => {
  bot.telegram.sendMessage(
    ctx.chat.id,
    "Hello there! Welcome to the Mohammed's telegram bot.\n Please try it"
  );
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  if (msg.from.id.toString() === process.env.SPECIAL_USER && msg.text) {
    const translatedText = await Translate(msg.text);
    bot.telegram.sendMessage(chatId, translatedText);
  } else {
    bot.telegram.sendMessage(chatId, "Sorry this bot is not for you");
  }
});

bot.launch();

import express from "express";
const expressApp = express();
import axios from "axios";
import path from "path";
const port = process.env.PORT || 3000;
import { Telegraf } from "telegraf";
require("dotenv").config();

const bot = new Telegraf(process.env.TELEGRAM_TOKEN as string);

expressApp.use(express.json());

bot.command("start", (ctx) => {
  console.log(ctx.from);
  bot.telegram.sendMessage(
    ctx.chat.id,
    "Hello there! Welcome to the Code Capsules telegram bot.\nI respond to /ethereum. Please try it",
    {}
  );
});

bot.launch();

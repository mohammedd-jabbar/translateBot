import axios from "axios";
require("dotenv").config();
import OpenAI from "openai";
import type { TError } from "../types/type";
import * as franc from "franc-min";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API,
});

export const gpt = async (message: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-instruct",
      messages: [
        {
          role: "user",
          content: `Translate the following Arabic Islamic text to English: "${message}"
      `,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
      n: 1,
      stop: "None",
    });
    return response;
  } catch (error) {
    throw new Error((error as TError).message);
  }
};

export async function translate(text: string) {
  let res = await axios.post(
    `https://translation.googleapis.com/language/translate/v2?q=${text}&target=ckb&key=${
      process.env.GOOGLE_TRANSLATE as string
    }`
  );

  let translation = res.data.data.translations[0].translatedText;
  return translation;
}

export function isArabic(text: string): boolean {
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(text);
}

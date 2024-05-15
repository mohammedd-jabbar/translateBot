import axios from "axios";
require("dotenv").config();
import OpenAI from "openai";
import type { TError, TText } from "../types/type";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API,
});

export const gpt = async (message: TText) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Translate the following Arabic text to English: "${message}"
      `,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });
    return response.choices[0].message.content as string;
  } catch (error) {
    console.log("GPT Error:", (error as TError).message);
    throw new Error((error as TError).message);
  }
};

export async function translateText(text: TText | undefined) {
  try {
    let res = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?q=${text}&target=ckb&key=${process.env.GOOGLE_TRANSLATE}`
    );

    let translation = res.data.data.translations[0].translatedText;
    return translation;
  } catch (error) {
    console.log("Translate Text Error:", (error as TError).message);
    throw new Error((error as TError).message);
  }
}

export async function detectLanguage(text: TText) {
  try {
    let res = await axios.post(
      `https://translation.googleapis.com/language/translate/v2/detect?q=${text}&target=ckb&key=${process.env.GOOGLE_TRANSLATE}`
    );

    if (res.data.data.detections[0][0].language !== "ar") return false;

    return true;
  } catch (error) {
    console.log("Detect Language Error:", (error as TError).message);
    throw new Error((error as TError).message);
  }
}

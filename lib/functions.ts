import axios from "axios";
require("dotenv").config();
import OpenAI from "openai";
import type { TError, TText } from "../types/type";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API,
});

export const gpt = async (message: TText, language: TText) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Translate the following ${language} text to English: "${message}"
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

    let detectedLanguageCode = res.data.data.detections[0][0].language;

    // Convert detected language code to language name using the static mapping
    let detectedLanguageName =
      languageMap[detectedLanguageCode] || detectedLanguageCode;

    return detectedLanguageName;
  } catch (error) {
    console.log("Detect Language Error:", (error as TError).message);
    throw new Error((error as TError).message);
  }
}

const languageMap: any = {
  af: "Afrikaans",
  sq: "Albanian",
  am: "Amharic",
  ar: "Arabic",
  hy: "Armenian",
  az: "Azerbaijani",
  eu: "Basque",
  be: "Belarusian",
  bn: "Bengali",
  bs: "Bosnian",
  bg: "Bulgarian",
  ca: "Catalan",
  ceb: "Cebuano",
  ny: "Chichewa",
  "zh-CN": "Chinese (Simplified)",
  "zh-TW": "Chinese (Traditional)",
  co: "Corsican",
  hr: "Croatian",
  cs: "Czech",
  da: "Danish",
  nl: "Dutch",
  en: "English",
  eo: "Esperanto",
  et: "Estonian",
  tl: "Filipino",
  fi: "Finnish",
  fr: "French",
  fy: "Frisian",
  gl: "Galician",
  ka: "Georgian",
  de: "German",
  el: "Greek",
  gu: "Gujarati",
  ht: "Haitian Creole",
  ha: "Hausa",
  haw: "Hawaiian",
  he: "Hebrew",
  hi: "Hindi",
  hmn: "Hmong",
  hu: "Hungarian",
  is: "Icelandic",
  ig: "Igbo",
  id: "Indonesian",
  ga: "Irish",
  it: "Italian",
  ja: "Japanese",
  jw: "Javanese",
  kn: "Kannada",
  kk: "Kazakh",
  km: "Khmer",
  rw: "Kinyarwanda",
  ko: "Korean",
  ku: "Kurdish (Kurmanji)",
  ckb: "Kurdish (Sorani)",
  ky: "Kyrgyz",
  lo: "Lao",
  la: "Latin",
  lv: "Latvian",
  lt: "Lithuanian",
  lb: "Luxembourgish",
  mk: "Macedonian",
  mg: "Malagasy",
  ms: "Malay",
  ml: "Malayalam",
  mt: "Maltese",
  mi: "Maori",
  mr: "Marathi",
  mn: "Mongolian",
  my: "Myanmar (Burmese)",
  ne: "Nepali",
  no: "Norwegian",
  or: "Odia (Oriya)",
  ps: "Pashto",
  fa: "Persian",
  pl: "Polish",
  pt: "Portuguese",
  pa: "Punjabi",
  ro: "Romanian",
  ru: "Russian",
  sm: "Samoan",
  gd: "Scots Gaelic",
  sr: "Serbian",
  st: "Sesotho",
  sn: "Shona",
  sd: "Sindhi",
  si: "Sinhala",
  sk: "Slovak",
  sl: "Slovenian",
  so: "Somali",
  es: "Spanish",
  su: "Sundanese",
  sw: "Swahili",
  sv: "Swedish",
  tg: "Tajik",
  ta: "Tamil",
  tt: "Tatar",
  te: "Telugu",
  th: "Thai",
  tr: "Turkish",
  tk: "Turkmen",
  uk: "Ukrainian",
  ur: "Urdu",
  ug: "Uyghur",
  uz: "Uzbek",
  vi: "Vietnamese",
  cy: "Welsh",
  xh: "Xhosa",
  yi: "Yiddish",
  yo: "Yoruba",
  zu: "Zulu",
};

import axios from "axios";
require("dotenv").config();

// export const chat = async (req, res, openai) => {
//   try {
//     const message = "Which is the capital of Albania?";
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: message }],
//       temperature: 0,
//       max_tokens: 1000,
//     });
//     res.status(200).json(response);
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// };

export async function Translate(text: string) {
  let res = await axios.post(
    `https://translation.googleapis.com/language/translate/v2?q=${text}&target=ckb&key=${
      process.env.GOOGLE_TRANSLATE as string
    }`
  );

  let translation = res.data.data.translations[0].translatedText;
  return translation;
}

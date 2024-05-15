# translateArToKu: Telegram Translator Bot (Arabic to Kurdish)

## About

translateArToKu: This Telegram bot empowers users to seamlessly translate Arabic text into Kurdish. It leverages the combined strengths of ChatGPT API and Google Translate to deliver accurate and nuanced translations, surpassing the limitations of direct Arabic-to-Kurdish translation.


## Features


- Arabic-Only Input: Ensures the bot operates effectively by accepting messages solely in Arabic.
- GPT-3.5-Turbo Integration: Enhances translation quality by utilizing ChatGPT's advanced capabilities to translate Arabic text into fluent English.
- Google Translate Integration: Bridges the gap between English and Kurdish by employing Google Translate's expertise.
- Node.js Development: Employs the robust and versatile Node.js framework for efficient bot creation.


## Installation

To get started with translateArToKu, follow these steps:

#### Clone the repository:

    git clone https://github.com/mohammedd-jabbar/translateArToKu.git

#### Navigate to the project directory:

    cd translateArToKu

#### Install dependencies:

    npm install

### Configuration
- Create a Telegram Bot: Visit https://core.telegram.org/bots/tutorial and create a new bot using the BotFather interface. Note down the provided bot token, which will be used for authentication.
- Obtain ChatGPT API Credentials: Sign up for an OpenAI API account at https://openai.com/. Create a new API key and secret under the "API Keys" section in your OpenAI account settings.
- Google Translate: Visit google cloud for Google cloud translation API key


#### Set up your environment variables by creating a .env file with the following variables and replacing the placeholders with your actual values:

    TELEGRAM_TOKEN=
    OPENAI_API=
    GOOGLE_TRANSLATE=
    SPECIAL_USER=

#### Running the Bot:

    npm run dev

Now you're all set! translateArToKu is up and running on your local machine.

## License

This project is licensed under the GPL V3 License.

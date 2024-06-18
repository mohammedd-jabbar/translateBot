# translateToKu: Telegram Translator Bot (Any Language to Kurdish)

## About

translateToKu: This Telegram bot empowers users to seamlessly translate text from any language into Kurdish. It leverages the combined strengths of ChatGPT API and Google Translate to deliver accurate and nuanced translations, surpassing the limitations of direct translations.

## Features

- Any Language Input: Ensures the bot operates effectively by accepting messages in any language.
- GPT-3.5-Turbo Integration: Enhances translation quality by utilizing ChatGPT's advanced capabilities to translate text into fluent Kurdish.
- Google Translate Integration: Provides translation support for any language to Kurdish.
- Node.js Development: Employs the robust and versatile Node.js framework for efficient bot creation.

## Installation

To get started with translateToKu, follow these steps:

#### Clone the repository:

    git clone https://github.com/mohammedd-jabbar/translateToKu.git

#### Navigate to the project directory:

    cd translateToKu

#### Install dependencies:

    npm install

### Configuration

- Create a Telegram Bot: Visit https://core.telegram.org/bots/tutorial and create a new bot using the BotFather interface. Note down the provided bot token, which will be used for authentication.
- Obtain ChatGPT API Credentials: Sign up for an OpenAI API account at https://openai.com/. Create a new API key and secret under the "API Keys" section in your OpenAI account settings.
- Google Translate: Visit google cloud for Google cloud translation API key

#### Set up your environment variables by creating a .env file with the following variables and replacing the placeholders with your actual values:

    GOOGLE_TRANSLATE=
    OPENAI_API=
    SPECIAL_USER=
    SPECIAL_USER2=
    TELEGRAM_TOKEN=

#### Running the Bot:

    npm run dev

Now you're all set! translateToKu is up and running on your local machine.

## License

This project is licensed under the GPL V3 License.

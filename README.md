# RikoAI Discord Bot

RikoAI is an AI-powered chatbot for Discord designed to act and respond like a human. It provides helpful, engaging, and empathetic responses to users, making your Discord server a more interactive and welcoming place.

## Features

- **Human-like Conversations**: RikoAI has a wide range of human emotions and understanding.
- **Channel Management**: Add or remove channels where RikoAI is active.
- **Personality Settings**: Set the personality that RikoAI uses to respond to messages.
- **Message Cleanup**: Clear Riko's messages from your DMs.
- **Admin Controls**: Special commands for administrators.

## Prerequisites

- Node.js
- Discord Account
- OpenAI API Key (for GPT-3 integration)

## Configuration

Configuration for RikoAI is stored in a `config.json` file. Below are the details for each setting:

- `bot.role`: Describes the role or personality of the bot. This is more of a metadata field.
- `bot.ignore_prefix`: Any message with this prefix will be ignored by the bot.
- `bot.active_channels`: An array of channel IDs where the bot will be active.
- `bot.admins`: An array of Discord user IDs that have admin privileges for bot-specific commands.

- `discord.token`: Your Discord bot token for authentication.
- `discord.client_id`: The client ID for your Discord application.

- `gpt3.openai_key`: The API key for OpenAI's GPT-3 service. This is used for natural language processing capabilities.

```json
{
  "bot": {
    "role": "AI chatbot description",
    "ignore_prefix": "//",
    "active_channels": ["CHANNEL_ID"],
    "admins": ["DISCORD_ID"]
  },
  "discord": {
    "token": "YOUR_DISCORD_BOT_TOKEN",
    "client_id": "YOUR_CLIENT_ID"
  },
  "gpt3": {
    "openai_key": "YOUR_OPENAI_API_KEY"
  }
}
```

## Commands

Here are some of the commands that you can use with RikoAI:

- `/channel add <channel>`: Add a channel for RikoAI to respond to messages in.
- `/channel remove <channel>`: Remove a channel for RikoAI to respond to messages in.
- `/channel list`: List all channels that RikoAI is responding to messages in.
- `/clear dms <amount>`: Clear Riko's messages from your DMs.
- `/role set <personality>`: Set the personality that RikoAI uses to respond to messages.
- `/role reset`: Reset the personality that RikoAI uses to respond to messages.
- `/help`: Get a list of all commands.

## Installation

1. Run `git clone https://github.com/prinkee/discord-chatbot` to clone this repository.
2. Run `npm install` to install dependencies.
3. Configure the `config.json` with your settings.
4. Run `node .` to start the bot.

## Contributing

Feel free to fork this repository and submit pull requests. You can also open issues if you find any bugs or have suggestions for new features. However, I do not plan to actively maintain this project anymoreclear
.

## License

This project is open-source and available under the [MIT License](LICENSE).

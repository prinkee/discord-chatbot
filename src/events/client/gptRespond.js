const gptResponse = require("../../gpt");
const fs = require("fs");
const config = require("../../../config.json");
const { ChannelType } = require("discord.js");

module.exports = {
  name: 'messageCreate',
  async execute(message) {

    // if the message starts with ignore prefix or the message was sent by a bot, return
    if (message.content.startsWith(config.bot.ignore_prefix) || message.author.bot) {
      return;
    }

    if (message.channel.type !== ChannelType.DM && !(config.bot.active_channels.includes(message.channel.id))) {
      return;
    }

    const user = message.author;

    message.channel.sendTyping();

    // Channel data
    let channelData = {
      id: message.channel.id,
      history: [],
    }

    // User data
    let userData = {
      id: user.id,
      username: user.username,
      role: 'Default',
      totalUsage: 0,
    }

    // Check if channelData directory exists, if not create it
    if (!fs.existsSync('./channelData')) {
      fs.mkdirSync('./channelData');
    }

    // Check if channel data file exists
    const channelDataFile = `./channelData/${message.channel.id}.json`;
    if (fs.existsSync(channelDataFile)) {
      channelData = JSON.parse(fs.readFileSync(channelDataFile));
    } else {
      // Create channel data file
      fs.writeFileSync(channelDataFile, JSON.stringify(channelData));
    }

    // Check if userData directory exists, if not create it
    if (!fs.existsSync('./userData')) {
      fs.mkdirSync('./userData');
    }

    // Check if user data file exists
    const userDataFile = `./userData/${user.id}.json`;
    if (fs.existsSync(userDataFile)) {
      userData = JSON.parse(fs.readFileSync(userDataFile));
    } else {
      // Create user data file
      fs.writeFileSync(userDataFile, JSON.stringify(userData));
    }

    let history = channelData.history;
    const prompt = message.content;
    const username = message.author.username;

    history.push({ role: "user", content: `${username}: ${prompt}` });

    // Use custom role if set, otherwise default role
    let role = (userData.role === 'Default') ? config.bot.role : userData.role;

    // generate response
    gptResponse(prompt, history, role)
      .then((response) => {
        message.channel.send(response);
        history.push({ role: "assistant", content: response.content || response });
        channelData.history = history;

        // Save the channel data
        fs.writeFileSync(channelDataFile, JSON.stringify(channelData));
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

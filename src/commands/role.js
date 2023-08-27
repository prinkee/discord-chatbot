const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("role")
    .setDescription(`Change the AI's role.`)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("set")
        .setDescription("Set the AI's role.")
        .addStringOption((option) =>
          option
            .setName("role")
            .setDescription("The role to set the AI to.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("reset")
        .setDescription("Reset the AI's role to the default.")
    ),
  async execute(interaction) {
    // if the subcommand is set
    if (interaction.options.getSubcommand() === "set") {
      const userId = interaction.user.id;
      const userDataPath = `./userData/${userId}.json`;

      let userData;

      // check if the user data exists, if not, create it
      if (!fs.existsSync(userDataPath)) {
        userData = {
          id: userId,
          role: 'Default',
          history: [],
          totalUsage: 0,
        };
        fs.writeFileSync(userDataPath, JSON.stringify(userData));
      } else {
        userData = JSON.parse(fs.readFileSync(userDataPath));
      }

      // get the role from the interaction
      const role = interaction.options.getString("role");

      // set the user's role to the role from the interaction
      userData.role = role;

      // save the user's data to the file
      fs.writeFileSync(userDataPath, JSON.stringify(userData));

      // reply to the interaction
      await interaction.reply({
        content: `Set your role to \`${role}\`.`,
        ephemeral: true,
      });
    }

    // if the subcommand is reset
    if (interaction.options.getSubcommand() === "reset") {
      const userId = interaction.user.id;
      const userDataPath = `./userData/${userId}.json`;

      let userData;

      // check if the user data exists, if not, create it
      if (!fs.existsSync(userDataPath)) {
        userData = {
          id: userId,
          role: 'Default',
          history: [],
          totalUsage: 0,
        };
        fs.writeFileSync(userDataPath, JSON.stringify(userData));
      } else {
        userData = JSON.parse(fs.readFileSync(userDataPath));
      }

      // reset the user's role to the default
      userData.role = 'Default';

      // save the user's data to the file
      fs.writeFileSync(userDataPath, JSON.stringify(userData));

      // reply to the interaction
      await interaction.reply({
        content: `Reset your role to the default state.`,
        ephemeral: true,
      });
    }
  },
};
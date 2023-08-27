const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("../../config.json");
const fs = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("channel")
        .setDescription("Change RikoAI's channel settings.")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("add")
                .setDescription("Add a channel to RikoAI's list of active channels.")
                .addChannelOption((option) =>
                    option
                        .setName("channel")
                        .setDescription("The channel to add.")
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("remove")
                .setDescription("Remove a channel from RikoAI's list of active channels.")
                .addChannelOption((option) =>
                    option
                        .setName("channel")
                        .setDescription("The channel to remove.")
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("list")
                .setDescription("List all of RikoAI's active channels.")
        ),
    async execute(interaction) {

        // if the command was not executed in a guild, return
        if (!interaction.guild) {
            return await interaction.reply({ content: "This command can only be used in a server.", ephemeral: true });
        }

        // if subcommand is add
        if (interaction.options.getSubcommand() === "add") {
            
            // check if the user is an admin
            if (!config.bot.admins.includes(interaction.user.id) || !interaction.member.permissions.has("ADMINISTRATOR")) {
                return await interaction.reply({ content: "You cannot use this command.", ephemeral: true });
            }

            // get the channel from the interaction
            const channel = interaction.options.getChannel("channel");
            if (!channel) {
                return interaction.reply({ content: "That channel cannot be found. Make sure the bot has access to the channel.", ephemeral: true });
            }

            // add the channel
            const activeChannels = config.bot.active_channels;
            if (activeChannels.includes(channel.id)) {
                return interaction.reply({ content: "That channel is already active.", ephemeral: true });
            }

            activeChannels.push(channel.id);

            // save the config file
            config.bot.active_channels = activeChannels;
            fs.writeFileSync("./config.json", JSON.stringify(config));

            // reply to the interaction
            await interaction.reply({ content: `Added <#${channel.id}> to the list of active channels.`, ephemeral: true });

        }
        // if subcommand is remove
        else if (interaction.options.getSubcommand() === "remove") {

            if (!config.bot.admins.includes(interaction.user.id) || !interaction.member.permissions.has("ADMINISTRATOR")) {
                return await interaction.reply({ content: "You cannot use this command.", ephemeral: true });
            }

            // get the channel from the interaction
            const channel = interaction.options.getChannel("channel");

            if (!channel) {
                return interaction.reply({ content: "That channel cannot be found. Make sure the bot has access to the channel.", ephemeral: true });
            }

            if (!channel) {
                return interaction.reply({ content: "That channel cannot be found. Make sure the bot has access to the channel.", ephemeral: true });
            }

            // remove the channel
            const activeChannels = config.bot.active_channels;
            if (!activeChannels.includes(channel.id)) {
                return interaction.reply({ content: "That channel is not active.", ephemeral: true });
            }

            activeChannels.splice(activeChannels.indexOf(channel.id), 1);

            // save the config file
            config.bot.active_channels = activeChannels;
            fs.writeFileSync("./config.json", JSON.stringify(config));

            // reply to the interaction
            await interaction.reply({ content: `Removed <#${channel.id}> from the list of active channels.`, ephemeral: true });

        }
        // if subcommand is list
        else if (interaction.options.getSubcommand() === "list") {
            
            // get the active channels
            const activeChannels = config.bot.active_channels;

            // create the embed
            const embed = new EmbedBuilder()
                .setTitle("Active Channels")
                .setDescription(activeChannels.map((channel) => `<#${channel}>`).join("\n"))
                .setTimestamp();
            
            // reply to the interaction
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}
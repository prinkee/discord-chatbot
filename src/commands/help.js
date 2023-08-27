const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get a list of all commands'),
    async execute(interaction) {
        // create a commands embed
        const commandsEmbed = new EmbedBuilder()
            .setTitle("RikoAI Commands")
            .setColor(0x00FF00)
            .setDescription("Here is a list of all commands. You can also view the command documentation at https://docs.rikoai.com/commands.")
            .addFields({
                name: "/channel add <channel>",
                value: "Add a channel for RikoAI to respond to messages in.",
                inline: false
            }, {
                name: "/channel remove <channel>",
                value: "Remove a channel for RikoAI to respond to messages in.",
                inline: false
            }, {
                name: "/channel list",
                value: "List all channels that RikoAI is responding to messages in.",
                inline: false
            }, {
                name: "/clear dms <amount>",
                value: "Clear Riko's messages from your DMs.",
                inline: false
            }, {
                name: "/role set <personality>",
                value: "Set the personality that RikoAI uses to respond to messages.",
                inline: false
            }, {
                name: "/role reset",
                value: "Reset the personality that RikoAI uses to respond to messages.",
                inline: false
            }, {
                name: "/help",
                value: "Get a list of all commands.",
                inline: false
            })
            .setTimestamp()
            .setFooter({
                text: "RikoAI",
                iconURL: interaction.client.user.avatarURL()
            })

        // send the commands embed as an ephemeral message
        await interaction.reply({ embeds: [commandsEmbed], ephemeral: true });
    },
};
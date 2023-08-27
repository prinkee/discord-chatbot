const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Clear messages and history from RikoAI.")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("dms")
                .setDescription("Delete the messages that RikoAI has sent to you in DMs.")
                .addIntegerOption((option) =>
                    option
                        .setName("amount")
                        .setDescription("The amount of messages to delete.")
                        .setRequired(true)
                )
        ),
    async execute(interaction) {

        // if the command was dms
        if (interaction.options.getSubcommand() === "dms") {
            // if the command was not executed in a DM, return
            if (interaction.channel.type !== 1) {
                return await interaction.reply({ content: 'This command can only be used in DMs.', ephemeral: true });
            }

            const numMessagesToDelete = interaction.options.getInteger('amount');

            if (numMessagesToDelete > 100) {
                return await interaction.reply({ content: 'You can only delete up to 100 messages at a time.', ephemeral: true });
            }

            // Defer the reply
            await interaction.deferReply({ ephemeral: true });

            const channel = interaction.channel;
            let fetchedMessages = await channel.messages.fetch({ limit: 100 });

            const botMessages = fetchedMessages.filter(msg => msg.author.bot);

            // Ignore other user messages
            const targetMessages = botMessages.first(numMessagesToDelete);

            if (targetMessages.length === 0) {
                return interaction.editReply('No messages to delete.');
            }

            let deletedCount = 0;
            const deleteMessage = async (msg) => {
                try {
                    await msg.delete();
                    deletedCount++;
                    await interaction.editReply({ content: `Deleting messages... ${deletedCount}/${targetMessages.length}`, ephemeral: true });
                } catch (error) {
                    console.error('Error deleting message:', error);
                }
            };

            for (const [index, msg] of targetMessages.entries()) {
                setTimeout(() => deleteMessage(msg), index * 1000);
            }

            setTimeout(() => {
                if (deletedCount === 1) {
                    interaction.editReply(`Successfully deleted ${deletedCount} message.`);
                } else {
                    interaction.editReply(`Successfully deleted ${deletedCount} messages.`);
                }
            }, targetMessages.length * 1000);

        }

    }
}
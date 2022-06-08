const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class StatsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            memberName: 'clear',
            group: 'moderateur',
            description: 'Efface un nombre de messages dans le salon.',
            userPermissions: ['MANAGE_CHANNELS'],
            clientPermissions: ['MANAGE_CHANNELS'],
            guildOnly: true,
        });
    }
    async run(message, amount) {
        await message.delete().catch(e => { amount++; });

        await message.channel.bulkDelete(amount, true).then((_message) => {
            message.channel.send(`Bot cleared \`${_message.size}\` messages :wastebasket:`).then((sent) => {
                setTimeout(function() {
                    sent.delete();
                }, 2500);
            });
        });
    }
};
const { Command } = require('discord.js-commando');

module.exports = class ChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'channel',
            aliases: ['chan'],
            group: 'serveur',
            memberName: 'channel',
            description: 'Gets information about a channel.',
            examples: ['channel #test', 'channel test'],
            guildOnly: true,
            clientPermissions: ['MANAGE_CHANNELS'],
            userPermissions: ['MANAGE_CHANNELS'],

            args: [{
                key: 'channel',
                label: 'textchannel',
                prompt: 'Tu veut les informations de quel salon?',
                type: 'channel'
            }]
        });
    }

    async run(msg, args) {
        msg.delete();
        const channel = args.channel;
        return msg.reply(`${channel.name} (${channel.id})`);
    }
};
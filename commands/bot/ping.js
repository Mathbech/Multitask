const { Command } = require('discord.js-commando');

module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            memberName: 'ping',
            group: 'bot',
            aliases: ['connexion', 'pong'],
            description: 'Vérifier le ping du bot sur le serveur Discord.',
            examples: ['ping'],
            guildOnly: false,
        });
    }

    async run(msg) {
        msg.delete();
        msg.channel.send('pinging').then(m => {
            m.edit(`🏓Latency is ${m.createdTimestamp - msg.createdTimestamp}ms.`);
        });
    }

};
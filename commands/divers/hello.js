const { Command } = require('discord.js-commando');

module.exports = class HelloCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'bonjour',
            memberName: 'hello',
            group: 'divers',
            aliases: ['bonjour', 'hi'],
            description: 'Répond avec un bonjour.',
            guildOnly: true,
            ownerOnly: false, // Uniquement le propriétaire du bot pourra lancer cette commande
            throttling: {
                usages: 2,
                duration: 10,
            },
        });
    }


    async run(msg) {
        msg.delete();
        msg.say(`Bonjour ${msg.guild}, comment allez-vous? `);
    }
};
const { Command } = require('discord.js-commando');

module.exports = class HelloCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'support',
            memberName: 'support',
            group: 'bot',
            description: 'Vous donne le lien du serveur support.',
            guildOnly: true,
            ownerOnly: false, // Uniquement le propriétaire du bot pourra lancer cette commande
        });
    }
    async run(msg) {
        msg.delete();
        msg.say(`Viens sur le serveur support pour être aider si tu rencontre un problème: https://discord.gg/fJHSEaBbTY`);
    }
};
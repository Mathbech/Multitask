const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            memberName: 'say',
            group: 'divers',
            description: 'Renvoie votre message.',
            clientPermissions: ['SEND_MESSAGES'], // le bot doit avoir la permission d'envoyer des messages
            userPermissions: ['ADMINISTRATOR'], //L'utilisateur doit être administrateur pour utiliser cette fonction
            throttling: {
                usages: 2,
                duration: 10,
            },
            args: [{
                key: 'text',
                prompt: 'Quel texte voulez-vous que le bot répondre ?',
                type: 'string',
            }, ],
        });
    }

    async run(msg, { text }) {
        msg.delete();
        msg.say(`${text}`);
    }

};
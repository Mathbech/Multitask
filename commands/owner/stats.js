const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class StatsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stats',
            memberName: 'stats',
            group: 'owner',
            description: 'Affiche le nombre de serveurs Discord où est présent le bot.',
            ownerOnly: true,
        });
    }

    async run(msg) {
        msg.delete();
        const embed = new Discord.MessageEmbed()
            .setDescription(`Je suis présent sur **${this.client.guilds.cache.size} serveur(s)** :heart:`)
            .setColor('BLUE');

        return msg.say(embed);
    }
};
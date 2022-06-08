const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class ChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'infoserveur',
            group: 'serveur',
            memberName: 'serveur',
            description: 'Donne les informations du serveur.',
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
        });
    }

    async run(message) {
        message.delete();
        const embed = new Discord.MessageEmbed(); // création de l'embed
        embed
            .setColor("GREEN")
            .setTitle("Info du serveur")
            .setImage(message.guild.iconURL)
            .setDescription(`Voici les  information de ${message.guild}`)
            .addField("Description", `La description du serveur est: ${message.guild.description}`)
            .addField("Propriétaire", `Le propriétaire du serveur est: ${message.guild.owner}`)
            .addField("Total de membres", `Le serveur à ${message.guild.memberCount} membres`)
            .addField("Total d'émote", `Le serveur à ${message.guild.emojis.cache.size} emojis`)
            .addField("Total de rôles", `Le serveur à ${message.guild.roles.cache.size} rôles`)
        message.say(embed)
    }
};
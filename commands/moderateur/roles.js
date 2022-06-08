const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class StatsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'roles',
            memberName: 'roles',
            group: 'moderateur',
            description: 'Liste les roles du serveur et le nombre de membres de chaque role.',
            userPermissions: ['MANAGE_ROLES'],
        });
    }

    async run(msg) {
        msg.delete();
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${this.client.user.tag}`, `${this.client.user.displayAvatarURL()}`)
            .setColor('BLUE')
            .setTimestamp();

        const guildMembers = msg.guild.members.cache

        msg.guild.roles.cache.map(role => {
            const countMembersOfRole = guildMembers.filter(member => member.roles.cache.has(role.id)).size

            embed.addField(
                role.name.replace("@everyone", "ALL"),
                countMembersOfRole,
                true
            )
        })

        return msg.say(embed)
    }
};
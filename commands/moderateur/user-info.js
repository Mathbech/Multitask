const stripIndents = require('common-tags').stripIndents;
const { Command } = require('discord.js-commando');

module.exports = class UserInfoCommand extends Command {
        constructor(client) {
            super(client, {
                name: 'user-info',
                aliases: ['user', '🗒'],
                group: 'moderateur',
                memberName: 'user-info',
                description: 'Obtenir des informations sur un utilisateur.',
                examples: ['user-info @Crawl#3208', 'user-info Crawl'],
                guildOnly: true,
                userPermissions: ['MANAGE_ROLES'],
                clientPermissions: ['MANAGE_ROLES'],

                args: [{
                    key: 'member',
                    label: 'user',
                    prompt: 'De quel utilisateur voulez-vous des informations?',
                    type: 'member'
                }]
            });
        }

        async run(msg, args) {
                msg.delete();
                const member = args.member;
                const user = member.user;
                return msg.reply(stripIndents `
			Info on **${user.username}#${user.discriminator}** (ID: ${user.id})
			**❯ Member Details**
			${member.nickname !== null ? ` • Nickname: ${member.nickname}` : ' • No nickname'}
			 • Joined at: ${member.joinedAt}**❯ User Details**
			 • Created at: ${user.createdAt}${user.bot ? '\n • Is a bot account' : ''}
			 • Status: ${user.presence.status}
			 • Game: ${user.presence.game ? user.presence.game.name : 'None'}
		`);
	}
};
// • Roles: ${member.roles(roles => `\`${roles.name}\``).join(', ')}
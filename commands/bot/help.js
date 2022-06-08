const { stripIndents, oneLine } = require('common-tags');
const { disambiguation } = require('discord.js-commando/src/util');
const { Command } = require('discord.js-commando');
const Discord = require('discord.js')

module.exports = class HelpCommand extends Command {
        constructor(client) {
            super(client, {
                name: 'help',
                group: 'bot',
                memberName: 'help',
                aliases: ['h'],
                description: 'Affiche la liste des commandes disponibles.',
                clientPermissions: ['SEND_MESSAGES'],
                guildOnly: true,
                args: [{
                    key: 'command',
                    prompt: 'Pour quelle commande voulez-vous de l\'aide ?',
                    type: 'string',
                    default: ''
                }]
            });
        }

        async run(msg, args) { // eslint-disable-line complexity
                msg.delete();
                const groups = this.client.registry.groups;
                const commands = this.client.registry.findCommands(args.command, false, msg);
                const showAll = args.command && args.command.toLowerCase() === 'all';

                const embed = new Discord.MessageEmbed()
                    .setColor('GREEN');

                if (args.command && !showAll) {
                    if (commands.length === 1) {
                        let help = stripIndents `
					${oneLine`
						${commands[0].description}
						${commands[0].guildOnly ? ' (uniquement sur les serveurs' : ''}
						${commands[0].nsfw ? ' (NSFW)' : ''}
					`}

					**Format:** ${msg.anyUsage(`${commands[0].name}${commands[0].format ? ` ${commands[0].format}` : ''}`)}
				`;

                if(commands[0].aliases.length > 0) help += `\n**Aliases:** ${commands[0].aliases.join(', ')}`;

                help += `\n${oneLine`
					**Groupe:** ${commands[0].group.name}
					(\`${commands[0].groupID}:${commands[0].memberName}\`)
				`}`;

                if(commands[0].details) help += `\n**Detail:** ${commands[0].details}`;
                if(commands[0].examples) help += `\n**Exemple:**\n${commands[0].examples.join('\n')}`;

                embed
                    .setAuthor(commands[0].name.toUpperCase())
                    .setDescription(help.replace(/ or /g, ' ou '))
            } else if(commands.length > 15) {
                embed.setDescription('Plusieurs commandes peuvent correspondrent, merci d\'être plus précis.')
            } else if(commands.length > 1) {
                embed.setDescription(disambiguation(commands, 'commands').replace(/ or /g, ' ou '))
            } else {
                embed.setDescription(`Cette commande n'existe pas. Utilisez ${msg.usage(
                    null, msg.channel.type === 'dm' ? null : undefined, msg.channel.type === 'dm' ? null : undefined
                )} pour voir la liste de toutes les commandes`.replace(/ or /g, ' ou '))
            }
        } else {
            embed
                .setDescription(
                    stripIndents`
					${oneLine`
						Pour lancer une commande, utilisez ${Command.usage('command', msg.guild ? msg.guild.commandPrefix : null, this.client.user)}.
						Par exemple, ${Command.usage('help', msg.guild ? msg.guild.commandPrefix : null, this.client.user)}.
					`}

					Utilisez ${this.usage('<commande>', null, null)} pour voir les informations détaillées de la commande spécifiée.

					__**Commandes disponibles :**__

					${groups.filter(grp => grp.commands.some(cmd => !cmd.hidden && cmd.isUsable(msg)))
                        .map(grp => stripIndents`
							・ **${grp.name}**
							${grp.commands.filter(cmd => !cmd.hidden && cmd.isUsable(msg))
                            .map(cmd => `\`${cmd.name}\`: ${cmd.description}${cmd.nsfw ? ' (NSFW)' : ''}`).join('\n')
                        }
						`).join('\n\n')
                    }`.replace(/ or /g, ' ou '))
            ;
        }

        return msg.say(embed)
    }
};
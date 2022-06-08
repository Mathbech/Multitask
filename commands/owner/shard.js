const Discord = require('discord.js');
const Commando = require("discord.js-commando");

module.exports = class shardCommands extends(Commando.Command) {
    constructor(client) {
        super(client, {
            name: "shard",
            aliases: ["sharding"],
            group: "owner",
            memberName: "shard",
            description: "Affiche le total des shards et ceux actifs",
            ownerOnly: true,
        });
    }
}
async(client, message) => {
    message.delete();
    const promises = [
        client.shard.fetchClientValues('guilds.cache.size'),
        client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
    ];
    return Promise.all(promises)
        .then(results => {
            const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
            const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
            return interaction.reply(`Server count: ${totalGuilds}\nMember count: ${totalMembers}`);
        })
        .catch(console.error);
}
const Commando = require("discord.js-commando");

module.exports = class banCommands extends(Commando.Command) {
    constructor(client) {
        super(client, {
            name: "ban",
            aliases: ["bans"],
            group: "moderateur",
            memberName: "ban",
            description: "Banni un membre du serveur",
            examples: ['+ban @Bébech#1480', '+ban Bébech'],
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS']
        });
    }
    async run(message) {
        message.delete();
        const target = message.mentions.users.first();
        if (!target) {
            message.reply("Tu dois mentionner un utilisateur");
            return;
        }
        const { guild } = message;
        const member = guild.members.cache.get(target.id);
        if (member.bannable) {
            guild.members.ban(member);
            message.reply("L'utilisateur à été banni");
        } else {
            message.reply("Tu ne peut pas effectuer ceci");
            console.log(target);
        }
    }
};
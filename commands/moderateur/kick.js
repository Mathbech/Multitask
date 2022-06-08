const Commando = require("discord.js-commando");

module.exports = class banCommands extends(Commando.Command) {
    constructor(client) {
        super(client, {
            name: "kick",
            aliases: ["kicks"],
            group: "moderateur",
            memberName: "kick",
            description: "expulse un membre du serveur",
            examples: ['+kick @Bébech#1480', '+kick Bébech'],
            clientPermissions: ['KICK_MEMBERS'],
            userPermissions: ['KICK_MEMBERS']
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
        if (member.kick) {
            member.kick(member);
            message.reply("L'utilisateur à été expulsé");
        } else {
            message.reply("Tu ne peut pas effectuer ceci");
            console.log(target);
        }

    }
}
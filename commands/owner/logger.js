const { Command } = require('discord.js-commando');

module.exports = class TestLoggerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'logger',
            memberName: 'logger',
            group: 'owner',
            description: 'Test du logger.',
            ownerOnly: true,
        });
    }

    async run(msg) {
        msg.delete();
        this.client.logger.log('info', 'Un nouveau membre est là');
        this.client.logger.log('warn', 'Attention !!');
        this.client.logger.log('error', 'Une erreur est survenue :(');
    }
};
const Discord = require('discord.js'); // Chargement de la librairie discord.js
const { CommandoClient } = require('discord.js-commando')

module.exports = class BotClient extends CommandoClient {
    constructor(options) {
        super(options);
    }
};
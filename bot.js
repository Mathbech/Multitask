const CommandoClient = require('./client');
const fs = require('fs')
const path = require('path') // on ajoute la librairie path
const config = require("./config.json");

const client = new CommandoClient({
    commandPrefix: config.prefix, // Préfixe des commandes (ex: ?help)
    owner: [config.ID1, config.ID2], // ID de l'owner du bot, peut également etre un tableau d'id pour plusieurs owners, ex: ['ID1', 'ID2']
    disableMentions: 'everyone', // Désactive, par sécurité, l'utilisation du everyone par le bot
    presence: {
        activity: {
            name: config.version, // message de présence
            type: 'WATCHING' // type d'activité
        }
    }
});


client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['bot', 'Bot'], // On ajoute le nouveau groupe 'BOT'
        ['fun', 'Fun'], //groupe pour les commandes FUN
        ['serveur', 'Serveur'], //groupe pour les commandes de serveur
        ['divers', 'Divers'],
        ['admin', 'Admin'], // On ajoute le nouveau groupe 'admin'
        ['moderateur', 'Modérateur'], // On ajoute le nouveau groupe 'modérateur'
        ['owner', 'Owner'], //groupe pour les codeurs du bot
    ])
    .registerCommandsIn(path.join(__dirname, 'commands')) // on indique où seront les fichiers des commandes du bot
;

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        const eventFunction = require(`./events/${file}`);
        if (eventFunction.disabled) return;

        const event = eventFunction.event || file.split('.')[0];
        const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client;
        const { once } = eventFunction;

        try {
            emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(client, ...args));
        } catch (error) {
            console.error(error.stack);
        }
    });
});

client.login(config.TOKEN);
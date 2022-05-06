const CommandoClient = require('./client').default;
const path = require('path') // on ajoute la librairie path

const client = new CommandoClient({
    commandPrefix: '?',
    owner: '613131993487507457',
    disableMentions: 'everyone'
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['divers', 'Divers'],
    ])
    .registerCommandsIn(path.join(__dirname, 'commands')) // on indique où seront les fichiers des commandes du bot
;

client.once('ready', () => {
    console.log(`Je suis prêt !`);
});

client.on('error', console.error);

client.login('VOTRE-TOKEN');
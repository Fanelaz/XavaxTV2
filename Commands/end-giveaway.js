const ms = require('ms');

module.exports = {
    name: "gend",
    description: "Starts a giveaway",
    aliases: ['gend'],
	category: 'Staff',
	usage: '',

    async execute(message, args, client){


    if(!message.member.hasPermission('ADMINISTRATOR') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: Vous devez avoir les permissions de gérer les messages pour relancer les cadeaux.');
    }

    if(!args[0]){
        return message.channel.send(':x: Vous devez spécifier un identifiant de message valide!!');
    }

    let giveaway = 
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if(!giveaway){
        return message.channel.send('Impossible de trouver un message pour `'+ args.join(' ') +'`.');
    }

    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    .then(() => {
        message.channel.send('La remise des prix se terminera dans moins de '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' secondes...');
    })
    .catch((e) => {
        if(e.startsWith(`Ce giveaway est deja finit !`)){
            message.channel.send('Ce giveaway est deja finit !');
        } else {
            console.error(e);
            message.channel.send('An error occured...');
        }
    });

}}
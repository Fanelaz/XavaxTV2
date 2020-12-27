const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const ms = require("ms");

module.exports = {
    name: 'reroll',
    description: '',
    usage: '',
    category: 'Staff',
    guildOnly: true,
    async execute(message, args, client){

        if(!message.member.hasPermission('ADMINISTRATOR') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
            return message.channel.send(':x: Vous devez avoir les permissions de gérer les messages pour relancer les cadeaux.');
        }
    
        // If no message ID or giveaway name is specified
        if(!args[0]){
            return message.channel.send(':x: Vous devez spécifier un identifiant de message valide!!');
        }
    
        // try to found the giveaway with prize then with ID
        let giveaway = 
        // Search with giveaway prize
        client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
        // Search with giveaway ID
        client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);
    
        // If no giveaway was found
        if(!giveaway){
            return message.channel.send('Impossible de trouver un message pour `'+ args.join(' ') +'`.');
        }
    
        // Reroll the giveaway
        client.giveawaysManager.reroll(giveaway.messageID)
        .then(() => {
            // Success message
            message.channel.send('Giveaway rerolled!');
        })
        .catch((e) => {
            if(e.startsWith(`Ce giveaway n'est pas finit ${giveaway.messageID}`)){
                message.channel.send('Ce giveaway n\'est pas finit ');
            } else {
                console.error(e);
                message.channel.send('An error occured...');
            }
        });
    
    
}}

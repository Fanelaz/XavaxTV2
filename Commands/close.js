const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const ms = require("ms");
const fs = require('fs')


client.db = require('../db.json')

module.exports = {
    name: 'close',
    description: '',
    usage: 'close',
    category: 'Staff',
    guildOnly: true,
    async execute(message, args){

        
if(message.author.id === "329323032143462420") {


        const channel = message.mentions.channels.first() || message.channel
        if (!client.db.tickets[channel.id]) return message.channel.send('Ce salon n\'est pas un ticket.')
        delete client.db.tickets[channel.id]
        fs.writeFileSync('../db.json', JSON.stringify(client.db))
        await message.channel.send(`La commande a été fermé !`)
        channel.delete()

} else {

        if(message.member.roles.cache.has('792443752957870151')) {

                    const channel = message.mentions.channels.first() || message.channel
        if (!client.db.tickets[channel.id]) return message.channel.send('Ce salon n\'est pas un ticket.')


            const embed = new Discord.MessageEmbed()
            .setDescription(`**__${message.channel.name}__** ce ticket est a fermé !`)
            .setColor('#2BFAFA')

            return message.guild.owner.send(embed)
        }   else {
            message.channel.send("tu n'as pas les permissions de faire cela")
        }

    }

    
}}

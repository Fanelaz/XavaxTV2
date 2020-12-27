const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const ms = require("ms");

module.exports = {
    name: 'unban',
    description: 'Permet de débannir un membre',
    usage: 'unban <ID membre>',
    category: 'Staff',
    guildOnly: true,
    async execute(message, args){

        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('Vous n\'avez pas la permission d\'utiliser cette commande.')

        const member = args[0];

        if (!member) {
             return message.channel.send(`Veuillez entrer un identifiant !`)
        }

        try {
            message.guild.fetchBans().then(bans => {
                message.guild.members.unban(member)
            })
            await message.channel.send(`${member} n'est plus ban !`)
        } catch (e) {
            return message.channel.send(`Une erreur s'est produite !`)
        }
        


}}

const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const ms = require("ms");
const moment = require('moment');
const { message } = require('noblox.js');
require('moment-duration-format');

module.exports = {
    name: 'sinfo',
    description: 'Montre les différentes informations conçernant le serveur discord',
    usage: 'sinfo',
    category: 'Utils',
    guildOnly: true,
    async execute(message, args){


 
const msg = message

    
        const servercreated = moment(msg.guild.createdAt).format('MMMM Do YYYY, h:mm:ss a');
    
        const emojis = [];
        if (msg.guild.emojis.size !== 0) {
          msg.guild.emojis.cache.forEach((r) => {
            const emoji = msg.client.emojis.resolve(r.id);
            emojis.push(emoji);
          });
        }
    
        const emojisembed = [];
        if (emojis.length === 0) {
          emojisembed.push(lang.serverinfo_emojisnone);
        }
        else if (emojis.join(' ').length > 1020) {
          for (let i = 0; i < emojis.length; i += 1) {
            if (emojisembed.join(' ').length < 980) {
              emojisembed.push(emojis[i]);
            }
          }
          emojisembed.push('...');
        }
        else {
          emojisembed.push(emojis.join(' '));
        }
    
        const embed = new Discord.MessageEmbed()

        .setAuthor(`Server info`, message.guild.iconURL())
        .setColor('#2BFAFA')
        .setThumbnail(message.guild.iconURL({dynamic: true}))
        .setDescription(`__**Propriétaire** __: ${message.guild.owner}\n
        __**Nom**__: ${message.guild.name}\n
        __**Région**__: ${message.guild.region}\n
        __**Membres**__: ${message.guild.memberCount}\n
        __**Rôles**__ : ${message.guild.roles.cache.size}\n
        __**Salons**__: ${message.guild.channels.cache.size}\n
        __**Emojis**__: ${message.guild.emojis.cache.size}`)
        message.channel.send(embed);
}}

const Discord = require('discord.js')
const colors = require('../colors.json')
const client = require('../index.js')
const db = require('quick.db')
const ms = require("ms");
const moment = require('moment');

module.exports = {
    name: 'userinfo',
    description: 'affiche les informations concernant un membre',
    usage: 'userinfo <membre>',
    category: 'Utils',
    guildOnly: true,
    async execute(message, args){

        const msg = message
    
    
        let user = msg.mentions.users.first() || msg.author
    
        if (!user && args.slice().length === 0) {
          user = msg.author;
        }
        else if (user) {
          if (user.bot) return msg.reply("Tu ne peux pas recevoir des informations sur des bots !");
        }
        else {
          try {
            const fetchedMember = await msg.guild.members.fetch(args.slice().join(' '));
            if (!fetchedMember) new Error('User not found!');
            user = fetchedMember;
            user = user.user;
    
            if (user.bot) return msg.reply("Tu ne peux pas recevoir des informations sur des bots !");
          }
          catch (error) {
            return msg.reply("Cet ID utilisateur ne correspond à aucun utilisateur sur ce serveur Discord");
          }
        }
    
        const member = msg.guild.member(user) || await msg.guild.members.fetch(user);
        const userondiscord = moment(user.createdTimestamp).format('MMMM Do YYYY, h:mm:ss a');
        const useronserver = moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss a');
    
    
        let description = '';
    
        try {
          description = msg.client.provider.getUser(user.id, 'description').length === 0 ? "Aucune description mise !" : msg.client.provider.getUser(user.id, 'description');
        }
        catch (error) {
          description = "Aucune description mise !";
        }
        
    
    
        const embed = new Discord.MessageEmbed()
          .setTitle(`${user.tag} (${user.id})`, user.displayAvatarURL())
          .setColor('#0066CC')
          .setThumbnail(user.displayAvatarURL({dynamic: true}))
          .setDescription(description)
          .addField(`📥 Compte Discord créé`, userondiscord, true)
          .addField(`📌 A connecté ce serveur Discord`, useronserver, true)
          .addField(`🏷 Rôles`, member.roles.cache.map(r => `${r}`).join(' | ') || "Cet utilisateur n'a pas de rôles sur ce serveur Discord", true)
          .addField(`⌚ Statut`, user.presence.status)
          .addField(`🎮 Joue`, user.presence.activity ? user.presence.activity.name : "Rien", true);
    
        if (message.author.id === "615491122227052544") { // A changer 
          embed.setAuthor('👥 Staff:');
        }
    
        msg.channel.send({
          embed
        });
}}

// Modules //



const Discord = require('discord.js')
const ms = require('ms')
const fs = require('fs')
const chalk = require('chalk')
const db = require('quick.db')
const nbx = require('noblox.js')

// Miscellaneous //
const client = new Discord.Client()


const welcome = require("./welcome");
welcome(client)

const {
    token,
    PREFIX,
    ANTI_INSULTE
} = require('./config.json')

const colors = require('./colors.json')
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

client.commands = new Discord.Collection()


// Bot Code //

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


const activities = [
    "🌀 BOT 1.0 ⓒ XavaxTV",
    `📷 » https://discord.gg/763uuRPa`
];
client.setInterval(() => {
    const index = Math.floor(Math.random() * activities.length);
    client.user.setActivity(activities[index], {
        type: "WATCHING"

    });
}, 7000);


const { GiveawaysManager } = require('discord-giveaways');

client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: [],
        embedColor: "#2f3136",
        reaction: "🎉"
    }
});


client.on('messageDelete', async message => {
    db.set(`msg_${message.channel.id}`, message.content)
    db.set(`author_${message.channel.id}`, message.author.id)
})

client.on('message', async message => {

    const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
    const prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : PREFIX;


    if (!message.content.startsWith(prefix)) return;


    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();



    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    try {
        command.execute(message, args, client);
        console.log(chalk.greenBright('[COMMAND]'), `${message.author.tag} a utilisé la commande: ` + commandName)
    } catch (error) {
        console.log(error);
        message.reply('il y a eu une err avec cette commande! ```\n' + error + "\n```");
    }
});



client.on('message', message => {
    if(ANTI_INSULTE.some(word => message.content.toLowerCase().includes(word))){
  
           const antiinsulte = new Discord.MessageEmbed()
          .setTitle(":no_entry: Filtre anti-insulte détecté")
          .setDescription("**"+message.author.username+"** merci de ne pas mettre d'insulte dans tes messages.")
          .setTimestamp()
          .setColor("#2f3136")
          .setFooter(message.author.username)
          message.channel.send(antiinsulte).then(message => message.delete({ timeout: 5000 }));
          message.delete()
  
    }})


    client.on('message', message => {
        if (message.content === `!join`)
        client.emit(`guildMemberAdd`, message.member);
                                                               // A supprimer apres
      if (message.content === `!leave`)
        client.emit(`guildMemberRemove`, message.member);
      
      })



    client.on('message', async message => {
        if (message.content.startsWith('!rules')) {
            const msg = await message.channel.send('test de reaction') // A changer avec le réglement et apress tous supp 
            msg.react('<:valide:792806310701039627> ')


        }
    })


      client.on("messageReactionAdd", async (reaction, user) => {

        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        
        if (user.bot) return;
        if (!reaction.message.guild) return;
        
        if (reaction.message.guild.id !== "792420344090329108") return; // A changer
        
        
        if (reaction.message.channel.id === "792805558763520010") {
          
          if (reaction.emoji.id === "792806310701039627") { // A changer
            await reaction.message.guild.members.cache.get(user.id).roles.add("792806686217338880") // A changer
            await reaction.message.guild.members.cache.get(user.id).roles.remove("792806669209698304") // A changer
          }
          
        } else {
          return;
        }
      })

      client.on("messageReactionRemove", async (reaction, user) => {
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        
        if (user.bot) return;
        if (!reaction.message.guild) return;
        if (reaction.message.guild.id !== "790019288190812171") return; // A changer
        
        if (reaction.message.channel.id === "790019288190812175") {  // A changer
          if (reaction.emoji.id === "790280900873027585") {
            await reaction.message.guild.members.cache.get(user.id).roles.remove("790533758636916766")  // A changer

          }

        } else {
          return;
        }
      })


        
    client.on('guildCreate', guild => {

        if(!guild.id === '790019288190812171') return guild.leave // A changer
    })


    client.on('message', message => {

      if (message.author.id === '329323032143462420') {
  
      var messagepourticket = new Discord.MessageEmbed()
      .setTitle('Support / Help')
      .setDescription(`<a:fl:792483183986737192> ︙Questions ?\n<a:fl:792483183986737192> ︙Partenariats ?\n<a:fl:792483183986737192> ︙Plaintes ?\n<a:fl:792483183986737192> ︙Suggestions ?\n \n⭐️︙Ouvre un ticket !`)
  
      if(message.content === "!ticket"){
          message.channel.send(messagepourticket).then(message => message.react('📩')
          )
      } else {
        return 
      }
  }})


  client.db = require('./db.json')

  client.on('messageReactionAdd', async (reaction, user, message) => {
    if(reaction.emoji.name === "📩"){
    if (user.id === client.user.id) return;
    reaction.users.remove(user)
    if (Object.values(client.db.tickets).some(ticket => ticket.author === user.id)) return reaction.message.channel.send('Vous avez déjà un ticket d\'ouvert.').then(msg => {
                    msg.delete({ timeout: 3000 })
                  })
            const channel = await reaction.message.guild.channels.create(`ticket ${user.username}`, {
                type: 'text',
                parent: '792486549623013406',
                permissionOverwrites: [{
                    id: reaction.message.guild.id,
                    deny: 'VIEW_CHANNEL'
                }, {
                    id: user.id,
                    allow: 'VIEW_CHANNEL'
                }, {
                    id: "792443752957870151",
                    allow: 'VIEW_CHANNEL'
                }]
            })
            client.db.tickets[channel.id] = {
                author: user.id
            }
            fs.writeFileSync('./db.json', JSON.stringify(client.db))
            channel.send(`${user}`)
            channel.send(new Discord.MessageEmbed()
                .setDescription(`Bonjour / Bonsoir, ${user.username} un Staff va
                vous prendre en charge.\n
                
                **Ticket [ Aide/Question/Partner ]**`))
            reaction.message.channel.send(`Votre ticket ${channel} a été créé !`).then(msg => {
              msg.delete({ timeout: 3000 })
            })
        }


        if(reaction.emoji.id=== "792473065850273812"){

          const owner = reaction.guild.member.owner
          owner.send('slt')

        }
    },
);client.login(token).catch(error => {
    console.log(chalk.red('[ERROR] ') + error)
})



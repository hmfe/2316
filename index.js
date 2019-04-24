const { prefix, token } = require('./config.json');
const { Client, RichEmbed } = require('discord.js');
const client = new Client();

client.once('ready', () => {
  this.botStartedDate = new Date(client.readyAt).toLocaleDateString();
  this.botStartedTime = new Date(client.readyAt).toLocaleTimeString();
  console.log('Bot is running!');
});

client.on('message', message => {
  if(!message.content.startsWith(prefix) || message.author.bot) {
      return;
  }

  // FEATURE: CHECK WHEN THE BOT STARTED
  if(message.content.startsWith(`${prefix}botupsince`)){
    message.channel.send(`Bot up since ${this.botStartedDate} at ${this.botStartedTime}`)
  }

  // FEATURE : CHECKS A MENTIONS LAST MESSAGE (DATE BEGINNING FROM WHEN BOT WAS FIRST STARTED)
  if(message.content.startsWith(`${prefix}lastmessage`) && message.mentions.users.first()) {
    const mention = message.mentions.users.first();
    if(mention.lastMessage){
      const lastMessageDate = new Date(mention.lastMessage.createdTimestamp).toLocaleDateString();
      const lastMessageTime = new Date(mention.lastMessage.createdTimestamp).toLocaleTimeString();
      const embed = new RichEmbed
        .setTitle(`${mention.username}'s last message`)
        .setDescription(`${lastMessageDate} at ${lastMessageTime}`);
      message.channel.send(embed);
    } else {
      const embed = new RichEmbed
      .setTitle(`${mention.username} has never posted`)
      .setDescription(`:O`);
      message.channel.send(embed);
    }
  }
});

// FEATURE: GREET NEW MEMBERS WHEN THEY JOIN
// client.on('guildMemberAdd', member => {
//   // Send the message to a designated channel on a server:
//   const channel = member.guild.channels.find(ch => ch.name === 'intro');
//   // Do nothing if the channel wasn't found on this server
//   if (!channel) return;
//   // Send the message, mentioning the member
//   channel.send(`Welcome to the server, ${member}`);
// });

client.login(token);
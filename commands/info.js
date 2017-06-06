const config = require("../config.json")
const Discord = require("discord.js")
module.exports.run = (bot, message, args) => {
  const embed = new Discord.RichEmbed()
  .setTitle("Bot Information")
  .setDescription(`Hey. I am ${bot.user.username}.\nI am an awesome bot created by a bunch of friends.\nI am online available.`)
  .setColor("RANDOM")
  message.channel.send({embed: embed})
}

module.exports.help = {
  name: "info",
  description: "Shows the bot info",
  usage: config.prefix + "info"
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
}

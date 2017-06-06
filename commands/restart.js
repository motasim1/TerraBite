const config = require("../config.json")
module.exports.run = (bot, message, args) => {
  bot.channels.get(config.logchannel).send("```Info:\n" + message.author.tag + " has runned " + config.prefix + "restart in " + message.guild.name + "```")
  message.channel.send("Restarting...")
  bot.setInterval(() => {
    process.exit()
  }, 1000)
}

module.exports.help = {
  name: "restart",
  description: "Restarts the bot. Dev only command",
  usage: config.prefix + "restart"
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 10
}

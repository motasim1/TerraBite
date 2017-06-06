const config = require("../config.json")
module.exports.run = (bot, message, args) => {
  let perms = bot.elevation(message)
  message.reply("Your permission level is: " + perms)
}

module.exports.help = {
  name: "permlvl",
  description: "Shows your permission level.",
  usage: config.prefix + "ping"
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["perm"],
  permLevel: 0
}

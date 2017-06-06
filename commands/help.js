const Discord = require("discord.js")
const config = require("../config.json")
module.exports.run = (bot, message, args) => {
const commandNames = Array.from(bot.commands.keys());
const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
message.channel.send(`= Command List =\n\n${bot.commands.map(c => `${config.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`, {code:'asciidoc'});}

module.exports.help = {
  name: "help",
  description: "Shows the help message",
  usage: config.prefix + "info"
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
}

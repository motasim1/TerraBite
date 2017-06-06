const Discord = require("discord.js")
const bot = new Discord.Client()
const config = require("./config.json")
const fs = require("fs")

var no_perms = "```Sorry, but you do not have the right permissions to run this command.```"

bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()

bot.on("ready", () => {
  console.log(`Online and ready! Here is some information:`);
  console.log(`Prefix: ${config.prefix}`);
  console.log(`In ${bot.guilds.size} servers | Serving ${bot.users.size} users | A total of ${bot.channels.size} channels.`);
  config.developers.forEach(function(user) {
    console.log(`${bot.users.get(user).username} is a developer`);
  })
  console.log("--------------------Loading commands------------------------")
  fs.readdir("./commands/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
      console.log("No commands to load!");
      return;
    }

    console.log(`Loading ${jsfiles.length} commands!`);

    jsfiles.forEach((f, i) => {
      let props = require(`./commands/${f}`);
      console.log(`${i + 1}: ${f} loaded!`);
      bot.commands.set(props.help.name, props)
    });
  });
})

bot.elevation = message => {
  var permlvl = 0
  let modrole = message.guild.roles.find("name", config.mod_role)
  if(modrole && message.member.roles.has(modrole.id)) permlvl = 2
  let adminrole = message.guild.roles.find("name", config.admin_role)
  if(adminrole && message.member.roles.has(adminrole.id)) permlvl = 4
  if(config.developers.includes(message.author.id)) permlvl = 10
  return permlvl;
}

bot.on("message", message => {
  if(message.author.bot) return;
  if(!message.guild) return;
  var args = message.content.split(/[ ]+/)
  let command = args.slice(0).join(" ")
  if(!command.startsWith(config.prefix)) return;
  let perms = bot.elevation(message)
  let cmd = bot.commands.get(command.slice(config.prefix.length))
  if(bot.commands.has(command)) {
    cmd = bot.commands.get(command)
  }

  if(cmd) {
    if(perms < cmd.conf.permLevel) {
    message.author.send(no_perms)
  } else {
    cmd.run(bot, message, args)
  }
}
})

bot.login(config.token)

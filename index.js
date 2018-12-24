const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const colours = require("./colours.json");
const superagent = require("superagent")

const bot = new Discord.Client({disableEveryone: true});


bot.on("Ready Mr. Hentai", async () => {
    console.log('${bot.user.username} is online')
    bot.user.setActivity("Watching over Freddos", {type: "STREAMING"});
})

bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${prefix}ping`){
        return message.channel.send("Pong!")
    }

    if(cmd === `${prefix}serverinfo`){
        let sEmbed = new Discord.RichEmbed()
        .setColor(colours.light_blue)
        .setTitle("Server Info")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
        .addField("**Guild Name:**", `${message.guild.name}`, true)
        .addField("**Guild Owner:**", `${message.guild.owner}`, true)
        .addField("**Member Count**", `${message.guild.memberCount}`, true)
        .addField("**Role Count**", `${message.guild.roles.size}`, true)
        .setFooter(`Freddo Bot`, bot.user.displayAvatarURL);
        message.channel.send({embed: sEmbed});
    }    

    if(cmd === `${prefix}userinfo`){
        let sEmbed = new Discord.RichEmbed()
        .setColor(colours.light_blue)
        .setTitle("User Info")
        .setThumbnail(message.author.displayAvatarURL)
        .setAuthor(`${message.author.username} Info`)
        .addField("**Username:**", `${message.author.username}`, true)
        .addField("**Discriminator:**", `${message.author.discriminator}`, true)
        .addField("**ID:**", `${message.author.id}`, true)
        .addField("**Status:**", `${message.author.presence.status}`, true)
        .addField("**Created At:**", `${message.author.createdAt}`, true);

        message.channel.send({embed: sEmbed});
    }    
    
    if(cmd === `${prefix}meme`) {
        let message = await message.channel.send("Generating...")

        let {body} = await superagent
        .get(`https://api-to.get-a.life/meme`)
        //console.log(body.file)
        if(!{body}) return message.channel.send("I broke, try again!")

            let cEmbed = new Discord.RichEmbed()
            .setColor(0x00FF69B4)
            .setAuthor(`Freddo Bot MEMES!`, message.guild.iconURL)
            .setImage(body.file)
            .setTimestamp()
            .setFooter(`Freddo Bot`, bot.user.displayAvatarURL)

            message.channel.send({embed: cEmbed})

            message.delete();
    }        
})

bot.login(botconfig.token);
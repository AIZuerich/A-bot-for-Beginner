//fs
const fs = require("fs");

//config
const {prefix, token} = require("./config.json")
//


//discord.js
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

//command handler
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name,command);
    
}

//cooldowns
const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log('Ready!');
});


client.on('message', message => {
    ///saftey
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    

    //args and command
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
    
 
    if(!client.commands.has(commandName))return;
    
    
    const command = client.commands.get(commandName);

    ////dm
    if(command.guildOnly && message.channel.type === 'dm') {
            return message.reply('I can\'t execute that command inside DMs!');
        }
    

    if(command.args && !args.length){
        let reply ="You didnt provide any arguments, "+ message.author.tag    
        if(command.usage){
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply)
    }


    ///start cooldown
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {

    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

	if (now < expirationTime) {
		const timeLeft = (expirationTime - now) / 1000;
		return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
	}
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    //end cooldown

    try{
        command.execute(message,args);
      
    }catch(err1){
        console.log(err1+"// This is err1")
    }

});

client.login(token);
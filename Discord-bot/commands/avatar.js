module.exports = {
    name:"avatar",
    args:true,
    aliases:["icon","pfp","bild","image","userprofil"],
    guildOnly: true,
    cooldown: 2,
    usage:"<@user>",
    description:"Show your avatar",
    execute(message,args,client){
        console.log("Avatar Programm successful.");
        const taggedUser = message.mentions.users.first();
        console.log(taggedUser);
        if(taggedUser){
            return message.channel.send(taggedUser.displayAvatarURL({format:"png",dynamic:"true"}));
            console.log("Successful mention avatar")
        }else{
        return message.channel.send(`Your Avatar is:`+message.author.displayAvatarURL({format:"png",dynamic:"true"}));
        }
    }
}
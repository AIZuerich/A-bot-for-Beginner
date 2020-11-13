module.exports =  {
    name:"ping",
    cooldown:5,
    description:"Simple ping command",
    execute(message, args, client){
        let random = Math.floor(Math.random()*200+30)
        message.channel.send("Your ping is: "+random);
        console.log("successful Ping command")
    }
}
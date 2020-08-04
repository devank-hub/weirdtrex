import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const ms = require("ms");

export default class unmute implements IBotCommand {
    
    public readonly _command = "unmute";
    public readonly aliases : string[] = ["umt"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command instantly unmutes the muted person";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    usage(): string {
        return "?unmute <member> (reason)"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
        
       // check if the command caller has permission to use the command
        if(!msgObject.member.hasPermission("MANAGE_ROLES") || !msgObject.guild.owner) 
        {
            msgObject.channel.send("You dont have permission to use this command.")
                .then(msg =>{
                    setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
            });
            msgObject.delete();
            return;
        }
        else if(!msgObject.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"]))
        { 
            msgObject.channel.send("I don't have permission to add roles!")
                .then(msg =>{
                    setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
            });
            msgObject.delete();
            return;
        }
        else{
            //define the reason and unmutee
            let mutee = msgObject.mentions.members.first() || msgObject.guild.members.cache.get(args[0]);
            if(!mutee) 
            {
                msgObject.channel.send("Please supply a valid user to be unmuted!")
                    .then(msg =>{
                        setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                });
                msgObject.delete();
                return;
            }
            else
            {
                let reason = args.slice(1).join(" ");
                if(!reason) reason = "No reason given";

                //define mute role and if the mute role doesnt exist then send a message
                let muterole = msgObject.guild.roles.cache.find(r => r.name === "Muted");
                if(!muterole) 
                {
                    msgObject.channel.send("There is no mute role to remove!")
                        .then(msg =>{
                            setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                    });
                    msgObject.delete();
                    return;
                }
                else
                {
                    //remove role to the mentioned user and also send the user a dm explaing where and why they were unmuted
                    mutee.roles.remove(muterole);
                    let member = msgObject.guild.roles.cache.find(member => member.name === "member");
                    mutee.roles.add(member);
                    mutee.send(`Hello, you have been unmuted in ${msgObject.guild.name} for: ${reason}`);
                    msgObject.channel.send(`${mutee.user.username} is unmuted!`)
                        .then(msg =>{
                            setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                    });
                    msgObject.delete();
                }

                //send an embed to the modlogs channel
                let embed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setAuthor(`${msgObject.guild.name} Modlogs`, `${msgObject.guild.iconURL()}`)
                    .addField("Moderation:", "unmute")
                    .addField("Muted:", mutee.user.username)
                    .addField("Moderator:", msgObject.author.username)
                    .addField("Reason:", reason)
                    .addField("Date:", msgObject.createdAt.toLocaleString())

                let sChannel = msgObject.guild.channels.cache.find(c => c.name === "mod-logs");
                //@ts-ignore
                sChannel.send(embed);
            }
        }    
    }
}
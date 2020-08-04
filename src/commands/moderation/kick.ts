import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const ms = require("ms");

export default class kick implements IBotCommand {
    
    public readonly _command = "kick";
    public readonly aliases : string[] = ["k"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    private readonly newProperty = 0;

    help(): string {
        return "Admin only-kicks the mentioned user from the server";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?kick <member>"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
        
        //Let us know it all went well!
        let mentionedUser = msgObject.mentions.users.first();
        let suppliedReason = args.slice(1).join(" ");
        //let kickLog = `${msgObject.author.username}: ${suppliedReason}`;
        if(!suppliedReason)
        {
            suppliedReason = "he/she deserves it"
        }

        if(!msgObject.member.hasPermission("ADMINISTRATOR")){
            msgObject.channel.send(`Nice try ${msgObject.author.username}, but you dont have the permission to kick other users!`)
                .then(msg =>{
                    setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                });
                msgObject.delete();
        }
        else{
            if(!mentionedUser){
                msgObject.channel.send(`Sorry ${msgObject.author.username}, I could not find that user to kick`)
                    .then(msg =>{
                        setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                    });
                    msgObject.delete();
            }
            else
            {
                msgObject.guild.member(mentionedUser).kick(suppliedReason);   
                let embed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setAuthor(`${msgObject.guild.name} Modlogs`, `${msgObject.guild.iconURL()}`)
                    .addField("Moderation:", "kick")
                    .addField("Member:", mentionedUser.username)
                    .addField("Moderator:", msgObject.author.username)
                    .addField("Reason:", suppliedReason)
                    .addField("Date:", msgObject.createdAt.toLocaleString())
            
                let sChannel = msgObject.guild.channels.cache.find(c => c.name === "mod-logs");
                //@ts-ignore
                sChannel.send(embed);
                msgObject.delete();
            }
        }           
    }
}
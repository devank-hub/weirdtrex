import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const ms = require("ms");
export default class ban implements IBotCommand {
    
    public readonly _command = "ban"
    public readonly aliases : string[] = ["b"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    private readonly newProperty = 0;

    help(): string {
        return "Admin only-Bans the mentioned user from the server";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    
    usage(): string {
        return "?ban <member>"
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
        
        //Let us know it all went well!
        let mentionedUser = msgObject.mentions.users.first();
        let suppliedReason = args.slice(1).join(" ");
        if(!suppliedReason)
                suppliedReason = "hey,he/she deserve it";
                
        if(!msgObject.member.hasPermission(["ADMINISTRATOR", "BAN_MEMBERS"]))
        {
            msgObject.channel.send(`Nice try ${msgObject.author.username}, but you dont have the permission to ban other users!`)
                .then(msg =>{
                    setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                });
            msgObject.delete();
            return;
        }
        else
        {
            if(!mentionedUser)
            {
                msgObject.channel.send(`Sorry ${msgObject.author.username}, I could not find that user to ban`)
                    .then(msg =>{
                        setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                    });
                msgObject.delete();
                return;   
            }
            else
            {
                msgObject.guild.member(mentionedUser.id).ban({ reason: suppliedReason });
                let embed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setAuthor(`${msgObject.guild.name} Modlogs`, `${msgObject.guild.iconURL()}`)
                    .addField("Moderation:", "ban")
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
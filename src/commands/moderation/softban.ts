import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const ms = require("ms");

export default class softban implements IBotCommand {
    
    public readonly _command = "softban";
    public readonly aliases : string[] = ["sb","sban"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "Admin/Mod/Managers-this command bans a person for a given(optional) limited time";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?softban <member> (time) (reason)"
    }
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
        
         //Let us know it all went well!
         let mentionedUser = msgObject.mentions.users.first();
         let suppliedReason = args.slice(2).join(" ");
         if(!suppliedReason)
                 suppliedReason = "hey,he/she deserve it";
         let time = args[1];
         if(!time)
             time = "1d";
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
                let mentionedid = mentionedUser.id;
                msgObject.guild.member(mentionedid).ban({ reason: suppliedReason });
                let embed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setAuthor(`${msgObject.guild.name} Modlogs`, `${msgObject.guild.iconURL()}`)
                    .addField("Moderation:", "ban")
                    .addField("Mutee:", mentionedUser.username)
                    .addField("Moderator:", msgObject.author.username)
                    .addField("Reason:", suppliedReason)
                    .addField("Date:", msgObject.createdAt.toLocaleString())
             
                let sChannel = msgObject.guild.channels.cache.find(c => c.name === "mod-logs");
                 //@ts-ignore
                sChannel.send(embed);
                msgObject.delete();
            }
            setTimeout(function(){
                let mentionedid = mentionedUser.id;
                msgObject.guild.members.unban(mentionedid);
                let cembed =new Discord.MessageEmbed()
                    .setDescription(`**this member is being unbanned from ${msgObject.guild.name} : ${mentionedUser.username}**`)
                let rChannel = msgObject.guild.channels.cache.find(r => r.name === "mod-logs");
                 //@ts-ignore
                rChannel.send(cembed);
            },ms(time));
        }
    }
}
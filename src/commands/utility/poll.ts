import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const ms = require("ms");

export default class poll implements IBotCommand {
    
    public readonly _command = "poll";
    public readonly aliases : string[] = ["pl"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command is used to create polls";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    usage(): string {
        return "?poll <question>"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client, tools:any): Promise<any> {
        
        //role verfification
        // if(!msgObject.member.roles.cache.find(r => r.name === 'Admin','Manager'))
        //     msgObject.channel.send(`This requires the role: Admin or Manager`);
        //permission verfication
        if(!msgObject.member.hasPermission(['ADMINISTRATOR','MANAGE_MESSAGES']))
        {
            msgObject.channel.send("This requires the permission: Administrator")
                .then(msg =>{msg.delete({timeout: 3000})});
            msgObject.delete();
            return;
        }
        else
        {
            if(!args[0])
            {   
                msgObject.channel.send("Please give a question or statement for starting the polling")
                    .then(msg =>{msg.delete({timeout: 3000})});
                msgObject.delete();
                return;
            }
            else
            {   
                //creating embed
                const embed = new Discord.MessageEmbed()
                    .setColor(0xffffff)
                    .setFooter('React to vote')
                    .setDescription(args.join(' '))
                    .setTitle(`Poll created by: ${msgObject.author.username}`);
                
                //finally
                if(msgObject.guild.channels.cache.find(c=> c.name === "suggestions"))
                {
                    let msg = await msgObject.channel.send(embed);
                    
                    //react to message
                    await msg.react('👍');
                    await msg.react('👎');
                    await msg.react('🤷');
                    //making sure delete original message
                    msgObject.delete();
                    return;
                }
                else
                {
                    let msg = await msgObject.channel.send(embed);
                    
                    //react to message
                    await msg.react('👍');
                    await msg.react('👎');
                    await msg.react('🤷');
                    //making sure delete original message
                    msgObject.delete();
                    return;
                }
            }   
        }    
    }
}
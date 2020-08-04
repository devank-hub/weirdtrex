import * as path from "path";
import * as Discord from "discord.js";
import { IBotCommand } from "../../api";
const ms = require("ms");

export default class ascii implements IBotCommand {
    
    public readonly _command = "ascii";
    public readonly aliases : string[] = ["as"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command change the given key-words into a SPECIALIZED one XD";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    
    usage(): string {
        return "?ascii <keywords>"
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
         //First we need to generate the font
         if(!args[0])
         {
             msgObject.channel.send("Please give a word or line to generate the output")
                .then(msg =>{msg.delete({timeout: 3000})});
            msgObject.delete();
            return;
         }
         else
         {    
            msgObject.channel.send("Generating . . .")
                .then(msg =>{msg.delete({timeout: 3000})});
            const ascii = require('ascii-art');
            ascii.font(args.join(' '), 'Doom', function(err: string, rendered: string){
                //args holds an arrary of the words following the command
                rendered = rendered.trimRight();
                //Now, we need to check if the string exceeds the max characters
                if(rendered.length > 2000)
                {
                    msgObject.channel.send("Sorry the message is too wrong");
                    return;
                }    
                else if(msgObject.guild.channels.cache.find(channel => channel.name === "ascii-arts"))
                {
                    let cchannel = msgObject.guild.channels.cache.find(channel => channel.name === "ascii-arts");
                    //@ts-ignore
                    cchannel.send(rendered, {
                        code: 'md'
                    });
                }
                else
                {
                    msgObject.channel.send(rendered, {
                        code: 'md'
                    });
                }
            });
            msgObject.delete();
            return;
        }
    }
}
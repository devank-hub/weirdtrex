import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";

export default class shutdown implements IBotCommand {
    
    public readonly _command = "shutdown";
    public readonly aliases : string[] = ["sd"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command does absolutely nothing! Don't go open it for curiosity";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?shutdown"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
        
        if(msgObject.author.id != "404681937249370123") 
        {
            msgObject.channel.send("You're not the bot the owner!")
                .then(m => {m.delete({timeout: 3000})});
             return;   
        }
        else
        {
            try 
            {
                let embed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setDescription("**Bot is shutting down... and will be up in future as soon as possible**")
                await msgObject.channel.send(embed);
                process.exit()
            } 
            catch(e) 
            {
                msgObject.channel.send(`ERROR: ${e.message}`);
                return;
            }
        }
    }
}
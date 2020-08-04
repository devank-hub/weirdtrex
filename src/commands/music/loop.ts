import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const ms = require("ms");

export default class loop implements IBotCommand {
    
    public readonly _command = "loop";
    public readonly aliases : string[] = ["l"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this loops the queue/song";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?loop <song>"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
        
        let options = ["song","queue"];
        if(args[0] == undefined) 
        {
            msgObject.channel.send(`Choose a option:\n${options.join(', ')}`)
            .then(msg =>{
                setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
            });
            msgObject.delete();
            return;
        }
        if(!options.some((str: string) => str == args[0].toLowerCase())) 
        {
            msgObject.channel.send(`Choose a **valid** option:\n${options.join(', ')}`)
                .then(msg =>{
                    setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                });
            msgObject.delete();
            return;
        }
        
        //@ts-ignore
        let player = client.music.players.get(msgObject.guild.id);

        if(args[0].toLowerCase() == "song")
        {
            if(player.queueRepeat == true && player.trackRepeat == false) 
            {
                msgObject.channel.send("Cannot loop song and queue at the same time!")
                    .then(msg =>{
                        setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                    });
                msgObject.delete();
                return;
            }
            player.setTrackRepeat(true);
            msgObject.channel.send("Repeating song enabled")
                .then(msg =>{
                    setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                });
            msgObject.delete();
            return;
        }
        else if(args[0].toLowerCase() == "queue")
        {
            if(player.trackRepeat == true && player.queueRepeat == false) 
            {
                msgObject.channel.send("Cannot loop queue and song at the same time!")
                    .then(msg =>{
                        setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                    });
                msgObject.delete();
                return;
            }
            player.setQueueRepeat(true);
            msgObject.channel.send("Repeating queue enabled")
                .then(msg =>{
                    setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                });
            msgObject.delete();    
            return;
        }
        msgObject.delete();
    }
}

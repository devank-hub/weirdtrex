import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const ms = require("ms");

export default class unloop implements IBotCommand {
    
    public readonly _command = "unloop";
    public readonly aliases : string[] = ["ul","sl"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command does unloop the track or queue";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?unloop <song>"
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
            if(player.queueRepeat == true) 
            {
                msgObject.channel.send("Cannot loop song and queue at the same time!")
                    .then(msg =>{
                        setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                    });
                msgObject.delete();
                return;
            }
            player.setTrackRepeat(false);
            msgObject.channel.send("stopping repeating the queue")
                .then(msg =>{
                    setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                });
            msgObject.delete();
            return;
        }
        else if(args[0].toLowerCase() == "queue")
        {
            if(player.trackRepeat == true) 
            {
                msgObject.channel.send("Cannot loop queue and song at the same time!")
                    .then(msg =>{
                        setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                    });
                msgObject.delete();    
                return;
            }
            player.setQueueRepeat(false);
            msgObject.channel.send("stopping repeating the track")
                .then(msg =>{
                    setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                });
            msgObject.delete();    
            return;
        }
    }
}
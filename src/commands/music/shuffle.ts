import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const { ErelaClient, Utils } = require("erela.js");
const ms = require("ms");

export default class shuffle implements IBotCommand {
    
    public readonly _command = "shuffle";
    public readonly aliases : string[] = ["shq"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command shuffles the music queue if there any";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?shuffle"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
        //@ts-ignore
        const player = client.music.players.get(msgObject.guild.id);
        if(!player || !player.queue[0]) 
        {
            msgObject.channel.send("**❌**No song is playing in the server")
                .then(msg =>{
                    setTimeout(function(){(msg as Discord.Message).delete()},ms("3s"));
            });
            return;
        }
        
        const voiceChannel = msgObject.member.voice.channel;
        if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) 
        {
            msgObject.channel.send("You need to be in a voice channel to shuffle musics or songs")
                .then(msg =>{
                    setTimeout(function(){(msg as Discord.Message).delete()},ms("3s"));
            });
            return;
        }
        
        player.queue.shuffle();
        msgObject.channel.send("The queue is now shuffled")
            .then(msg =>{
                setTimeout(function(){(msg as Discord.Message).delete()},ms("3s"));
        });
        msgObject.delete(); 
    }
}    
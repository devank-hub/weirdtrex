import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const ms = require("ms");

export default class resume implements IBotCommand {
    
    public readonly _command = "resume";
    public readonly aliases : string[] = ["res"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;
    
    help(): string {
        return "this resumes the music which is paused";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?resume"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client, ops: any): Promise<any> {
        
        const voiceChannel = msgObject.member.voice.channel;
        //@ts-ignore
        const player = client.music.players.get(msgObject.guild.id);
        
        if (!player) 
        {
            msgObject.channel.send("No song's currently playing in this guild.")
                .then(msg =>{
                    setTimeout(function(){(msg as Discord.Message).delete()},ms("3s"));
            });
            return;
        }

        //const { voiceChannel } = msgObject.member;
        if (!msgObject.member.voice.channel) 
        {
            msgObject.channel.send("You need to be in a voice channel to pause music.")
                .then(msg =>{
                    setTimeout(function(){(msg as Discord.Message).delete()},ms("3s"));
            });
            return;
        }

        if(!player.playing){
            player.playing = false;
            player.pause(player.playing);
            msgObject.channel.send(`Player is now ${player.playing? "being resumed" : "being paused"}`)
                .then(msg =>{
                    setTimeout(function(){(msg as Discord.Message).delete()},ms("3s"));
            });
        }else 
        {
            msgObject.channel.send("song/songs is/are already being played at the moment")
                .then(msg =>{
                    setTimeout(function(){(msg as Discord.Message).delete()},ms("3s"));
            });
        }
        msgObject.delete();
    }
}
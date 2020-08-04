import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const { ErelaClient, Utils } = require("erela.js");
const ms = require("ms");

export default class testCommand implements IBotCommand {
    
    public readonly _command = "pause";
    public readonly aliases : string[] = ["ps"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command pauses the music";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?pause"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
        
        const voiceChannel = msgObject.member.voice.channel;
        //@ts-ignore
        const player = client.music.players.get(msgObject.guild.id);
        
        if (!player) 
        {
            msgObject.channel.send("No song/s currently playing in this guild.")
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

        player.pause(player.playing);
        msgObject.channel.send(`Player is now ${player.playing? "resumed" : "paused"}`)
            .then(msg =>{
                setTimeout(function(){(msg as Discord.Message).delete()},ms("3s"));
        });
        msgObject.delete() 
    }
}

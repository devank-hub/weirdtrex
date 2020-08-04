import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const ms = require("ms");

export default class skip implements IBotCommand {
    
    public readonly _command = "skip";
    public readonly aliases : string[] = ["sk"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command skips to the next song in the queue";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?skip"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client, ops:any): Promise<any> {
        
        //@ts-ignore
        const player = client.music.players.get(msgObject.guild.id);
        if(!player) 
        {
            msgObject.channel.send("No song/s currently playing in this guild.")
                .then(msg =>{msg.delete({timeout: 3000})});
            return;
        }

        const voiceChannel = msgObject.member.voice.channel;
        if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) 
        {
            return msgObject.channel.send("You need to be in a voice channel to use the skip command.")
                .then(msg =>{msg.delete({timeout: 3000})});
        }

        player.stop();
        msgObject.channel.send("Skipped the current song!")
            .then(msg =>{msg.delete({timeout: 3000})});
        msgObject.delete();
    }
}
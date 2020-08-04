import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";

export default class volume implements IBotCommand {
    
    public readonly _command = "volume";
    public readonly aliases : string[] = ["vol"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command does show or increase and decrease the current volume of the music player";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?volume (number or amount of player's volume)"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
        
        //@ts-ignore
        const player = client.music.players.get(msgObject.guild.id);
        if (!player)
        {
            msgObject.channel.send("No song/s currently playing within this guild.").then(msg=>{msg.delete({timeout: 3000})});
            msgObject.delete();
            return;
        }
        const voiceChannel = msgObject.member.voice.channel;
        if (!voiceChannel || voiceChannel.id !== player.voiceChannel.id)
        {
            msgObject.channel.send("You need to be in a voice channel to adjust the volume.").then(msg=>{msg.delete({timeout: 3000})});
            msgObject.delete();
            return;
        }
        if (!args[0])
        {
            msgObject.channel.send(`Current Volume: ${player.volume}`).then(msg=>{msg.delete({timeout: 3000})});
            msgObject.delete();
            return;
        }
        if (Number(args[0]) <= 0 || Number(args[0]) > 100)
        {
            msgObject.channel.send("You may only set the volume to 1-100").then(msg=>{msg.delete({timeout: 3000})});
            msgObject.delete();
            return;
        }
        player.setVolume(Number(args[0]));
        msgObject.channel.send(`Successfully set the volume to: ${args[0]}`).then(msg=>{msg.delete({timeout: 3000})});
        msgObject.delete();
        return;
    }
}
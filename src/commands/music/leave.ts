import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";

export default class leave implements IBotCommand {
    
    public readonly _command = "leave";
    public readonly aliases : string[] = ["lv"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command let bot leave the joined channel";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?leave"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
        
        const voiceChannel = msgObject.member;
		//@ts-ignore
        const player = client.music.players.get(msgObject.guild.id);

        if(!player) 
        {
            msgObject.channel.send("No song/s currently playing in this guild.").then(msg =>{msg.delete({timeout: 3000})});
            msgObject.delete();
            return;
        }
        if(!msgObject.member.voice.channel) 
        {
            msgObject.channel.send("You need to be in a voice channel to use the leave command.").then(msg =>{msg.delete({timeout: 3000})});
            msgObject.delete();
            return;
        }
		//@ts-ignore
        client.music.players.destroy(msgObject.guild.id);
        msgObject.channel.send("Successfully stopped the music.").then(msg =>{msg.delete({timeout: 3000})});
        msgObject.delete();
        return;
    }
}

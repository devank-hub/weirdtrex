import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const { ErelaClient, Utils } = require("erela.js");

export default class jump implements IBotCommand {
    
    public readonly _command = "jump";
    public readonly aliases : string[] = [];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command does absolutely nothing! Don't go open it for curiosity";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?jump <>"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
       
        const voiceChannel = msgObject.member.voice.channel;
        //let i = Number(args[0]);
        //@ts-ignore
        const player = client.music.players.spawn({
            guild: msgObject.guild,
            textChannel: msgObject.channel,
            voiceChannel
        });
        //@ts-ignore
        let n = Number(args[0]);
        console.log(n);
        var i = 0;
        while(i<n)
        {
            await player.stop();
            i++;
            console.log(i);
        }
        msgObject.delete();
        return;
    }

}
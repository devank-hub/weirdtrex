import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand, bot } from "../../api";

export default class ping implements IBotCommand {
    
    public readonly _command = "ping";
    public readonly aliases : string[] = [];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command shows bot's ping and bot uptime in addition";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?ping"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
        
        msgObject.channel.send("Pinging...").then(m => {
            let ping = m.createdTimestamp - msgObject.createdTimestamp;
            let choices = ["Is this really my ping", "Is it okay? I cant look", "I hope it isnt bad"];
            let response = choices[Math.floor(Math.random() * choices.length)];
            //@ts-ignore
            m.edit(`${response}: Bot Latency: \`${ping}\``).then(msg=>{msg.delete({timeout: 10000})});
        })
        function duration(ms: number) {
            const sec = Math.floor((ms / 1000) % 60).toString();
            const min = Math.floor((ms / (1000 * 60)) % 60).toString();
            const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
            const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
            return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds, `;
        }
    
        msgObject.channel.send(`I have been online for:\` ${duration(client.uptime)}\``).then(msg=>{msg.delete({timeout: 10000})});
        msgObject.delete();
        return;
    }

}
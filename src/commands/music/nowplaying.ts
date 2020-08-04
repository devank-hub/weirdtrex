import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
import { stripIndents } from "common-tags";
import { Utils, Track, Player } from "erela.js";
const ms = require("ms");

export default class nowplaying implements IBotCommand {
    
    public readonly _command = "nowplaying";
    public readonly aliases : string[] = ["np"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command shows which track is being played and requested by who";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?nowplaying"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
            //@ts-ignore
            const player = client.music.players.get(msgObject.guild.id);
            if (!player || !player.queue[0]) 
            {
                msgObject.channel.send("No song/s currently playing within this guild.")
                .then(msg =>{msg.delete({timeout: 3000})});
                msgObject.delete();
                return;
            }
            else
            {
                if (player.position > 5000){
                    getnowplaying()
                }
                if (player.position < 5000){
                    setTimeout(() => {
                    getnowplaying()
                    },3000)
                }
                
                function getnowplaying(){
                let { title, author, duration, thumbnail, requester } = player.queue[0];
                let amount = `00:${Utils.formatTime(player.position, true)}`
                const part = Math.floor((player.position / duration) * 10);
                const giveEmbed = new Discord.MessageEmbed()
                    .setColor("AQUA")
                    .setDescription(`${player.playing ? "▶️" : "⏸️"} Currently Playing ${title}\n${"▬".repeat(part) + "🔘" + "▬".repeat(10 - part)}[${amount} / ${Utils.formatTime(duration, true)}]\nRequested By: ${requester.tag}`)

                msgObject.channel.send({embed: giveEmbed}).then(m => {
                let amount: any;
                const counter = setInterval(async () => 
                {
                    if(m.deleted)
                    {
                        clearInterval(counter);
                        return;
                    }
                    if(player.playing === true){
                    let bool: boolean = false;
                    let { title, author, duration, thumbnail, requester } = player.queue[0];
                    if(amount == Utils.formatTime(player.position, true)) bool = true;
                    else amount = Utils.formatTime(player.position, true)
                    const part = Math.floor((player.position / duration) * 10);
                    giveEmbed.setDescription(`▶️ Currently Playing ${title}\n${"▬".repeat(part) + "🔘" + "▬".repeat(10 - part)}[${amount} / ${Utils.formatTime(duration, true)}]\nRequested By: ${requester.tag}`);
                    await m.edit({embed: giveEmbed})
                    if(bool == true) await m.delete();
                    }
                    else
                    {
                        clearInterval(counter);
                        msgObject.channel.send("Track or queue ended,player is exiting . . .")
                            .then(msg =>{
                                msg.delete({timeout:3000})
                        });
                        //@ts-ignore
                        m.delete();
                    }
                },4000)
            })
            }
            msgObject.delete();
        }
    }
}      
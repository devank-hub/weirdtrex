import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const RadioBrowser = require('radio-browser');
const { Utils } = require("erela.js");
const ms = require("ms");

export default class radio implements IBotCommand {
    
    public readonly _command = "radio";
    public readonly aliases : string[] = ["rd"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command plays online radio stations on **radio voice-channel** depending upon your searching terma and then selection from 1 to 7,if first time plays nothing then try again it sometime fails to load the link";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?radio <station_name>"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
        
        if (!args[0]) 
        {
            msgObject.channel.send("Please provide a radio name to search.")
                .then(msg=>{msg.delete({timeout: 3000})});
            msgObject.delete();
            return;
        }
        const query = args.join(" ");
        const voiceChannel = msgObject.guild.channels.cache.find(c=> c.name.toLowerCase() === "📻radio") as Discord.VoiceChannel;
        //console.log(voiceChannel)
        if (!voiceChannel)
        {
            //console.log(voiceChannel)
            msgObject.channel.send("You need to be in a voice channel to play radio.").then(msg=>{msg.delete({timeout: 3000})});
            msgObject.delete();
            return;
        }
        //@ts-ignore
        const player = client.music.players.get(msgObject.guild.id);
        //@ts-ignore
        if (!player) client.music.players.spawn({
            guild: msgObject.guild,
            textChannel: msgObject.channel,
            voiceChannel
        });
        //@ts-ignore
        const plays = client.music.players.get(msgObject.guild.id);
        let filter = {
            limit: 7, // list max 5 items
            by: 'name', // search in tag
            searchterm: query, // term in tag

        }
        let str = "";
        let i = 0;
    
        let embed = new Discord.MessageEmbed();
        embed.setTitle('**Search Results for 📻**');
        embed.setFooter("Your response time closes within the next 30 seconds. Type 'cancel' to cancel the selection",msgObject.guild.iconURL());
        let data = await RadioBrowser.getStations(filter)
        embed.setDescription(data.map((obj: any, i:number) => `**${i+1}.🎶 [${obj.name} ${obj.language}](${obj.url_resolved})**`).join('\n\n'))//idk if url property exists
        msgObject.channel.send(embed).then(msg=>{msg.delete({timeout: 10000})});
        const collector = msgObject.channel.createMessageCollector(m => {
            return m.author.id === msgObject.author.id && new RegExp(`^([1-7]|cancel)$`, "i").test(m.content)
        }, {
            time: 30000,
            max: 1
        });

        collector.on("collect", async m => {
            if (/cancel/i.test(m.content)) return collector.stop("cancelled")
            m.delete();
            const track = [Number(m.content) - 1];

            collector.on("end", (_, reason) => {
                if (["time", "cancelled"].includes(reason)) {
                    //@ts-ignore
                    if (player.queue.empty == true) client.music.players.destroy(player.guild.id)
                    return msgObject.channel.send("Cancelled selection.").then(msg => {msg.delete({timeout: 3000})});
                }
            });
            //@ts-ignore
            str = data[track].url;
            if (!str) return msgObject.channel.send('Cannot play this Radio Station').then(msg => {msg.delete({timeout: 3000})});
            await play(str)
        })
            
        async function play(str: any) {
            if (str.length === 0) return msgObject.channel.send(new Discord.MessageEmbed().setDescription(`Invalid Radio item`).setColor("GREEN")).then(msg => {msg.delete({timeout: 3000})});
            //@ts-ignore
            await client.music.search(str, msgObject.author).then(async (res: any) => {

                    switch (res.loadType) {
                        case "TRACK_LOADED":
                            plays.queue.add(res.tracks[0]);
                            msgObject.channel.send(`Adding \`${res.tracks[0].title}\` \`${Utils.formatTime(res.tracks[0].duration, true)}\``).then(msg => {msg.delete({timeout: 4000})});
                            if (!plays.playing) {
                                plays.play();
                                plays.setTrackRepeat(false);
                                plays.setQueueRepeat(false);
                            }
                            break;

                        case "LOAD_FAILED":
                            msgObject.channel.send("Unable to add this station try other options !!").then(msg => {msg.delete({timeout: 3000})});
                            break;
                    }
                })
                .catch((error: any) => console.error(error))
        }
        msgObject.delete();
    }
}
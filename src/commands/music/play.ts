import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const { ErelaClient, Utils } = require("erela.js");
const ms = require("ms");
//const { er }
export default class play implements IBotCommand {
    
    public readonly _command = "play";
    public readonly aliases : string[] = ["p"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "This command plays the track from given list/ tracks from playlist url";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?play <songname>"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
                
        const voiceChannel = msgObject.member.voice.channel;
        const permissions = voiceChannel.permissionsFor(client.user);
        if (!msgObject.member.voice.channel)  
        {
            msgObject.channel.send("You need to be in a voice channel to play music.")
                .then(msg =>{msg.delete({timeout: 3000})});
            msgObject.delete();
            return;
        } 
        else 
        if (!permissions.has(["CONNECT","SPEAK"])) 
        {
            msgObject.channel.send("I cannot connect to your voice channel, make sure I have permission to!")
                .then(msg =>{msg.delete({timeout: 3000})});
            msgObject.delete();
            return;
        }
        else
        if (!args[0]) 
        {
            msgObject.channel.send("Please provide a song name or link to search.")
                .then(msg =>{msg.delete({timeout: 3000})});
            msgObject.delete();
            return;
        }
        else
        {
                const emoji = client.emojis.cache.find(emoji => emoji.name === "YouTube");
                const embed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setDescription(`**🕵🏻  searching in  ${emoji}  for ${args.join(" ")} **`)
                    
                msgObject.channel.send(embed)
                    .then(msg =>{msg.delete({timeout: 3000})});
                msgObject.delete();
            setTimeout(function(){
                //@ts-ignore
                const player = client.music.players.spawn({
                    guild: msgObject.guild,
                    textChannel: msgObject.channel,
                    voiceChannel
                });
                //@ts-ignore
                client.music.search(args.join(" "), msgObject.author).then(async (res: any) => {
                switch (res.loadType) {
                    case "TRACK_LOADED":
                        player.queue.add(res.tracks[0]);
                        msgObject.channel.send(`Playing/Enqueuing \`${res.tracks[0].title}\` \`${Utils.formatTime(res.tracks[0].duration, true)}\``)
                            .then(msg =>{
                                setTimeout(function(){(msg as Discord.Message).delete()},ms("3s"));
                        });
                        if (!player.playing) player.play()
                        break;
                    
                    case "SEARCH_RESULT":
                        let index = 1;
                        const tracks = res.tracks.slice(0, 5);
                        const embed = new Discord.MessageEmbed()
                            .setAuthor("Song Selection.", msgObject.author.displayAvatarURL())
                            .setDescription(tracks.map((video:any) => `**${index++} -** ${video.title}`))
                            .setFooter("Your response time closes within the next 30 seconds. Type 'cancel' to cancel the selection");

                        await msgObject.channel.send(embed)
                            .then(msg =>{msg.delete({timeout: 3000})});

                        const collector = msgObject.channel.createMessageCollector(m => {
                            return m.author.id === msgObject.author.id && new RegExp(`^([1-5]|cancel)$`, "i").test(m.content)
                        }, { time: 30000, max: 1});

                        collector.on("collect", m => {
                            if (/cancel/i.test(m.content)) return collector.stop("cancelled")
                            setTimeout(function(){m.delete()},ms("2s"));
                            const track = tracks[Number(m.content) - 1];
                            player.queue.add(track)
                            msgObject.channel.send(`Playing/Enqueuing \`${track.title}\` \`${Utils.formatTime(track.duration, true)}\``)
                                .then(msg =>{
                                    setTimeout(function(){(msg as Discord.Message).delete()},ms("3s"));
                            });
                            if(!player.playing) player.play();
                        });

                        collector.on("end", (_, reason) => {
                            if(["time", "cancelled"].includes(reason)) 
                            {
                                msgObject.channel.send("Cancelled selection.")
                                    .then(msg =>{
                                        setTimeout(function(){(msg as Discord.Message).delete()},ms("30s"));
                                });
                            }
                        });
                        break;

                    case "PLAYLIST_LOADED":
                        res.playlist.tracks.forEach((track: any) => player.queue.add(track));
                        const duration = Utils.formatTime(res.playlist.tracks.reduce((acc: any, cur: any) => ({ duration: acc.duration + cur.duration })).duration, true);
                        msgObject.channel.send(`Enqueuing \`${res.playlist.tracks.length}\` \`${duration}\` tracks in playlist \`${res.playlist.info.name}\``)
                            .then(msg =>{
                                setTimeout(function(){(msg as Discord.Message).delete()},ms("3s"));
                        });
                        if(!player.playing) player.play()
                        break;
                }
                }).catch((err:any) => {
                    msgObject.channel.send(err.message)
                    console.log(err)
                })
                // msgObject.delete();
            },1000);
        }
    }
}
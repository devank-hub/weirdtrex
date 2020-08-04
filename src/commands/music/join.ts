import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const { ErelaClient, Utils } = require("erela.js");
const ms = require("ms");

export default class join implements IBotCommand {
    
    public readonly _command = "join";
    public readonly aliases : string[] = ["j","jc"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "This command plays the track from given list/ tracks from playlist url";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?join <songname or url>"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
                
        const voiceChannel = msgObject.member.voice.channel;
        if (!msgObject.member.voice.channel)  
        {
            msgObject.channel.send("You need to be in a voice channel to play music.")
                .then(msg =>{
                    setTimeout(function(){(msg as Discord.Message).delete()},ms("3s"));
            });
            return;
        }

        const permissions = voiceChannel.permissionsFor(client.user);
        if (!permissions.has(["CONNECT","SPEAK"])) return msgObject.channel.send("I cannot connect to your voice channel, make sure I have permission to!");
        // if (!permissions.has("SPEAK"))  return msgObject.channel.send("I cannot connect to your voice channel, make sure I have permission to!");
        // if (!args[0]) msgObject.channel.send("**❎** No url or search keyword found, Please provide a song name or link to search.");
        
        if (!args[0]) 
        {
            msgObject.channel.send("**❌** No url or search keyword found, Please provide a song name or link to search.")
                .then(msg =>{
                    setTimeout(function(){(msg as Discord.Message).delete()},ms("3s"));
            });
            msgObject.delete();
            return;
        }
        else
        {
            const emoji = client.emojis.cache.find(emoji => emoji.name === "YouTube");
            const embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`**🕵🏻  searching in  ${emoji}  for ${args.join(" ")} **`)
                //.setFooter(` for ${args.join(" ")}`)        
            msgObject.channel.send(embed)
                .then(msg =>{
                    setTimeout(function(){(msg as Discord.Message).delete()},ms("3s"));
            });
        
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
                        msgObject.channel.send(`Enqueuing \`${res.tracks[0].title}\` \`${Utils.formatTime(res.tracks[0].duration, true)}\``);
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
                            .then(msg =>{
                                setTimeout(function(){(msg as Discord.Message).delete()},ms("30s"));
                        });
                        const collector = msgObject.channel.createMessageCollector(m => {
                            return m.author.id === msgObject.author.id && new RegExp(`^([1-5]|cancel)$`, "i").test(m.content)
                        }, { time: 30000, max: 1});

                        collector.on("collect", m => {
                            if (/cancel/i.test(m.content)) return collector.stop("cancelled")
                            m.delete();
                            const track = tracks[Number(m.content) - 1];
                            player.queue.add(track)
                            msgObject.channel.send(`Enqueuing \`${track.title}\` \`${Utils.formatTime(track.duration, true)}\``)
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
                                        setTimeout(function(){(msg as Discord.Message).delete()},ms("3s"));
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
            },1000); 
            msgObject.delete();
        }    
    }
}
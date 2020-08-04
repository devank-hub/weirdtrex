"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const path = require("path");
const { ErelaClient, Utils } = require("erela.js");
const ms = require("ms");
class play {
    constructor() {
        this._command = "play";
        this.aliases = ["p"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "This command plays the track from given list/ tracks from playlist url";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?play <songname>";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const voiceChannel = msgObject.member.voice.channel;
            const permissions = voiceChannel.permissionsFor(client.user);
            if (!msgObject.member.voice.channel) {
                msgObject.channel.send("You need to be in a voice channel to play music.")
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                msgObject.delete();
                return;
            }
            else if (!permissions.has(["CONNECT", "SPEAK"])) {
                msgObject.channel.send("I cannot connect to your voice channel, make sure I have permission to!")
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                msgObject.delete();
                return;
            }
            else if (!args[0]) {
                msgObject.channel.send("Please provide a song name or link to search.")
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                msgObject.delete();
                return;
            }
            else {
                const emoji = client.emojis.cache.find(emoji => emoji.name === "YouTube");
                const embed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setDescription(`**🕵🏻  searching in  ${emoji}  for ${args.join(" ")} **`);
                msgObject.channel.send(embed)
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                msgObject.delete();
                setTimeout(function () {
                    const player = client.music.players.spawn({
                        guild: msgObject.guild,
                        textChannel: msgObject.channel,
                        voiceChannel
                    });
                    client.music.search(args.join(" "), msgObject.author).then((res) => __awaiter(this, void 0, void 0, function* () {
                        switch (res.loadType) {
                            case "TRACK_LOADED":
                                player.queue.add(res.tracks[0]);
                                msgObject.channel.send(`Playing/Enqueuing \`${res.tracks[0].title}\` \`${Utils.formatTime(res.tracks[0].duration, true)}\``)
                                    .then(msg => {
                                    setTimeout(function () { msg.delete(); }, ms("3s"));
                                });
                                if (!player.playing)
                                    player.play();
                                break;
                            case "SEARCH_RESULT":
                                let index = 1;
                                const tracks = res.tracks.slice(0, 5);
                                const embed = new Discord.MessageEmbed()
                                    .setAuthor("Song Selection.", msgObject.author.displayAvatarURL())
                                    .setDescription(tracks.map((video) => `**${index++} -** ${video.title}`))
                                    .setFooter("Your response time closes within the next 30 seconds. Type 'cancel' to cancel the selection");
                                yield msgObject.channel.send(embed)
                                    .then(msg => { msg.delete({ timeout: 3000 }); });
                                const collector = msgObject.channel.createMessageCollector(m => {
                                    return m.author.id === msgObject.author.id && new RegExp(`^([1-5]|cancel)$`, "i").test(m.content);
                                }, { time: 30000, max: 1 });
                                collector.on("collect", m => {
                                    if (/cancel/i.test(m.content))
                                        return collector.stop("cancelled");
                                    setTimeout(function () { m.delete(); }, ms("2s"));
                                    const track = tracks[Number(m.content) - 1];
                                    player.queue.add(track);
                                    msgObject.channel.send(`Playing/Enqueuing \`${track.title}\` \`${Utils.formatTime(track.duration, true)}\``)
                                        .then(msg => {
                                        setTimeout(function () { msg.delete(); }, ms("3s"));
                                    });
                                    if (!player.playing)
                                        player.play();
                                });
                                collector.on("end", (_, reason) => {
                                    if (["time", "cancelled"].includes(reason)) {
                                        msgObject.channel.send("Cancelled selection.")
                                            .then(msg => {
                                            setTimeout(function () { msg.delete(); }, ms("30s"));
                                        });
                                    }
                                });
                                break;
                            case "PLAYLIST_LOADED":
                                res.playlist.tracks.forEach((track) => player.queue.add(track));
                                const duration = Utils.formatTime(res.playlist.tracks.reduce((acc, cur) => ({ duration: acc.duration + cur.duration })).duration, true);
                                msgObject.channel.send(`Enqueuing \`${res.playlist.tracks.length}\` \`${duration}\` tracks in playlist \`${res.playlist.info.name}\``)
                                    .then(msg => {
                                    setTimeout(function () { msg.delete(); }, ms("3s"));
                                });
                                if (!player.playing)
                                    player.play();
                                break;
                        }
                    })).catch((err) => {
                        msgObject.channel.send(err.message);
                        console.log(err);
                    });
                }, 1000);
            }
        });
    }
}
exports.default = play;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9tdXNpYy9wbGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBQ3RDLDZCQUE2QjtBQUU3QixNQUFNLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNuRCxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFekIsTUFBcUIsSUFBSTtJQUF6QjtRQUVvQixhQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ2xCLFlBQU8sR0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLGFBQVEsR0FBWSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLFlBQU8sR0FBYSxJQUFJLENBQUM7SUE2SDdDLENBQUM7SUEzSEcsSUFBSTtRQUNBLE9BQU8sd0VBQXdFLENBQUM7SUFDcEYsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUNELEtBQUs7UUFDRCxPQUFPLGtCQUFrQixDQUFBO0lBQzdCLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBRS9FLE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUNwRCxNQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUNuQztnQkFDSSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrREFBa0QsQ0FBQztxQkFDckUsSUFBSSxDQUFDLEdBQUcsQ0FB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
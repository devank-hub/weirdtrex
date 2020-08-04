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
class join {
    constructor() {
        this._command = "join";
        this.aliases = ["j", "jc"];
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
        return "?join <songname or url>";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const voiceChannel = msgObject.member.voice.channel;
            if (!msgObject.member.voice.channel) {
                msgObject.channel.send("You need to be in a voice channel to play music.")
                    .then(msg => {
                    setTimeout(function () { msg.delete(); }, ms("3s"));
                });
                return;
            }
            const permissions = voiceChannel.permissionsFor(client.user);
            if (!permissions.has(["CONNECT", "SPEAK"]))
                return msgObject.channel.send("I cannot connect to your voice channel, make sure I have permission to!");
            if (!args[0]) {
                msgObject.channel.send("**❌** No url or search keyword found, Please provide a song name or link to search.")
                    .then(msg => {
                    setTimeout(function () { msg.delete(); }, ms("3s"));
                });
                msgObject.delete();
                return;
            }
            else {
                const emoji = client.emojis.cache.find(emoji => emoji.name === "YouTube");
                const embed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setDescription(`**🕵🏻  searching in  ${emoji}  for ${args.join(" ")} **`);
                msgObject.channel.send(embed)
                    .then(msg => {
                    setTimeout(function () { msg.delete(); }, ms("3s"));
                });
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
                                msgObject.channel.send(`Enqueuing \`${res.tracks[0].title}\` \`${Utils.formatTime(res.tracks[0].duration, true)}\``);
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
                                    .then(msg => {
                                    setTimeout(function () { msg.delete(); }, ms("30s"));
                                });
                                const collector = msgObject.channel.createMessageCollector(m => {
                                    return m.author.id === msgObject.author.id && new RegExp(`^([1-5]|cancel)$`, "i").test(m.content);
                                }, { time: 30000, max: 1 });
                                collector.on("collect", m => {
                                    if (/cancel/i.test(m.content))
                                        return collector.stop("cancelled");
                                    m.delete();
                                    const track = tracks[Number(m.content) - 1];
                                    player.queue.add(track);
                                    msgObject.channel.send(`Enqueuing \`${track.title}\` \`${Utils.formatTime(track.duration, true)}\``)
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
                                            setTimeout(function () { msg.delete(); }, ms("3s"));
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
                msgObject.delete();
            }
        });
    }
}
exports.default = join;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9tdXNpYy9qb2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBQ3RDLDZCQUE2QjtBQUU3QixNQUFNLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNuRCxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFekIsTUFBcUIsSUFBSTtJQUF6QjtRQUVvQixhQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ2xCLFlBQU8sR0FBYyxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxhQUFRLEdBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QyxZQUFPLEdBQWEsSUFBSSxDQUFDO0lBNEg3QyxDQUFDO0lBMUhHLElBQUk7UUFDQSxPQUFPLHdFQUF3RSxDQUFDO0lBQ3BGLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFDRCxLQUFLO1FBQ0QsT0FBTyx5QkFBeUIsQ0FBQTtJQUNwQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUUvRSxNQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDcEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFDbkM7Z0JBQ0ksU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0RBQWtELENBQUM7cUJBQ3JFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDUixVQUFVLENBQUMsY0FBWSxHQUF1QixDQUFDLE1BQU0sRUFBRSxDQUFBLENBQUEsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMzRSxDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPO2FBQ1Y7WUFFRCxNQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBQyxPQUFPLENBQUMsQ0FBQztnQkFBRSxPQUFPLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHlFQUF5RSxDQUFDLENBQUM7WUFJcEosSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDWjtnQkFDSSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxxRkFBcUYsQ0FBQztxQkFDeEcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNSLFVBQVUsQ0FBQyxjQUFZLEdBQXVCLENBQUMsTUFBTSxFQUFFLENBQUEsQ0FBQSxDQUFDLEVBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzNFLENBQUMsQ0FBQyxDQUFDO2dCQUNILFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDbkIsT0FBTzthQUNWO2lCQUVEO2dCQUNJLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUM7Z0JBQzFFLE1BQU0sS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTtxQkFDbkMsUUFBUSxDQUFDLEtBQUssQ0FBQztxQkFDZixjQUFjLENBQUMseUJBQXlCLEtBQUssU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFFL0UsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO3FCQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ1IsVUFBVSxDQUFDLGNBQVksR0FBdUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQSxDQUFBLENBQUMsRUFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDM0UsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsVUFBVSxDQUFDO29CQUVQLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQzt3QkFDdEMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxLQUFLO3dCQUN0QixXQUFXLEVBQUUsU0FBUyxDQUFDLE9BQU87d0JBQzlCLFlBQVk7cUJBQ2YsQ0FBQyxDQUFDO29CQUVILE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFPLEdBQVEsRUFBRSxFQUFFO3dCQUM5RSxRQUFRLEdBQUcsQ0FBQyxRQUFRLEVBQUU7NEJBQ2xCLEtBQUssY0FBYztnQ0FDZixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQ2hDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQVEsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ3JILElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTztvQ0FBRSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUE7Z0NBQ2xDLE1BQU07NEJBRVYsS0FBSyxlQUFlO2dDQUNoQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7Z0NBQ2QsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dDQUN0QyxNQUFNLEtBQUssR0FBRyxJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7cUNBQ25DLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUM7cUNBQ2pFLGNBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBUyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEtBQUssRUFBRSxRQUFRLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO3FDQUM1RSxTQUFTLENBQUMsNkZBQTZGLENBQUMsQ0FBQztnQ0FFOUcsTUFBTSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7cUNBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtvQ0FDUixVQUFVLENBQUMsY0FBWSxHQUF1QixDQUFDLE1BQU0sRUFBRSxDQUFBLENBQUEsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dDQUM1RSxDQUFDLENBQUMsQ0FBQztnQ0FDSCxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxFQUFFO29DQUMzRCxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLElBQUksTUFBTSxDQUFDLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7Z0NBQ3JHLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7Z0NBRTNCLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFFO29DQUN4QixJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQzt3Q0FBRSxPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7b0NBQ2pFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQ0FDWCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQ0FDNUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7b0NBQ3ZCLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsS0FBSyxDQUFDLEtBQUssUUFBUSxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQzt5Q0FDL0YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dDQUNSLFVBQVUsQ0FBQyxjQUFZLEdBQXVCLENBQUMsTUFBTSxFQUFFLENBQUEsQ0FBQSxDQUFDLEVBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0NBQzNFLENBQUMsQ0FBQyxDQUFDO29DQUNILElBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTzt3Q0FBRSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7Z0NBQ3RDLENBQUMsQ0FBQyxDQUFDO2dDQUVILFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFO29DQUM5QixJQUFHLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFDekM7d0NBQ0ksU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUM7NkNBQ3pDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTs0Q0FDUixVQUFVLENBQUMsY0FBWSxHQUF1QixDQUFDLE1BQU0sRUFBRSxDQUFBLENBQUEsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dDQUMzRSxDQUFDLENBQUMsQ0FBQztxQ0FDTjtnQ0FDTCxDQUFDLENBQUMsQ0FBQztnQ0FDSCxNQUFNOzRCQUVWLEtBQUssaUJBQWlCO2dDQUNsQixHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0NBQ3JFLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBUSxFQUFFLEdBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO2dDQUNsSixTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sUUFBUSxRQUFRLDJCQUEyQixHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQztxQ0FDakksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29DQUNSLFVBQVUsQ0FBQyxjQUFZLEdBQXVCLENBQUMsTUFBTSxFQUFFLENBQUEsQ0FBQSxDQUFDLEVBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0NBQzNFLENBQUMsQ0FBQyxDQUFDO2dDQUNILElBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTztvQ0FBRSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUE7Z0NBQ2pDLE1BQU07eUJBQ2I7b0JBQ0QsQ0FBQyxDQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFPLEVBQUUsRUFBRTt3QkFDakIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO3dCQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO29CQUNwQixDQUFDLENBQUMsQ0FBQTtnQkFDTixDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1IsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ3RCO1FBQ0wsQ0FBQztLQUFBO0NBQ0o7QUFqSUQsdUJBaUlDIn0=
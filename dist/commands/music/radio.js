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
const RadioBrowser = require('radio-browser');
const { Utils } = require("erela.js");
const ms = require("ms");
class radio {
    constructor() {
        this._command = "radio";
        this.aliases = ["rd"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "this command plays online radio stations on **radio voice-channel** depending upon your searching terma and then selection from 1 to 7,if first time plays nothing then try again it sometime fails to load the link";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?radio <station_name>";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args[0]) {
                msgObject.channel.send("Please provide a radio name to search.")
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                msgObject.delete();
                return;
            }
            const query = args.join(" ");
            const voiceChannel = msgObject.guild.channels.cache.find(c => c.name.toLowerCase() === "📻radio");
            if (!voiceChannel) {
                msgObject.channel.send("You need to be in a voice channel to play radio.").then(msg => { msg.delete({ timeout: 3000 }); });
                msgObject.delete();
                return;
            }
            const player = client.music.players.get(msgObject.guild.id);
            if (!player)
                client.music.players.spawn({
                    guild: msgObject.guild,
                    textChannel: msgObject.channel,
                    voiceChannel
                });
            const plays = client.music.players.get(msgObject.guild.id);
            let filter = {
                limit: 7,
                by: 'name',
                searchterm: query,
            };
            let str = "";
            let i = 0;
            let embed = new Discord.MessageEmbed();
            embed.setTitle('**Search Results for 📻**');
            embed.setFooter("Your response time closes within the next 30 seconds. Type 'cancel' to cancel the selection", msgObject.guild.iconURL());
            let data = yield RadioBrowser.getStations(filter);
            embed.setDescription(data.map((obj, i) => `**${i + 1}.🎶 [${obj.name} ${obj.language}](${obj.url_resolved})**`).join('\n\n'));
            msgObject.channel.send(embed).then(msg => { msg.delete({ timeout: 10000 }); });
            const collector = msgObject.channel.createMessageCollector(m => {
                return m.author.id === msgObject.author.id && new RegExp(`^([1-7]|cancel)$`, "i").test(m.content);
            }, {
                time: 30000,
                max: 1
            });
            collector.on("collect", (m) => __awaiter(this, void 0, void 0, function* () {
                if (/cancel/i.test(m.content))
                    return collector.stop("cancelled");
                m.delete();
                const track = [Number(m.content) - 1];
                collector.on("end", (_, reason) => {
                    if (["time", "cancelled"].includes(reason)) {
                        if (player.queue.empty == true)
                            client.music.players.destroy(player.guild.id);
                        return msgObject.channel.send("Cancelled selection.").then(msg => { msg.delete({ timeout: 3000 }); });
                    }
                });
                str = data[track].url;
                if (!str)
                    return msgObject.channel.send('Cannot play this Radio Station').then(msg => { msg.delete({ timeout: 3000 }); });
                yield play(str);
            }));
            function play(str) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (str.length === 0)
                        return msgObject.channel.send(new Discord.MessageEmbed().setDescription(`Invalid Radio item`).setColor("GREEN")).then(msg => { msg.delete({ timeout: 3000 }); });
                    yield client.music.search(str, msgObject.author).then((res) => __awaiter(this, void 0, void 0, function* () {
                        switch (res.loadType) {
                            case "TRACK_LOADED":
                                plays.queue.add(res.tracks[0]);
                                msgObject.channel.send(`Adding \`${res.tracks[0].title}\` \`${Utils.formatTime(res.tracks[0].duration, true)}\``).then(msg => { msg.delete({ timeout: 4000 }); });
                                if (!plays.playing) {
                                    plays.play();
                                    plays.setTrackRepeat(false);
                                    plays.setQueueRepeat(false);
                                }
                                break;
                            case "LOAD_FAILED":
                                msgObject.channel.send("Unable to add this station try other options !!").then(msg => { msg.delete({ timeout: 3000 }); });
                                break;
                        }
                    }))
                        .catch((error) => console.error(error));
                });
            }
            msgObject.delete();
        });
    }
}
exports.default = radio;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvbXVzaWMvcmFkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsNkJBQTZCO0FBRTdCLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUM5QyxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3RDLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixNQUFxQixLQUFLO0lBQTFCO1FBRW9CLGFBQVEsR0FBRyxPQUFPLENBQUM7UUFDbkIsWUFBTyxHQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsYUFBUSxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsWUFBTyxHQUFhLElBQUksQ0FBQztJQTJHN0MsQ0FBQztJQXpHRyxJQUFJO1FBQ0EsT0FBTyxzTkFBc04sQ0FBQztJQUNsTyxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsS0FBSztRQUNELE9BQU8sdUJBQXVCLENBQUE7SUFDbEMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFFL0UsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDWjtnQkFDSSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyx3Q0FBd0MsQ0FBQztxQkFDM0QsSUFBSSxDQUFDLEdBQUcsQ0FBQSxFQUFFLEdBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLFNBQVMsQ0FBQyxN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
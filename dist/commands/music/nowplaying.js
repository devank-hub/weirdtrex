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
const erela_js_1 = require("erela.js");
const ms = require("ms");
class nowplaying {
    constructor() {
        this._command = "nowplaying";
        this.aliases = ["np"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "this command shows which track is being played and requested by who";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?nowplaying";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = client.music.players.get(msgObject.guild.id);
            if (!player || !player.queue[0]) {
                msgObject.channel.send("No song/s currently playing within this guild.")
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                msgObject.delete();
                return;
            }
            else {
                if (player.position > 5000) {
                    getnowplaying();
                }
                if (player.position < 5000) {
                    setTimeout(() => {
                        getnowplaying();
                    }, 3000);
                }
                function getnowplaying() {
                    let { title, author, duration, thumbnail, requester } = player.queue[0];
                    let amount = `00:${erela_js_1.Utils.formatTime(player.position, true)}`;
                    const part = Math.floor((player.position / duration) * 10);
                    const giveEmbed = new Discord.MessageEmbed()
                        .setColor("AQUA")
                        .setDescription(`${player.playing ? "▶️" : "⏸️"} Currently Playing ${title}\n${"▬".repeat(part) + "🔘" + "▬".repeat(10 - part)}[${amount} / ${erela_js_1.Utils.formatTime(duration, true)}]\nRequested By: ${requester.tag}`);
                    msgObject.channel.send({ embed: giveEmbed }).then(m => {
                        let amount;
                        const counter = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                            if (m.deleted) {
                                clearInterval(counter);
                                return;
                            }
                            if (player.playing === true) {
                                let bool = false;
                                let { title, author, duration, thumbnail, requester } = player.queue[0];
                                if (amount == erela_js_1.Utils.formatTime(player.position, true))
                                    bool = true;
                                else
                                    amount = erela_js_1.Utils.formatTime(player.position, true);
                                const part = Math.floor((player.position / duration) * 10);
                                giveEmbed.setDescription(`▶️ Currently Playing ${title}\n${"▬".repeat(part) + "🔘" + "▬".repeat(10 - part)}[${amount} / ${erela_js_1.Utils.formatTime(duration, true)}]\nRequested By: ${requester.tag}`);
                                yield m.edit({ embed: giveEmbed });
                                if (bool == true)
                                    yield m.delete();
                            }
                            else {
                                clearInterval(counter);
                                msgObject.channel.send("Track or queue ended,player is exiting . . .")
                                    .then(msg => {
                                    msg.delete({ timeout: 3000 });
                                });
                                m.delete();
                            }
                        }), 4000);
                    });
                }
                msgObject.delete();
            }
        });
    }
}
exports.default = nowplaying;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm93cGxheWluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9tdXNpYy9ub3dwbGF5aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBQ3RDLDZCQUE2QjtBQUc3Qix1Q0FBZ0Q7QUFDaEQsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXpCLE1BQXFCLFVBQVU7SUFBL0I7UUFFb0IsYUFBUSxHQUFHLFlBQVksQ0FBQztRQUN4QixZQUFPLEdBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixhQUFRLEdBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QyxZQUFPLEdBQWEsSUFBSSxDQUFDO0lBNkU3QyxDQUFDO0lBM0VHLElBQUk7UUFDQSxPQUFPLHFFQUFxRSxDQUFDO0lBQ2pGLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFDRCxLQUFLO1FBQ0QsT0FBTyxhQUFhLENBQUE7SUFDeEIsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFFM0UsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQy9CO2dCQUNJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdEQUFnRCxDQUFDO3FCQUN2RSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENB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
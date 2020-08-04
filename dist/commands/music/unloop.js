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
const path = require("path");
const ms = require("ms");
class unloop {
    constructor() {
        this._command = "unloop";
        this.aliases = ["ul", "sl"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "this command does unloop the track or queue";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?unloop <song>";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = ["song", "queue"];
            if (args[0] == undefined) {
                msgObject.channel.send(`Choose a option:\n${options.join(', ')}`)
                    .then(msg => {
                    setTimeout(function () { msg.delete(); }, ms("5s"));
                });
                msgObject.delete();
                return;
            }
            if (!options.some((str) => str == args[0].toLowerCase())) {
                msgObject.channel.send(`Choose a **valid** option:\n${options.join(', ')}`)
                    .then(msg => {
                    setTimeout(function () { msg.delete(); }, ms("5s"));
                });
                msgObject.delete();
                return;
            }
            let player = client.music.players.get(msgObject.guild.id);
            if (args[0].toLowerCase() == "song") {
                if (player.queueRepeat == true) {
                    msgObject.channel.send("Cannot loop song and queue at the same time!")
                        .then(msg => {
                        setTimeout(function () { msg.delete(); }, ms("5s"));
                    });
                    msgObject.delete();
                    return;
                }
                player.setTrackRepeat(false);
                msgObject.channel.send("stopping repeating the queue")
                    .then(msg => {
                    setTimeout(function () { msg.delete(); }, ms("5s"));
                });
                msgObject.delete();
                return;
            }
            else if (args[0].toLowerCase() == "queue") {
                if (player.trackRepeat == true) {
                    msgObject.channel.send("Cannot loop queue and song at the same time!")
                        .then(msg => {
                        setTimeout(function () { msg.delete(); }, ms("5s"));
                    });
                    msgObject.delete();
                    return;
                }
                player.setQueueRepeat(false);
                msgObject.channel.send("stopping repeating the track")
                    .then(msg => {
                    setTimeout(function () { msg.delete(); }, ms("5s"));
                });
                msgObject.delete();
                return;
            }
        });
    }
}
exports.default = unloop;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5sb29wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL211c2ljL3VubG9vcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLDZCQUE2QjtBQUU3QixNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFekIsTUFBcUIsTUFBTTtJQUEzQjtRQUVvQixhQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3BCLFlBQU8sR0FBYyxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxhQUFRLEdBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QyxZQUFPLEdBQWEsSUFBSSxDQUFDO0lBNkU3QyxDQUFDO0lBM0VHLElBQUk7UUFDQSxPQUFPLDZDQUE2QyxDQUFDO0lBQ3pELENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFDRCxLQUFLO1FBQ0QsT0FBTyxnQkFBZ0IsQ0FBQTtJQUMzQixDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUUvRSxJQUFJLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBQyxPQUFPLENBQUMsQ0FBQztZQUMvQixJQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLEVBQ3ZCO2dCQUNJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHFCQUFxQixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7cUJBQzVELElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDUixVQUFVLENBQUMsY0FBWSxHQUF1QixDQUFDLE1BQU0sRUFBRSxDQUFBLENBQUEsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN2RSxDQUFDLENBQUMs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
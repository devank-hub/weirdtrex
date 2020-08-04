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
class loop {
    constructor() {
        this._command = "loop";
        this.aliases = ["l"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "this loops the queue/song";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?loop <song>";
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
                if (player.queueRepeat == true && player.trackRepeat == false) {
                    msgObject.channel.send("Cannot loop song and queue at the same time!")
                        .then(msg => {
                        setTimeout(function () { msg.delete(); }, ms("5s"));
                    });
                    msgObject.delete();
                    return;
                }
                player.setTrackRepeat(true);
                msgObject.channel.send("Repeating song enabled")
                    .then(msg => {
                    setTimeout(function () { msg.delete(); }, ms("5s"));
                });
                msgObject.delete();
                return;
            }
            else if (args[0].toLowerCase() == "queue") {
                if (player.trackRepeat == true && player.queueRepeat == false) {
                    msgObject.channel.send("Cannot loop queue and song at the same time!")
                        .then(msg => {
                        setTimeout(function () { msg.delete(); }, ms("5s"));
                    });
                    msgObject.delete();
                    return;
                }
                player.setQueueRepeat(true);
                msgObject.channel.send("Repeating queue enabled")
                    .then(msg => {
                    setTimeout(function () { msg.delete(); }, ms("5s"));
                });
                msgObject.delete();
                return;
            }
            msgObject.delete();
        });
    }
}
exports.default = loop;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9vcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9tdXNpYy9sb29wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsNkJBQTZCO0FBRTdCLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixNQUFxQixJQUFJO0lBQXpCO1FBRW9CLGFBQVEsR0FBRyxNQUFNLENBQUM7UUFDbEIsWUFBTyxHQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0IsYUFBUSxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsWUFBTyxHQUFhLElBQUksQ0FBQztJQThFN0MsQ0FBQztJQTVFRyxJQUFJO1FBQ0EsT0FBTywyQkFBMkIsQ0FBQztJQUN2QyxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsS0FBSztRQUNELE9BQU8sY0FBYyxDQUFBO0lBQ3pCLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBRS9FLElBQUksT0FBTyxHQUFHLENBQUMsTUFBTSxFQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9CLElBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsRUFDdkI7Z0JBQ0ksU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQXFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztxQkFDaEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNSLFVBQVUsQ0FBQyxjQUFZLEdBQXVCLENBQUMsTUFBTSxFQUFFLENBQUEsQ0FBQSxDQUFDLEVBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZFLENBQUMsQ0FBQyxDQUFDO2dCQUNILFNBQVMs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
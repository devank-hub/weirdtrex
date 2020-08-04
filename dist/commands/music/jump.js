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
const { ErelaClient, Utils } = require("erela.js");
class jump {
    constructor() {
        this._command = "jump";
        this.aliases = [];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "this command does absolutely nothing! Don't go open it for curiosity";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?jump <>";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const voiceChannel = msgObject.member.voice.channel;
            const player = client.music.players.spawn({
                guild: msgObject.guild,
                textChannel: msgObject.channel,
                voiceChannel
            });
            let n = Number(args[0]);
            console.log(n);
            var i = 0;
            while (i < n) {
                yield player.stop();
                i++;
                console.log(i);
            }
            msgObject.delete();
            return;
        });
    }
}
exports.default = jump;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianVtcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9tdXNpYy9qdW1wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsNkJBQTZCO0FBRTdCLE1BQU0sRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRW5ELE1BQXFCLElBQUk7SUFBekI7UUFFb0IsYUFBUSxHQUFHLE1BQU0sQ0FBQztRQUNsQixZQUFPLEdBQWMsRUFBRSxDQUFDO1FBQ3hCLGFBQVEsR0FBWSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLFlBQU8sR0FBYSxJQUFJLENBQUM7SUFxQzdDLENBQUM7SUFuQ0csSUFBSTtRQUNBLE9BQU8sc0VBQXNFLENBQUM7SUFDbEYsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUNELEtBQUs7UUFDRCxPQUFPLFVBQVUsQ0FBQTtJQUNyQixDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUUvRSxNQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFHcEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUN0QyxLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUs7Z0JBQ3RCLFdBQVcsRUFBRSxTQUFTLENBQUMsT0FBTztnQkFDOUIsWUFBWTthQUNmLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ1YsT0FBTSxDQUFDLEdBQUMsQ0FBQyxFQUNUO2dCQUNJLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNwQixDQUFDLEVBQUUsQ0FBQztnQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2xCO1lBQ0QsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ25CLE9BQU87UUFDWCxDQUFDO0tBQUE7Q0FFSjtBQTFDRCx1QkEwQ0MifQ==
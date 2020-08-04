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
class skip {
    constructor() {
        this._command = "skip";
        this.aliases = ["sk"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "this command skips to the next song in the queue";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?skip";
    }
    runCommand(args, msgObject, client, ops) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = client.music.players.get(msgObject.guild.id);
            if (!player) {
                msgObject.channel.send("No song/s currently playing in this guild.")
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                return;
            }
            const voiceChannel = msgObject.member.voice.channel;
            if (!voiceChannel || voiceChannel.id !== player.voiceChannel.id) {
                return msgObject.channel.send("You need to be in a voice channel to use the skip command.")
                    .then(msg => { msg.delete({ timeout: 3000 }); });
            }
            player.stop();
            msgObject.channel.send("Skipped the current song!")
                .then(msg => { msg.delete({ timeout: 3000 }); });
            msgObject.delete();
        });
    }
}
exports.default = skip;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9tdXNpYy9za2lwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsNkJBQTZCO0FBRTdCLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixNQUFxQixJQUFJO0lBQXpCO1FBRW9CLGFBQVEsR0FBRyxNQUFNLENBQUM7UUFDbEIsWUFBTyxHQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsYUFBUSxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsWUFBTyxHQUFhLElBQUksQ0FBQztJQW9DN0MsQ0FBQztJQWxDRyxJQUFJO1FBQ0EsT0FBTyxrREFBa0QsQ0FBQztJQUM5RCxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsS0FBSztRQUNELE9BQU8sT0FBTyxDQUFBO0lBQ2xCLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0IsRUFBRSxHQUFPOztZQUd4RixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM1RCxJQUFHLENBQUMsTUFBTSxFQUNWO2dCQUNJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDRDQUE0QyxDQUFDO3FCQUMvRCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQztnQkFDL0MsT0FBTzthQUNWO1lBRUQsTUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQ3BELElBQUcsQ0FBQyxZQUFZLElBQUksWUFBWSxDQUFDLEVBQUUsS0FBSyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFDOUQ7Z0JBQ0ksT0FBTyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyw0REFBNEQsQ0FBQztxQkFDdEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7YUFDbEQ7WUFFRCxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZCxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQztpQkFDOUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7WUFDL0MsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZCLENBQUM7S0FBQTtDQUNKO0FBekNELHVCQXlDQyJ9
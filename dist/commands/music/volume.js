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
class volume {
    constructor() {
        this._command = "volume";
        this.aliases = ["vol"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "this command does show or increase and decrease the current volume of the music player";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?volume (number or amount of player's volume)";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = client.music.players.get(msgObject.guild.id);
            if (!player) {
                msgObject.channel.send("No song/s currently playing within this guild.").then(msg => { msg.delete({ timeout: 3000 }); });
                msgObject.delete();
                return;
            }
            const voiceChannel = msgObject.member.voice.channel;
            if (!voiceChannel || voiceChannel.id !== player.voiceChannel.id) {
                msgObject.channel.send("You need to be in a voice channel to adjust the volume.").then(msg => { msg.delete({ timeout: 3000 }); });
                msgObject.delete();
                return;
            }
            if (!args[0]) {
                msgObject.channel.send(`Current Volume: ${player.volume}`).then(msg => { msg.delete({ timeout: 3000 }); });
                msgObject.delete();
                return;
            }
            if (Number(args[0]) <= 0 || Number(args[0]) > 100) {
                msgObject.channel.send("You may only set the volume to 1-100").then(msg => { msg.delete({ timeout: 3000 }); });
                msgObject.delete();
                return;
            }
            player.setVolume(Number(args[0]));
            msgObject.channel.send(`Successfully set the volume to: ${args[0]}`).then(msg => { msg.delete({ timeout: 3000 }); });
            msgObject.delete();
            return;
        });
    }
}
exports.default = volume;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm9sdW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL211c2ljL3ZvbHVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLDZCQUE2QjtBQUc3QixNQUFxQixNQUFNO0lBQTNCO1FBRW9CLGFBQVEsR0FBRyxRQUFRLENBQUM7UUFDcEIsWUFBTyxHQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsYUFBUSxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsWUFBTyxHQUFhLElBQUksQ0FBQztJQStDN0MsQ0FBQztJQTdDRyxJQUFJO1FBQ0EsT0FBTyx3RkFBd0YsQ0FBQztJQUNwRyxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsS0FBSztRQUNELE9BQU8sK0NBQStDLENBQUE7SUFDMUQsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFHL0UsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLE1BQU0sRUFDWDtnQkFDSSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUEsRUFBRSxHQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDO2dCQUNsSCxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ25CLE9BQU87YUFDVjtZQUNELE1BQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUNwRCxJQUFJLENBQUMsWUFBWSxJQUFJLFlBQVksQ0FBQyxFQUFFLEtBQUssTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQy9EO2dCQUNJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHlEQUF5RCxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQSxFQUFFLEdBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7Z0JBQzNILFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDbkIsT0FBTzthQUNWO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDWjtnQkFDSSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQSxFQUFFLEdBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDbkIsT0FBTzthQUNWO1lBQ0QsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQ2pEO2dCQUNJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHNDQUFzQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQSxFQUFFLEdBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDbkIsT0FBTzthQUNWO1lBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFBLEVBQUUsR0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQztZQUM5RyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkIsT0FBTztRQUNYLENBQUM7S0FBQTtDQUNKO0FBcERELHlCQW9EQyJ9
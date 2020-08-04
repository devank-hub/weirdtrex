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
class resume {
    constructor() {
        this._command = "resume";
        this.aliases = ["res"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "this resumes the music which is paused";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?resume";
    }
    runCommand(args, msgObject, client, ops) {
        return __awaiter(this, void 0, void 0, function* () {
            const voiceChannel = msgObject.member.voice.channel;
            const player = client.music.players.get(msgObject.guild.id);
            if (!player) {
                msgObject.channel.send("No song's currently playing in this guild.")
                    .then(msg => {
                    setTimeout(function () { msg.delete(); }, ms("3s"));
                });
                return;
            }
            if (!msgObject.member.voice.channel) {
                msgObject.channel.send("You need to be in a voice channel to pause music.")
                    .then(msg => {
                    setTimeout(function () { msg.delete(); }, ms("3s"));
                });
                return;
            }
            if (!player.playing) {
                player.playing = false;
                player.pause(player.playing);
                msgObject.channel.send(`Player is now ${player.playing ? "being resumed" : "being paused"}`)
                    .then(msg => {
                    setTimeout(function () { msg.delete(); }, ms("3s"));
                });
            }
            else {
                msgObject.channel.send("song/songs is/are already being played at the moment")
                    .then(msg => {
                    setTimeout(function () { msg.delete(); }, ms("3s"));
                });
            }
            msgObject.delete();
        });
    }
}
exports.default = resume;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL211c2ljL3Jlc3VtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLDZCQUE2QjtBQUU3QixNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFekIsTUFBcUIsTUFBTTtJQUEzQjtRQUVvQixhQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3BCLFlBQU8sR0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLGFBQVEsR0FBWSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLFlBQU8sR0FBYSxJQUFJLENBQUM7SUFzRDdDLENBQUM7SUFwREcsSUFBSTtRQUNBLE9BQU8sd0NBQXdDLENBQUM7SUFDcEQsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUNELEtBQUs7UUFDRCxPQUFPLFNBQVMsQ0FBQTtJQUNwQixDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCLEVBQUUsR0FBUTs7WUFFekYsTUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBRXBELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRTVELElBQUksQ0FBQyxNQUFNLEVBQ1g7Z0JBQ0ksU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsNENBQTRDLENBQUM7cUJBQy9ELElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDUixVQUFVLENBQUMsY0FBWSxHQUF1QixDQUFDLE1BQU0sRUFBRSxDQUFBLENBQUEsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMzRSxDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPO2FBQ1Y7WUFHRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUNuQztnQkFDSSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxtREFBbUQsQ0FBQztxQkFDdEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNSLFVBQVUsQ0FBQyxjQUFZLEdBQXVCLENBQUMsTUFBTSxFQUFFLENBQUEsQ0FBQSxDQUFDLEVBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzNFLENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU87YUFDVjtZQUVELElBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDO2dCQUNmLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUN2QixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDN0IsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLE1BQU0sQ0FBQyxPQUFPLENBQUEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7cUJBQ3RGLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDUixVQUFVLENBQUMsY0FBWSxHQUF1QixDQUFDLE1BQU0sRUFBRSxDQUFBLENBQUEsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMzRSxDQUFDLENBQUMsQ0FBQzthQUNOO2lCQUNEO2dCQUNJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHNEQUFzRCxDQUFDO3FCQUN6RSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ1IsVUFBVSxDQUFDLGNBQVksR0FBdUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQSxDQUFBLENBQUMsRUFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDM0UsQ0FBQyxDQUFDLENBQUM7YUFDTjtZQUNELFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN2QixDQUFDO0tBQUE7Q0FDSjtBQTNERCx5QkEyREMifQ==
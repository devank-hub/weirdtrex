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
class leave {
    constructor() {
        this._command = "leave";
        this.aliases = ["lv"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "this command let bot leave the joined channel";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?leave";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const voiceChannel = msgObject.member;
            const player = client.music.players.get(msgObject.guild.id);
            if (!player) {
                msgObject.channel.send("No song/s currently playing in this guild.").then(msg => { msg.delete({ timeout: 3000 }); });
                msgObject.delete();
                return;
            }
            if (!msgObject.member.voice.channel) {
                msgObject.channel.send("You need to be in a voice channel to use the leave command.").then(msg => { msg.delete({ timeout: 3000 }); });
                msgObject.delete();
                return;
            }
            client.music.players.destroy(msgObject.guild.id);
            msgObject.channel.send("Successfully stopped the music.").then(msg => { msg.delete({ timeout: 3000 }); });
            msgObject.delete();
            return;
        });
    }
}
exports.default = leave;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvbXVzaWMvbGVhdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSw2QkFBNkI7QUFHN0IsTUFBcUIsS0FBSztJQUExQjtRQUVvQixhQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ25CLFlBQU8sR0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLGFBQVEsR0FBWSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLFlBQU8sR0FBYSxJQUFJLENBQUM7SUFxQzdDLENBQUM7SUFuQ0csSUFBSTtRQUNBLE9BQU8sK0NBQStDLENBQUM7SUFDM0QsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUNELEtBQUs7UUFDRCxPQUFPLFFBQVEsQ0FBQTtJQUNuQixDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUUvRSxNQUFNLFlBQVksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO1lBRXRDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRTVELElBQUcsQ0FBQyxNQUFNLEVBQ1Y7Z0JBQ0ksU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsNENBQTRDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQztnQkFDL0csU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7WUFDRCxJQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUNsQztnQkFDSSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyw2REFBNkQsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDO2dCQUNoSSxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ25CLE9BQU87YUFDVjtZQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2pELFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7WUFDcEcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ25CLE9BQU87UUFDWCxDQUFDO0tBQUE7Q0FDSjtBQTFDRCx3QkEwQ0MifQ==
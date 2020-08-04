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
class shutdown {
    constructor() {
        this._command = "shutdown";
        this.aliases = ["sd"];
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
        return "?shutdown";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (msgObject.author.id != "404681937249370123") {
                msgObject.channel.send("You're not the bot the owner!")
                    .then(m => { m.delete({ timeout: 3000 }); });
                return;
            }
            else {
                try {
                    let embed = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setDescription("**Bot is shutting down... and will be up in future as soon as possible**");
                    yield msgObject.channel.send(embed);
                    process.exit();
                }
                catch (e) {
                    msgObject.channel.send(`ERROR: ${e.message}`);
                    return;
                }
            }
        });
    }
}
exports.default = shutdown;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2h1dGRvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvbW9kZXJhdGlvbi9zaHV0ZG93bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0Qyw2QkFBNkI7QUFHN0IsTUFBcUIsUUFBUTtJQUE3QjtRQUVvQixhQUFRLEdBQUcsVUFBVSxDQUFDO1FBQ3RCLFlBQU8sR0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLGFBQVEsR0FBWSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLFlBQU8sR0FBYSxJQUFJLENBQUM7SUFzQzdDLENBQUM7SUFwQ0csSUFBSTtRQUNBLE9BQU8sc0VBQXNFLENBQUM7SUFDbEYsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUNELEtBQUs7UUFDRCxPQUFPLFdBQVcsQ0FBQTtJQUN0QixDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUUvRSxJQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLG9CQUFvQixFQUM5QztnQkFDSSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQztxQkFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLE9BQU87YUFDWDtpQkFFRDtnQkFDSSxJQUNBO29CQUNJLElBQUksS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTt5QkFDakMsUUFBUSxDQUFDLEtBQUssQ0FBQzt5QkFDZixjQUFjLENBQUMsMEVBQTBFLENBQUMsQ0FBQTtvQkFDL0YsTUFBTSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDcEMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFBO2lCQUNqQjtnQkFDRCxPQUFNLENBQUMsRUFDUDtvQkFDSSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUM5QyxPQUFPO2lCQUNWO2FBQ0o7UUFDTCxDQUFDO0tBQUE7Q0FDSjtBQTNDRCwyQkEyQ0MifQ==
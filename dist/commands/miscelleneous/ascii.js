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
class ascii {
    constructor() {
        this._command = "ascii";
        this.aliases = ["as"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "this command change the given key-words into a SPECIALIZED one XD";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?ascii <keywords>";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args[0]) {
                msgObject.channel.send("Please give a word or line to generate the output")
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                msgObject.delete();
                return;
            }
            else {
                msgObject.channel.send("Generating . . .")
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                const ascii = require('ascii-art');
                ascii.font(args.join(' '), 'Doom', function (err, rendered) {
                    rendered = rendered.trimRight();
                    if (rendered.length > 2000) {
                        msgObject.channel.send("Sorry the message is too wrong");
                        return;
                    }
                    else if (msgObject.guild.channels.cache.find(channel => channel.name === "ascii-arts")) {
                        let cchannel = msgObject.guild.channels.cache.find(channel => channel.name === "ascii-arts");
                        cchannel.send(rendered, {
                            code: 'md'
                        });
                    }
                    else {
                        msgObject.channel.send(rendered, {
                            code: 'md'
                        });
                    }
                });
                msgObject.delete();
                return;
            }
        });
    }
}
exports.default = ascii;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNjaWkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvbWlzY2VsbGVuZW91cy9hc2NpaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDZCQUE2QjtBQUc3QixNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFekIsTUFBcUIsS0FBSztJQUExQjtRQUVvQixhQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ25CLFlBQU8sR0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLGFBQVEsR0FBWSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLFlBQU8sR0FBYSxJQUFJLENBQUM7SUF3RDdDLENBQUM7SUF0REcsSUFBSTtRQUNBLE9BQU8sbUVBQW1FLENBQUM7SUFDL0UsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUVELEtBQUs7UUFDRCxPQUFPLG1CQUFtQixDQUFBO0lBQzlCLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBRTlFLElBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1g7Z0JBQ0ksU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsbURBQW1ELENBQUM7cUJBQ3ZFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ25CLE9BQU87YUFDVDtpQkFFRDtnQkFDRyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztxQkFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDbkMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFTLEdBQVcsRUFBRSxRQUFnQjtvQkFFckUsUUFBUSxHQUFHLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFFaEMsSUFBRyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksRUFDekI7d0JBQ0ksU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQzt3QkFDekQsT0FBTztxQkFDVjt5QkFDSSxJQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQyxFQUNyRjt3QkFDSSxJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxZQUFZLENBQUMsQ0FBQzt3QkFFN0YsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7NEJBQ3BCLElBQUksRUFBRSxJQUFJO3lCQUNiLENBQUMsQ0FBQztxQkFDTjt5QkFFRDt3QkFDSSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7NEJBQzdCLElBQUksRUFBRSxJQUFJO3lCQUNiLENBQUMsQ0FBQztxQkFDTjtnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDSCxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ25CLE9BQU87YUFDVjtRQUNMLENBQUM7S0FBQTtDQUNKO0FBN0RELHdCQTZEQyJ9
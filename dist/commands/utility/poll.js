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
const ms = require("ms");
class poll {
    constructor() {
        this._command = "poll";
        this.aliases = ["pl"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "this command is used to create polls";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?poll <question>";
    }
    runCommand(args, msgObject, client, tools) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!msgObject.member.hasPermission(['ADMINISTRATOR', 'MANAGE_MESSAGES'])) {
                msgObject.channel.send("This requires the permission: Administrator")
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                msgObject.delete();
                return;
            }
            else {
                if (!args[0]) {
                    msgObject.channel.send("Please give a question or statement for starting the polling")
                        .then(msg => { msg.delete({ timeout: 3000 }); });
                    msgObject.delete();
                    return;
                }
                else {
                    const embed = new Discord.MessageEmbed()
                        .setColor(0xffffff)
                        .setFooter('React to vote')
                        .setDescription(args.join(' '))
                        .setTitle(`Poll created by: ${msgObject.author.username}`);
                    if (msgObject.guild.channels.cache.find(c => c.name === "suggestions")) {
                        let msg = yield msgObject.channel.send(embed);
                        yield msg.react('👍');
                        yield msg.react('👎');
                        yield msg.react('🤷');
                        msgObject.delete();
                        return;
                    }
                    else {
                        let msg = yield msgObject.channel.send(embed);
                        yield msg.react('👍');
                        yield msg.react('👎');
                        yield msg.react('🤷');
                        msgObject.delete();
                        return;
                    }
                }
            }
        });
    }
}
exports.default = poll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9sbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy91dGlsaXR5L3BvbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsNkJBQTZCO0FBRTdCLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixNQUFxQixJQUFJO0lBQXpCO1FBRW9CLGFBQVEsR0FBRyxNQUFNLENBQUM7UUFDbEIsWUFBTyxHQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsYUFBUSxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsWUFBTyxHQUFhLElBQUksQ0FBQztJQXlFN0MsQ0FBQztJQXZFRyxJQUFJO1FBQ0EsT0FBTyxzQ0FBc0MsQ0FBQztJQUNsRCxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRUQsS0FBSztRQUNELE9BQU8sa0JBQWtCLENBQUE7SUFDN0IsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQixFQUFFLEtBQVM7O1lBTTFGLElBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLGVBQWUsRUFBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQ3ZFO2dCQUNJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDZDQUE2QyxDQUFDO3FCQUNoRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQztnQkFDL0MsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7aUJBRUQ7Z0JBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDWDtvQkFDSSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyw4REFBOEQsQ0FBQzt5QkFDakYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7b0JBQy9DLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDbkIsT0FBTztpQkFDVjtxQkFFRDtvQkFFSSxNQUFNLEtBQUssR0FBRyxJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7eUJBQ25DLFFBQVEsQ0FBQyxRQUFRLENBQUM7eUJBQ2xCLFNBQVMsQ0FBQyxlQUFlLENBQUM7eUJBQzFCLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3lCQUM5QixRQUFRLENBQUMsb0JBQW9CLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFHL0QsSUFBRyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxhQUFhLENBQUMsRUFDcEU7d0JBQ0ksSUFBSSxHQUFHLEdBQUcsTUFBTSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFHOUMsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN0QixNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3RCLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFFdEIsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO3dCQUNuQixPQUFPO3FCQUNWO3lCQUVEO3dCQUNJLElBQUksR0FBRyxHQUFHLE1BQU0sU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBRzlDLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDdEIsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN0QixNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBRXRCLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzt3QkFDbkIsT0FBTztxQkFDVjtpQkFDSjthQUNKO1FBQ0wsQ0FBQztLQUFBO0NBQ0o7QUE5RUQsdUJBOEVDIn0=
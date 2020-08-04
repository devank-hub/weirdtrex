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
class ban {
    constructor() {
        this._command = "ban";
        this.aliases = ["b"];
        this.category = path.basename(__dirname);
        this.display = true;
        this.newProperty = 0;
    }
    help() {
        return "Admin only-Bans the mentioned user from the server";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?ban <member>";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            let mentionedUser = msgObject.mentions.users.first();
            let suppliedReason = args.slice(1).join(" ");
            if (!suppliedReason)
                suppliedReason = "hey,he/she deserve it";
            if (!msgObject.member.hasPermission(["ADMINISTRATOR", "BAN_MEMBERS"])) {
                msgObject.channel.send(`Nice try ${msgObject.author.username}, but you dont have the permission to ban other users!`)
                    .then(msg => {
                    setTimeout(function () { msg.delete(); }, ms("5s"));
                });
                msgObject.delete();
                return;
            }
            else {
                if (!mentionedUser) {
                    msgObject.channel.send(`Sorry ${msgObject.author.username}, I could not find that user to ban`)
                        .then(msg => {
                        setTimeout(function () { msg.delete(); }, ms("5s"));
                    });
                    msgObject.delete();
                    return;
                }
                else {
                    msgObject.guild.member(mentionedUser.id).ban({ reason: suppliedReason });
                    let embed = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setAuthor(`${msgObject.guild.name} Modlogs`, `${msgObject.guild.iconURL()}`)
                        .addField("Moderation:", "ban")
                        .addField("Member:", mentionedUser.username)
                        .addField("Moderator:", msgObject.author.username)
                        .addField("Reason:", suppliedReason)
                        .addField("Date:", msgObject.createdAt.toLocaleString());
                    let sChannel = msgObject.guild.channels.cache.find(c => c.name === "mod-logs");
                    sChannel.send(embed);
                    msgObject.delete();
                }
            }
        });
    }
}
exports.default = ban;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL21vZGVyYXRpb24vYmFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBQ3RDLDZCQUE2QjtBQUU3QixNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekIsTUFBcUIsR0FBRztJQUF4QjtRQUVvQixhQUFRLEdBQUcsS0FBSyxDQUFBO1FBQ2hCLFlBQU8sR0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLGFBQVEsR0FBWSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLFlBQU8sR0FBYSxJQUFJLENBQUM7UUFFeEIsZ0JBQVcsR0FBRyxDQUFDLENBQUM7SUE4RHJDLENBQUM7SUE1REcsSUFBSTtRQUNBLE9BQU8sb0RBQW9ELENBQUM7SUFDaEUsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUVELEtBQUs7UUFDRCxPQUFPLGVBQWUsQ0FBQTtJQUMxQixDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUcvRSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNyRCxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QyxJQUFHLENBQUMsY0FBYztnQkFDVixjQUFjLEdBQUcsdUJBQXVCLENBQUM7WUFFakQsSUFBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQyxDQUFDLEVBQ3BFO2dCQUNJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLHdEQUF3RCxDQUFDO3FCQUNoSCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ1IsVUFBVSxDQUFDLGNBQVksR0FBdUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQSxDQUFBLENBQUMsRUFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdkUsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7aUJBRUQ7Z0JBQ0ksSUFBRyxDQUFDLGFBQWEsRUFDakI7b0JBQ0ksU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEscUNBQXFDLENBQUM7eUJBQzFGLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDUixVQUFVLENBQUMsY0FBWSxHQUF1QixDQUFDLE1BQU0sRUFBRSxDQUFBLENBQUEsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUN2RSxDQUFDLENBQUMsQ0FBQztvQkFDUCxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ25CLE9BQU87aUJBQ1Y7cUJBRUQ7b0JBQ0ksU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO29CQUN6RSxJQUFJLEtBQUssR0FBRyxJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7eUJBQ2pDLFFBQVEsQ0FBQyxLQUFLLENBQUM7eUJBQ2YsU0FBUyxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLFVBQVUsRUFBRSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQzt5QkFDNUUsUUFBUSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUM7eUJBQzlCLFFBQVEsQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLFFBQVEsQ0FBQzt5QkFDM0MsUUFBUSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQzt5QkFDakQsUUFBUSxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUM7eUJBQ25DLFFBQVEsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFBO29CQUU1RCxJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsQ0FBQztvQkFFL0UsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDckIsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUN0QjthQUNKO1FBQ0wsQ0FBQztLQUFBO0NBRUo7QUFyRUQsc0JBcUVDIn0=
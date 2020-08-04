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
class kick {
    constructor() {
        this._command = "kick";
        this.aliases = ["k"];
        this.category = path.basename(__dirname);
        this.display = true;
        this.newProperty = 0;
    }
    help() {
        return "Admin only-kicks the mentioned user from the server";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?kick <member>";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            let mentionedUser = msgObject.mentions.users.first();
            let suppliedReason = args.slice(1).join(" ");
            if (!suppliedReason) {
                suppliedReason = "he/she deserves it";
            }
            if (!msgObject.member.hasPermission("ADMINISTRATOR")) {
                msgObject.channel.send(`Nice try ${msgObject.author.username}, but you dont have the permission to kick other users!`)
                    .then(msg => {
                    setTimeout(function () { msg.delete(); }, ms("5s"));
                });
                msgObject.delete();
            }
            else {
                if (!mentionedUser) {
                    msgObject.channel.send(`Sorry ${msgObject.author.username}, I could not find that user to kick`)
                        .then(msg => {
                        setTimeout(function () { msg.delete(); }, ms("5s"));
                    });
                    msgObject.delete();
                }
                else {
                    msgObject.guild.member(mentionedUser).kick(suppliedReason);
                    let embed = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setAuthor(`${msgObject.guild.name} Modlogs`, `${msgObject.guild.iconURL()}`)
                        .addField("Moderation:", "kick")
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
exports.default = kick;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2ljay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9tb2RlcmF0aW9uL2tpY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsNkJBQTZCO0FBRTdCLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixNQUFxQixJQUFJO0lBQXpCO1FBRW9CLGFBQVEsR0FBRyxNQUFNLENBQUM7UUFDbEIsWUFBTyxHQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0IsYUFBUSxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsWUFBTyxHQUFhLElBQUksQ0FBQztRQUV4QixnQkFBVyxHQUFHLENBQUMsQ0FBQztJQTBEckMsQ0FBQztJQXhERyxJQUFJO1FBQ0EsT0FBTyxxREFBcUQsQ0FBQztJQUNqRSxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsS0FBSztRQUNELE9BQU8sZ0JBQWdCLENBQUE7SUFDM0IsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFHL0UsSUFBSSxhQUFhLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDckQsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFN0MsSUFBRyxDQUFDLGNBQWMsRUFDbEI7Z0JBQ0ksY0FBYyxHQUFHLG9CQUFvQixDQUFBO2FBQ3hDO1lBRUQsSUFBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxFQUFDO2dCQUNoRCxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSx5REFBeUQsQ0FBQztxQkFDakgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNSLFVBQVUsQ0FBQyxjQUFZLEdBQXVCLENBQUMsTUFBTSxFQUFFLENBQUEsQ0FBQSxDQUFDLEVBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZFLENBQUMsQ0FBQyxDQUFDO2dCQUNILFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUMxQjtpQkFDRztnQkFDQSxJQUFHLENBQUMsYUFBYSxFQUFDO29CQUNkLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLHNDQUFzQyxDQUFDO3lCQUMzRixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ1IsVUFBVSxDQUFDLGNBQVksR0FBdUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQSxDQUFBLENBQUMsRUFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDdkUsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUMxQjtxQkFFRDtvQkFDSSxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQzNELElBQUksS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTt5QkFDakMsUUFBUSxDQUFDLEtBQUssQ0FBQzt5QkFDZixTQUFTLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksVUFBVSxFQUFFLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO3lCQUM1RSxRQUFRLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQzt5QkFDL0IsUUFBUSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsUUFBUSxDQUFDO3lCQUMzQyxRQUFRLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO3lCQUNqRCxRQUFRLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQzt5QkFDbkMsUUFBUSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUE7b0JBRTVELElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxDQUFDO29CQUUvRSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNyQixTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7aUJBQ3RCO2FBQ0o7UUFDTCxDQUFDO0tBQUE7Q0FDSjtBQWpFRCx1QkFpRUMifQ==
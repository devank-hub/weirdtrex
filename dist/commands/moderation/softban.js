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
class softban {
    constructor() {
        this._command = "softban";
        this.aliases = ["sb", "sban"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "Admin/Mod/Managers-this command bans a person for a given(optional) limited time";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?softban <member> (time) (reason)";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            let mentionedUser = msgObject.mentions.users.first();
            let suppliedReason = args.slice(2).join(" ");
            if (!suppliedReason)
                suppliedReason = "hey,he/she deserve it";
            let time = args[1];
            if (!time)
                time = "1d";
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
                    let mentionedid = mentionedUser.id;
                    msgObject.guild.member(mentionedid).ban({ reason: suppliedReason });
                    let embed = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setAuthor(`${msgObject.guild.name} Modlogs`, `${msgObject.guild.iconURL()}`)
                        .addField("Moderation:", "ban")
                        .addField("Mutee:", mentionedUser.username)
                        .addField("Moderator:", msgObject.author.username)
                        .addField("Reason:", suppliedReason)
                        .addField("Date:", msgObject.createdAt.toLocaleString());
                    let sChannel = msgObject.guild.channels.cache.find(c => c.name === "mod-logs");
                    sChannel.send(embed);
                    msgObject.delete();
                }
                setTimeout(function () {
                    let mentionedid = mentionedUser.id;
                    msgObject.guild.members.unban(mentionedid);
                    let cembed = new Discord.MessageEmbed()
                        .setDescription(`**this member is being unbanned from ${msgObject.guild.name} : ${mentionedUser.username}**`);
                    let rChannel = msgObject.guild.channels.cache.find(r => r.name === "mod-logs");
                    rChannel.send(cembed);
                }, ms(time));
            }
        });
    }
}
exports.default = softban;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29mdGJhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9tb2RlcmF0aW9uL3NvZnRiYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsNkJBQTZCO0FBRTdCLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixNQUFxQixPQUFPO0lBQTVCO1FBRW9CLGFBQVEsR0FBRyxTQUFTLENBQUM7UUFDckIsWUFBTyxHQUFjLENBQUMsSUFBSSxFQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25DLGFBQVEsR0FBWSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLFlBQU8sR0FBYSxJQUFJLENBQUM7SUF1RTdDLENBQUM7SUFyRUcsSUFBSTtRQUNBLE9BQU8sa0ZBQWtGLENBQUM7SUFDOUYsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUNELEtBQUs7UUFDRCxPQUFPLG1DQUFtQyxDQUFBO0lBQzlDLENBQUM7SUFDSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBRzlFLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3JELElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdDLElBQUcsQ0FBQyxjQUFjO2dCQUNWLGNBQWMsR0FBRyx1QkFBdUIsQ0FBQztZQUNqRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBRyxDQUFDLElBQUk7Z0JBQ0osSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFHLENB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
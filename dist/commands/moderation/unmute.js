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
class unmute {
    constructor() {
        this._command = "unmute";
        this.aliases = ["umt"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "this command instantly unmutes the muted person";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?unmute <member> (reason)";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!msgObject.member.hasPermission("MANAGE_ROLES") || !msgObject.guild.owner) {
                msgObject.channel.send("You dont have permission to use this command.")
                    .then(msg => {
                    setTimeout(function () { msg.delete(); }, ms("5s"));
                });
                msgObject.delete();
                return;
            }
            else if (!msgObject.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) {
                msgObject.channel.send("I don't have permission to add roles!")
                    .then(msg => {
                    setTimeout(function () { msg.delete(); }, ms("5s"));
                });
                msgObject.delete();
                return;
            }
            else {
                let mutee = msgObject.mentions.members.first() || msgObject.guild.members.cache.get(args[0]);
                if (!mutee) {
                    msgObject.channel.send("Please supply a valid user to be unmuted!")
                        .then(msg => {
                        setTimeout(function () { msg.delete(); }, ms("5s"));
                    });
                    msgObject.delete();
                    return;
                }
                else {
                    let reason = args.slice(1).join(" ");
                    if (!reason)
                        reason = "No reason given";
                    let muterole = msgObject.guild.roles.cache.find(r => r.name === "Muted");
                    if (!muterole) {
                        msgObject.channel.send("There is no mute role to remove!")
                            .then(msg => {
                            setTimeout(function () { msg.delete(); }, ms("5s"));
                        });
                        msgObject.delete();
                        return;
                    }
                    else {
                        mutee.roles.remove(muterole);
                        let member = msgObject.guild.roles.cache.find(member => member.name === "member");
                        mutee.roles.add(member);
                        mutee.send(`Hello, you have been unmuted in ${msgObject.guild.name} for: ${reason}`);
                        msgObject.channel.send(`${mutee.user.username} is unmuted!`)
                            .then(msg => {
                            setTimeout(function () { msg.delete(); }, ms("5s"));
                        });
                        msgObject.delete();
                    }
                    let embed = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setAuthor(`${msgObject.guild.name} Modlogs`, `${msgObject.guild.iconURL()}`)
                        .addField("Moderation:", "unmute")
                        .addField("Muted:", mutee.user.username)
                        .addField("Moderator:", msgObject.author.username)
                        .addField("Reason:", reason)
                        .addField("Date:", msgObject.createdAt.toLocaleString());
                    let sChannel = msgObject.guild.channels.cache.find(c => c.name === "mod-logs");
                    sChannel.send(embed);
                }
            }
        });
    }
}
exports.default = unmute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5tdXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL21vZGVyYXRpb24vdW5tdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBQ3RDLDZCQUE2QjtBQUU3QixNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFekIsTUFBcUIsTUFBTTtJQUEzQjtRQUVvQixhQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3BCLFlBQU8sR0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLGFBQVEsR0FBWSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLFlBQU8sR0FBYSxJQUFJLENBQUM7SUE2RjdDLENBQUM7SUEzRkcsSUFBSTtRQUNBLE9BQU8saURBQWlELENBQUM7SUFDN0QsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUVELEtBQUs7UUFDRCxPQUFPLDJCQUEyQixDQUFBO0lBQ3RDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBRy9FLElBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUM1RTtnQkFDSSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQywrQ0FBK0MsQ0FBQztxQkFDbEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNSLFVBQVUsQ0FBQyxjQUFZLEdBQXVCLENBQUMsTUFBTSxFQUFFLENBQUEsQ0FBQSxDQUFDLEVBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzNFLENBQUMsQ0FBQyxDQUFDO2dCQUNILFNBQVMsQ0FBQyxNQUFNLEVB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
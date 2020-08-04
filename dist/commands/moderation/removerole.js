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
class removerole {
    constructor() {
        this._command = "removerole";
        this.aliases = ["rmvr"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "this command removes role from the mentioned member";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?removerole <member> <role> <reason>";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!msgObject.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) {
                msgObject.channel.send("You dont have permission to perform this command!")
                    .then(msg => {
                    setTimeout(function () { msg.delete(); }, ms("5s"));
                });
                msgObject.delete();
                return;
            }
            else {
                let rMember = msgObject.mentions.members.first() || msgObject.guild.members.cache.find(m => m.user.tag === args[0]) || msgObject.guild.members.cache.get(args[0]);
                if (!rMember) {
                    msgObject.channel.send("Please provide a member to remove a role.")
                        .then(msg => {
                        setTimeout(function () { msg.delete(); }, ms("5s"));
                    });
                    msgObject.delete();
                    return;
                }
                else {
                    let role = msgObject.guild.roles.cache.find(r => r.name == args[1]) || msgObject.guild.roles.cache.find(r => r.id == args[1]) || msgObject.mentions.roles.first();
                    if (!role) {
                        msgObject.channel.send("Please provide a valid role to remove from said member.")
                            .then(msg => {
                            setTimeout(function () { msg.delete(); }, ms("5s"));
                        });
                        msgObject.delete();
                        return;
                    }
                    else {
                        let reason = args.slice(2).join(" ");
                        if (!reason) {
                            msgObject.channel.send("Please provide a valid reason for removing role fron the member")
                                .then(msg => {
                                setTimeout(function () { msg.delete(); }, ms("5s"));
                            });
                            msgObject.delete();
                            return;
                        }
                        else {
                            if (!msgObject.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) {
                                msgObject.channel.send("I don't have permission to perform this command.")
                                    .then(msg => {
                                    setTimeout(function () { msg.delete(); }, ms("5s"));
                                });
                                msgObject.delete();
                                return;
                            }
                            else {
                                if (!rMember.roles.cache.has(role.id)) {
                                    msgObject.channel.send(`${rMember.displayName}, doesn't have the role!`)
                                        .then(msg => {
                                        setTimeout(function () { msg.delete(); }, ms("5s"));
                                    });
                                    msgObject.delete();
                                    return;
                                }
                                else {
                                    yield rMember.roles.remove(role.id).catch(e => console.log(e.message));
                                    msgObject.channel.send(`The role, **${role.name}**, has been removed from **${rMember.user}**.`)
                                        .then(msg => {
                                        setTimeout(function () { msg.delete(); }, ms("5s"));
                                    });
                                    msgObject.delete();
                                }
                                let embed = new Discord.MessageEmbed()
                                    .setColor("RANDOM")
                                    .setAuthor(`${msgObject.guild.name} Modlogs`, msgObject.guild.iconURL())
                                    .addField("Moderation:", "Remove role")
                                    .addField("Member:", rMember.user.username)
                                    .addField("Moderator:", msgObject.author.username)
                                    .addField("Reason:", reason)
                                    .addField("Date:", msgObject.createdAt.toLocaleString());
                                let sChannel = msgObject.guild.channels.cache.find(c => c.name === "mod-logs");
                                sChannel.send(embed);
                            }
                        }
                    }
                }
            }
        });
    }
}
exports.default = removerole;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3Zlcm9sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9tb2RlcmF0aW9uL3JlbW92ZXJvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsNkJBQTZCO0FBRTdCLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixNQUFxQixVQUFVO0lBQS9CO1FBRW9CLGFBQVEsR0FBRyxZQUFZLENBQUM7UUFDeEIsWUFBTyxHQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUIsYUFBUSxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsWUFBTyxHQUFhLElBQUksQ0FBQztJQTBHN0MsQ0FBQztJQXhHRyxJQUFJO1FBQ0EsT0FBTyxxREFBcUQsQ0FBQztJQUNqRSxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsS0FBSztRQUNELE9BQU8sc0NBQXNDLENBQUE7SUFDakQsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFFL0UsSUFBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDLEVBQ3JFO2dCQUNJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG1EQUFtRCxDQUFDO3FCQUN0RSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ1IsVUFBVSxDQUFDLGNBQVksR0FBdUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQSxDQUFBLENBQUMsRUFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdkUsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFD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
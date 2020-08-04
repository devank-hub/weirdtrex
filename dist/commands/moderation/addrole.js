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
class addrole {
    constructor() {
        this._command = "addrole";
        this.aliases = ["ar"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "this command adds role to the mentioned member given reason";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?addrole <member> <role> <reason>";
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
            else if (!msgObject.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) {
                msgObject.channel.send("I don't have permission to perform this command.")
                    .then(msg => {
                    setTimeout(function () { msg.delete(); }, ms("5s"));
                });
                msgObject.delete();
                return;
            }
            else {
                let rMember = msgObject.mentions.members.first() || msgObject.guild.members.cache.find(m => m.user.tag === args[0]) || msgObject.guild.members.cache.get(args[0]);
                if (!rMember) {
                    msgObject.channel.send("Please provide a valid member to add a role too.")
                        .then(msg => {
                        setTimeout(function () { msg.delete(); }, ms("5s"));
                    });
                    msgObject.delete();
                    return;
                }
                else {
                    let role = msgObject.guild.roles.cache.find(r => r.name == args[1]) || msgObject.guild.roles.cache.find(r => r.id == args[1]) || msgObject.mentions.roles.first();
                    if (!role) {
                        msgObject.channel.send("Please provide a valid role to add to said user.")
                            .then(msg => {
                            setTimeout(function () { msg.delete(); }, ms("5s"));
                        });
                        msgObject.delete();
                        return;
                    }
                    else {
                        let reason = args.slice(2).join(" ");
                        if (!reason) {
                            msgObject.channel.send("Please provide a reason")
                                .then(msg => {
                                setTimeout(function () { msg.delete(); }, ms("5s"));
                            });
                            msgObject.delete();
                            return;
                        }
                        else {
                            if (rMember.roles.cache.has(role.id)) {
                                msgObject.channel.send(`${rMember.displayName}, already has the role!`)
                                    .then(msg => {
                                    setTimeout(function () { msg.delete(); }, ms("5s"));
                                });
                                msgObject.delete();
                                return;
                            }
                            else {
                                yield rMember.roles.add(role.id).catch(e => console.log(e.message));
                                msgObject.channel.send(`The role, **${role.name}**, has been added to **${rMember.user}**.`)
                                    .then(msg => {
                                    setTimeout(function () { msg.delete(); }, ms("5s"));
                                });
                                msgObject.delete();
                            }
                            let embed = new Discord.MessageEmbed()
                                .setColor("RANDOM")
                                .setAuthor(`${msgObject.guild.name} Modlogs`, msgObject.guild.iconURL())
                                .addField("Moderation:", "Add role")
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
        });
    }
}
exports.default = addrole;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcm9sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9tb2RlcmF0aW9uL2FkZHJvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsNkJBQTZCO0FBRTdCLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixNQUFxQixPQUFPO0lBQTVCO1FBRW9CLGFBQVEsR0FBRyxTQUFTLENBQUM7UUFDckIsWUFBTyxHQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsYUFBUSxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsWUFBTyxHQUFhLElBQUksQ0FBQztJQXlHN0MsQ0FBQztJQXZHRyxJQUFJO1FBQ0EsT0FBTyw2REFBNkQsQ0FBQztJQUN6RSxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsS0FBSztRQUNELE9BQU8sbUNBQW1DLENBQUE7SUFDOUMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFFL0UsSUFBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDLEVBQ3JFO2dCQUNJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG1EQUFtRCxDQUFDO3FCQUN0RSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ1IsVUFBVSxDQUFDLGNBQVksR0FBdUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQSxDQUFBLENBQUMsRUFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdkUsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNu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
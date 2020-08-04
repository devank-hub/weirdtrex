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
class mute {
    constructor() {
        this._command = "mute";
        this.aliases = ["mt"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "Admin/Mod/Manager only-this command mutes the mentioned person for a given limited time or by default time is 2 hours\ninput - ?mute time member reason, if dont wanna give time then give a space in between member and reason(can be empty) like this ?mute member <space> reason";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?mute <member> (time) (reason)";
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
                    msgObject.channel.send("Please supply a user to be muted!")
                        .then(msg => {
                        setTimeout(function () { msg.delete(); }, ms("5s"));
                    });
                    msgObject.delete();
                    return;
                }
                else {
                    let reason = args.slice(2).join(" ");
                    let time = args[1];
                    if (!time)
                        time = "2h";
                    if (!reason)
                        reason = "No reason given";
                    let muterole = msgObject.guild.roles.cache.find(r => r.name === "Muted");
                    if (!muterole) {
                        try {
                            let muterole = yield msgObject.guild.roles.create({
                                data: {
                                    name: "Muted",
                                    color: "RED",
                                    permissions: 0
                                },
                                reason: "Need a role for muted members",
                            });
                            msgObject.guild.channels.cache.forEach((channel, id) => __awaiter(this, void 0, void 0, function* () {
                                yield channel.updateOverwrite(muterole, {
                                    SEND_MESSAGES: false,
                                    ADD_REACTIONS: false,
                                    SEND_TTS_MESSAGES: false,
                                    ATTACH_FILES: false,
                                    SPEAK: false,
                                    ADMINISTRATOR: false,
                                    MANAGE_ROLES: false,
                                    USE_EXTERNAL_EMOJIS: false,
                                    EMBED_LINKS: false,
                                    MANAGE_MESSAGES: false,
                                    MANAGE_WEBHOOKS: false,
                                });
                            }));
                        }
                        catch (e) {
                            console.log(e.stack);
                        }
                    }
                    let roleList = mutee.roles.cache;
                    mutee.roles.set([]);
                    mutee.roles.add(muterole);
                    mutee.send(`Hello, you have been muted in ${msgObject.guild.name} for: ${reason}`);
                    msgObject.channel.send(`${mutee.user.username} was successfully muted.`)
                        .then(msg => {
                        setTimeout(function () { msg.delete(); }, ms("5s"));
                    });
                    msgObject.delete();
                    let embed = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setAuthor(`${msgObject.guild.name} Modlogs`, `${msgObject.guild.iconURL()}`)
                        .addField("Moderation:", "mute")
                        .addField("Muted:", mutee.user.username)
                        .addField("Moderator:", msgObject.author.username)
                        .addField("Reason:", reason)
                        .addField("Date:", msgObject.createdAt.toLocaleString())
                        .addField("Duration", `${time}`);
                    let sChannel = msgObject.guild.channels.cache.find(c => c.name === "mod-logs");
                    sChannel.send(embed);
                    setTimeout(function () {
                        mutee.roles.set(roleList);
                        mutee.roles.remove(muterole);
                        msgObject.channel.send(`${mutee.user.username} is unmuted now after ${time}`)
                            .then(msg => {
                            setTimeout(function () { msg.delete(); }, ms("5s"));
                        });
                    }, ms(time));
                }
            }
        });
    }
}
exports.default = mute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXV0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9tb2RlcmF0aW9uL211dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsNkJBQTZCO0FBRTdCLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixNQUFxQixJQUFJO0lBQXpCO1FBRW9CLGFBQVEsR0FBRyxNQUFNLENBQUM7UUFDbEIsWUFBTyxHQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsYUFBUSxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsWUFBTyxHQUFhLElBQUksQ0FBQztJQXVIN0MsQ0FBQztJQXJIRyxJQUFJO1FBQ0EsT0FBTyxxUkFBcVIsQ0FBQztJQUNqUyxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsS0FBSztRQUNELE9BQU8sZ0NBQWdDLENBQUE7SUFDM0MsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFHL0UsSUFBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7Z0JBQzFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLCtDQUErQyxDQUFDO3FCQUNsRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ1IsVUFBVSxDQUFDLGNBQVksR0FBdUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQSxDQUFBLENBQUMsRUFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdkUsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsU0FBUyxDQUFDLE1BQU0sRUFBRSxD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
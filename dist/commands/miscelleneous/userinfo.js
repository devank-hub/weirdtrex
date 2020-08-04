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
class userinfo {
    constructor() {
        this._command = "userinfo";
        this.aliases = ["ui", "usr", "user", "uinfo"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "this command shows server's information";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?userinfo <member>";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            let mentionedUser = msgObject.mentions.members.first();
            if (!mentionedUser) {
                msgObject.channel.send("Please provide a valid mentioned user to find his/her details")
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                msgObject.delete();
                return;
            }
            else {
                const moment = require('moment');
                let uEmbed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle(`${mentionedUser}'s Info`)
                    .setThumbnail(`${mentionedUser.user.displayAvatarURL()}`)
                    .setAuthor(`${mentionedUser.user.username} Info`, `${mentionedUser.user.displayAvatarURL()}`)
                    .addField("**Username:**", `${mentionedUser.user.username}`, true)
                    .addField("**Discriminator:**", `${mentionedUser.user.discriminator}`, true)
                    .addField("**ID:**", `${mentionedUser.id}`, true)
                    .addField("**Status:**", `${mentionedUser.presence.status}`, true)
                    .addField("**Created At:**", `${mentionedUser.user.createdAt}`, true)
                    .addField("**Roles:**", `${mentionedUser.roles.cache.map(r => r.name)}`)
                    .addField("**Guild joined on:**", `${mentionedUser.guild.joinedAt}`, true)
                    .setFooter(`WeirdTrex |`, `${client.user.displayAvatarURL()}`);
                msgObject.channel.send(uEmbed).then(msg => msg.delete({ timeout: 10000 }));
                msgObject.delete();
                return;
            }
        });
    }
}
exports.default = userinfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcmluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvbWlzY2VsbGVuZW91cy91c2VyaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0Qyw2QkFBNkI7QUFFN0IsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXpCLE1BQXFCLFFBQVE7SUFBN0I7UUFFb0IsYUFBUSxHQUFHLFVBQVUsQ0FBQztRQUN0QixZQUFPLEdBQWMsQ0FBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxhQUFRLEdBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QyxZQUFPLEdBQWEsSUFBSSxDQUFDO0lBNEM3QyxDQUFDO0lBMUNHLElBQUk7UUFDQSxPQUFPLHlDQUF5QyxDQUFDO0lBQ3JELENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFDRCxLQUFLO1FBQ0QsT0FBTyxvQkFBb0IsQ0FBQTtJQUMvQixDQUFDO0lBQ0ssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUUvRSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN2RCxJQUFHLENBQUMsYUFBYSxFQUNqQjtnQkFDSSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQywrREFBK0QsQ0FBQztxQkFDbEYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDbkIsT0FBTzthQUNWO2lCQUVEO2dCQUNJLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDakMsSUFBSSxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFO3FCQUNsQyxRQUFRLENBQUMsS0FBSyxDQUFDO3FCQUNmLFFBQVEsQ0FBQyxHQUFHLGFBQWEsU0FBUyxDQUFDO3FCQUNuQyxZQUFZLENBQUMsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQztxQkFDeEQsU0FBUyxDQUFDLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLE9BQU8sRUFBRSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDO3FCQUM1RixRQUFRLENBQUMsZUFBZSxFQUFFLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUM7cUJBQ2pFLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUUsSUFBSSxDQUFDO3FCQUMzRSxRQUFRLENBQUMsU0FBUyxFQUFFLEdBQUcsYUFBYSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQztxQkFDaEQsUUFBUSxDQUFDLGFBQWEsRUFBRSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxDQUFDO3FCQUNqRSxRQUFRLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksQ0FBQztxQkFDcEUsUUFBUSxDQUFDLFlBQVksRUFBRSxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO3FCQUN2RSxRQUFRLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFDLElBQUksQ0FBQztxQkFDeEUsU0FBUyxDQUFDLGFBQWEsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLENBQUE7Z0JBRWxFLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6RSxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ25CLE9BQU87YUFDVjtRQUNMLENBQUM7S0FBQTtDQUNKO0FBakRELDJCQWlEQyJ9
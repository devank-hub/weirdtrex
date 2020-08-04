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
const fetch = require("node-fetch");
class apec {
    constructor() {
        this._command = "apec";
        this.aliases = [];
        this.category = path.basename(__dirname);
        this.display = false;
    }
    help() {
        return "this command shows apex legends profile details(only pc platform)";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?apec <apex origin username>";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args[0]) {
                msgObject.channel.send("Please supply username and try again")
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                msgObject.delete();
                return;
            }
            else {
                const trackerToken = "d1195ddd-1f45-43fe-8fe9-4b90c76691b7";
                const trackerUrl = 'https://public-api.tracker.gg/v2/apex/standard/profile/';
                const platform = "origin";
                const username = args[0];
                const headers = { 'Content-Type': 'application/json', 'TRN-Api-Key': trackerToken };
                const response = yield fetch(`${trackerUrl}${platform}/${username}`, { method: 'GET', headers: headers })
                    .then((response) => response.json())
                    .then((json) => json.data)
                    .catch((error) => msgObject.reply('Something went wrong retrieving the information.'));
                console.log(response.segments[1].metadata.isActive);
                var i;
                for (i = 0; i < response.segments.length; i++) {
                    console.log(i);
                    console.log(response.segments[i].metadata.isActive);
                    if (response.segments[i].metadata.isActive === true) {
                        console.log(i);
                        let embed = new Discord.MessageEmbed()
                            .setColor("CYAN")
                            .setTitle(`${response.platformInfo.platformUserIdentifier}'s Stats`)
                            .setImage(`${response.platformInfo.avatarUrl}`)
                            .addField("Showing: ", `${response.segments[0].metadata.name}`, true)
                            .addField("Account Level: ", `${response.segments[0].stats.level.value}`, true)
                            .addField("Level completion percentage: ", `${response.segments[0].stats.level.percentile}%`, true)
                            .addField("Kills(combat): ", `${response.segments[0].stats.kills.value}`, true)
                            .addField("Damage done: ", `${response.segments[0].stats.damage.value}`, true)
                            .addField("Rank in season: ", `${response.segments[0].stats.rankScore.metadata.rankName}`)
                            .setThumbnail(`${response.segments[0].stats.rankScore.metadata.iconUrl}`)
                            .addField("Rank-Score in season: ", `${response.segments[0].stats.rankScore.value}`, true)
                            .addField("Season 4 wins: ", `${response.segments[0].stats.season4Wins.value}`, true)
                            .addField("Active legend: ", `${response.segments[i].metadata.name}`)
                            .addField("Active legend's Kills: ", `${response.segments[i].stats.kills.value}`, true)
                            .addField("Active legend's Damage: ", `${response.segments[i].stats.damage.value}`, true)
                            .addField("Active legend's Headshots: ", `${response.segments[i].stats.headshots.value}`, true);
                        msgObject.channel.send(embed);
                        msgObject.delete();
                        return;
                    }
                }
            }
        });
    }
}
exports.default = apec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9taXNjZWxsZW5lb3VzL2FwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsNkJBQTZCO0FBRTdCLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUVwQyxNQUFxQixJQUFJO0lBQXpCO1FBRW9CLGFBQVEsR0FBRyxNQUFNLENBQUM7UUFDbEIsWUFBTyxHQUFjLEVBQUUsQ0FBQztRQUN4QixhQUFRLEdBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QyxZQUFPLEdBQWEsS0FBSyxDQUFDO0lBd0U5QyxDQUFDO0lBdEVHLElBQUk7UUFDQSxPQUFPLG1FQUFtRSxDQUFDO0lBQy9FLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxLQUFLO1FBQ0QsT0FBTyw4QkFBOEIsQ0FBQTtJQUN6QyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUUvRSxJQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNYO2dCQUNJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHNDQUFzQyxDQUFDO3FCQUM3RCxJQUFJLENBQUMsR0FBRyxDQUFBLEVBQUUsR0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQztnQkFDMUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNuQixPQUFPO2FBQ1Y7aUJBRUQ7Z0JBRUksTUFBTSxZQUFZLEdBQUcsc0NBQXNDLENBQUM7Z0JBQzVELE1BQU0sVUFBVSxHQUFHLHlEQUF5RCxDQUFDO2dC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
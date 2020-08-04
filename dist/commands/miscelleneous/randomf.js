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
const fetch = require("node-fetch");
class randomf {
    constructor() {
        this._command = "randomf";
        this.aliases = ["rf", "rfacts"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "this command posts a random fact reagrding numbers in **facts** channel";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?randomf";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            let c = Math.floor(Math.random() * 4);
            console.log(c);
            switch (c) {
                case 1:
                    let x = Math.floor(Math.random() * 2020) + 200;
                    msgObject.channel.send("Generating facts from random year...go to facts channel and see")
                        .then(msg => { msg.delete({ timeout: 3000 }); });
                    let data = yield (yield fetch(`https://numbersapi.p.rapidapi.com/${x}/year?fragment=true&json=true`, {
                        "method": "GET",
                        "headers": {
                            "x-rapidapi-host": "numbersapi.p.rapidapi.com",
                            "x-rapidapi-key": "ac88a95d36mshb6131141b7ac1a2p126513jsn647183dccfb9"
                        }
                    })).json();
                    let embed = new Discord.MessageEmbed()
                        .setTitle(`**The Fact**`)
                        .setDescription(data.text)
                        .addField("Year :", `${data.number}`, true)
                        .addField("date :", `${data.date}`, true);
                    if (msgObject.guild.channels.cache.find(f => f.name === "facts")) {
                        let fchannel = msgObject.guild.channels.cache.find(f => f.name === "facts");
                        fchannel.send(embed);
                    }
                    else {
                        msgObject.channel.send(embed);
                    }
                    msgObject.delete();
                    break;
                case 2:
                    let v = Math.floor(Math.random() * 30) + 1;
                    let x1 = Math.floor(Math.random() * 12) + 1;
                    msgObject.channel.send("Generating facts from random date...go to facts channel and see")
                        .then(msg => { msg.delete({ timeout: 3000 }); });
                    let data1 = yield (yield fetch(`https://numbersapi.p.rapidapi.com/${x1}/${v}/date?fragment=true&json=true`, {
                        "method": "GET",
                        "headers": {
                            "x-rapidapi-host": "numbersapi.p.rapidapi.com",
                            "x-rapidapi-key": "ac88a95d36mshb6131141b7ac1a2p126513jsn647183dccfb9"
                        }
                    })).json();
                    let cembed = new Discord.MessageEmbed()
                        .setTitle(`#${data1.number} :**The Fact** on ${v}/${x1}/${data1.year}`)
                        .setDescription(data1.text);
                    if (msgObject.guild.channels.cache.find(f => f.name === "facts")) {
                        let gchannel = msgObject.guild.channels.cache.find(f => f.name === "facts");
                        gchannel.send(cembed);
                    }
                    else {
                        msgObject.channel.send(cembed);
                    }
                    msgObject.delete();
                    break;
                case 3:
                    let v1 = Math.floor(Math.random() * 10000000000000000000000000000000000000000000000);
                    msgObject.channel.send("Generating trivia facts...go to facts channel and see")
                        .then(msg => { msg.delete({ timeout: 3000 }); });
                    let data2 = yield (yield fetch(`https://numbersapi.p.rapidapi.com/${v1}/trivia?fragment=true&notfound=floor&json=true`, {
                        "method": "GET",
                        "headers": {
                            "x-rapidapi-host": "numbersapi.p.rapidapi.com",
                            "x-rapidapi-key": "ac88a95d36mshb6131141b7ac1a2p126513jsn647183dccfb9"
                        }
                    })).json();
                    let dembed = new Discord.MessageEmbed()
                        .setTitle(`**The Fact**`)
                        .setDescription(`${data2.text}\n Number : ${data2.number}`);
                    if (msgObject.guild.channels.cache.find(f => f.name === "facts")) {
                        let hchannel = msgObject.guild.channels.cache.find(f => f.name === "facts");
                        hchannel.send(dembed);
                    }
                    else {
                        msgObject.channel.send(dembed);
                    }
                    msgObject.delete();
                    break;
                default:
                    msgObject.channel.send("**Oops!!! I am broke now ,try again some time later**")
                        .then(msg => { msg.delete({ timeout: 5000 }); });
                    msgObject.delete();
            }
            return;
        });
    }
}
exports.default = randomf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZG9tZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9taXNjZWxsZW5lb3VzL3JhbmRvbWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsNkJBQTZCO0FBRTdCLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFcEMsTUFBcUIsT0FBTztJQUE1QjtRQUVvQixhQUFRLEdBQUcsU0FBUyxDQUFDO1FBQ3JCLFlBQU8sR0FBYyxDQUFDLElBQUksRUFBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxhQUFRLEdBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QyxZQUFPLEdBQWEsSUFBSSxDQUFDO0lBOEc3QyxDQUFDO0lBNUdHLElBQUk7UUFDQSxPQUFPLHlFQUF5RSxDQUFDO0lBQ3JGLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFDRCxLQUFLO1FBQ0QsT0FBTyxVQUFVLENBQUE7SUFDckIsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFFL0UsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLFFBQU8sQ0FBQyxFQUFDO2dCQUNMLEtBQUssQ0FBQztvQkFDRixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7b0JBQy9D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
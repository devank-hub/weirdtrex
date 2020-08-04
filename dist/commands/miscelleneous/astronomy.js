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
const { stripIndents } = require("common-tags");
const fetch = require("node-fetch");
const ms = require("ms");
class astronomy {
    constructor() {
        this._command = "astronomy";
        this.aliases = ["astro"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "this command is for gettting astronomical fact of the day";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?astronomy";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.channel.send("Generating . . . Please go to facts channel under FUN_STUFFS to see the outcome").then(msg => { msg.delete({ timeout: 5000 }); });
            let data = yield (yield fetch(`https://api.nasa.gov/planetary/apod?api_key=MQlZMvvmV8rt09B5dBQXzhFR3f0Zlo183eIirhxp`)).json();
            let embed = new Discord.MessageEmbed()
                .setColor("CYAN")
                .setTitle(data.title)
                .setDescription(`**Explanation**\n${data.explanation}`)
                .setFooter(`**${data.copyright}**`);
            let cembed = new Discord.MessageEmbed()
                .setColor("random")
                .setImage(data.url);
            if (msgObject.guild.channels.cache.find(channel => channel.name === "facts")) {
                let cchannel = msgObject.guild.channels.cache.find(channel => channel.name === "facts");
                cchannel.send(embed);
                cchannel.send(cembed);
            }
            else {
                msgObject.channel.send(embed);
                msgObject.channel.send(cembed);
            }
            msgObject.delete();
            return;
        });
    }
}
exports.default = astronomy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN0cm9ub215LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL21pc2NlbGxlbmVvdXMvYXN0cm9ub215LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQXNDO0FBQ3RDLDZCQUE2QjtBQUU3QixNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2hELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNwQyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFekIsTUFBcUIsU0FBUztJQUE5QjtRQUVvQixhQUFRLEdBQUcsV0FBVyxDQUFDO1FBQ3ZCLFlBQU8sR0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9CLGFBQVEsR0FBWSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLFlBQU8sR0FBYSxJQUFJLENBQUM7SUEwQzdDLENBQUM7SUF4Q0csSUFBSTtRQUNBLE9BQU8sMkRBQTJELENBQUM7SUFDdkUsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUNELEtBQUs7UUFDRCxPQUFPLFlBQVksQ0FBQTtJQUN2QixDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUUvRSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpRkFBaUYsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDO1lBQ3JKLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxzRkFBc0YsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDOUgsSUFBSSxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFO2lCQUNqQyxRQUFRLENBQUMsTUFBTSxDQUFDO2lCQUNoQixRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztpQkFDcEIsY0FBYyxDQUFDLG9CQUFvQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ3RELFNBQVMsQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFBO1lBRXZDLElBQUksTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTtpQkFDbEMsUUFBUSxDQUFDLFFBQVEsQ0FBQztpQkFDbEIsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUN2QixJQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxFQUMzRTtnQkFDSSxJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQztnQkFFeEYsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFckIsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN6QjtpQkFDRztnQkFDQSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDOUIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDbEM7WUFDRCxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkIsT0FBTztRQUNYLENBQUM7S0FBQTtDQUVKO0FBL0NELDRCQStDQyJ9
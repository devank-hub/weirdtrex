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
const cheerio = require('cheerio');
const request = require('request');
class image {
    constructor() {
        this._command = "image";
        this.aliases = ["img", "i"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "this command brings up random image depending upon given keyword from google or will provide random wallpaper";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?image <keyword>";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.channel.send("Generating...")
                .then(msg => { msg.delete({ timeout: 3000 }); });
            if (!args[0])
                args[0] = "wallpaper";
            else
                args.join();
            console.log(args.join(' '));
            var options = {
                url: "http://results.dogpile.com/serp?qc=images&q=" + `${args.join(' ')}`,
                method: "GET",
                headers: {
                    "Accept": "text/html",
                    "User-Agent": "Chrome"
                }
            };
            request(options, function (error, response, responseBody) {
                if (error) {
                    return;
                }
                var x = cheerio.load(responseBody);
                var links = x(".image a.link");
                var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
                if (!urls.length) {
                    return;
                }
                let embed = new Discord.MessageEmbed();
                embed.setImage(urls[Math.floor(Math.random() * urls.length)]);
                if (msgObject.guild.channels.cache.find(channel => channel.name === "meme-images-posts")) {
                    let cchannel = msgObject.guild.channels.cache.find(channel => channel.name === "meme-images-posts");
                    cchannel.send(embed);
                }
                else
                    msgObject.channel.send(embed);
            });
            msgObject.delete();
        });
    }
}
exports.default = image;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvbWlzY2VsbGVuZW91cy9pbWFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0Qyw2QkFBNkI7QUFFN0IsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXpCLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuQyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFFbkMsTUFBcUIsS0FBSztJQUExQjtRQUVvQixhQUFRLEdBQUcsT0FBTyxDQUFBO1FBQ2xCLFlBQU8sR0FBYyxDQUFDLEtBQUssRUFBQyxHQUFHLENBQUMsQ0FBQztRQUNqQyxhQUFRLEdBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QyxZQUFPLEdBQWEsSUFBSSxDQUFDO0lBNEQ3QyxDQUFDO0lBMURHLElBQUk7UUFDQSxPQUFPLCtHQUErRyxDQUFDO0lBQzNILENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxLQUFLO1FBQ0QsT0FBTyxrQkFBa0IsQ0FBQTtJQUM3QixDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUUvRSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7aUJBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNQLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7O2dCQUV0QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxPQUFPLEdBQUc7Z0JBQ1YsR0FBRyxFQUFFLDhDQUE4QyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDekUsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsT0FBTyxFQUFFO29CQUNMLFFBQVEsRUFBRSxXQUFXO29CQUNyQixZQUFZLEVBQUUsUUFBUTtpQkFDekI7YUFDSixDQUFDO1lBQ0YsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFTLEtBQVUsRUFBRSxRQUFhLEVBQUUsWUFBaUI7Z0JBQ2xFLElBQUksS0FBSyxFQUFFO29CQUNQLE9BQU87aUJBQ1Y7Z0JBRUQsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBR25GLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNkLE9BQU87aUJBQ1Y7Z0JBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUE7Z0JBQ3RDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTlELElBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssbUJBQW1CLENBQUMsRUFDdkY7b0JBQ0ksSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssbUJBQW1CLENBQUMsQ0FBQztvQkFFcEcsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDeEI7O29CQUVHLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZCLENBQUM7S0FBQTtDQUVKO0FBakVELHdCQWlFQyJ9
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
class meme {
    constructor() {
        this._command = "meme";
        this.aliases = ["mm"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "Displays a meme randomly";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?meme";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            let msg = yield msgObject.channel.send("Generating...")
                .then(msg => { msg.delete({ timeout: 3000 }); });
            fetch("https://apis.duncte123.me/meme")
                .then((res) => res.json()).then(body => {
                if (!body)
                    return msgObject.reply("whoops! I've broke, try again!");
                let mEmbed = new Discord.MessageEmbed()
                    .setColor("cyan")
                    .setImage(body.data.image)
                    .setTimestamp()
                    .setFooter(client.user.username.toUpperCase(), `${client.user.displayAvatarURL()}`);
                if (msgObject.guild.channels.cache.find(c => c.name === "meme-images-posts")) {
                    let cchannel = msgObject.guild.channels.cache.find(c => c.name === "meme-images-posts");
                    cchannel.send(mEmbed);
                    return;
                }
                else
                    msgObject.channel.send(mEmbed);
            });
            msgObject.delete();
            return;
        });
    }
}
exports.default = meme;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9taXNjZWxsZW5lb3VzL21lbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsNkJBQTZCO0FBRTdCLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUVwQyxNQUFxQixJQUFJO0lBQXpCO1FBRW9CLGFBQVEsR0FBRyxNQUFNLENBQUM7UUFDbEIsWUFBTyxHQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsYUFBUSxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsWUFBTyxHQUFhLElBQUksQ0FBQztJQTJDN0MsQ0FBQztJQXpDRyxJQUFJO1FBQ0EsT0FBTywwQkFBMEIsQ0FBQztJQUN0QyxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBRUQsS0FBSztRQUNELE9BQU8sT0FBTyxDQUFBO0lBQ2xCLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBRS9FLElBQUksR0FBRyxHQUFHLE1BQU0sU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO2lCQUNsRCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQztZQUUvQyxLQUFLLENBQUMsZ0NBQWdDLENBQUM7aUJBRXRDLElBQUksQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN4QyxJQUFHLENBQUMsSUFBSTtvQkFBRSxPQUFPLFNBQVMsQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQTtnQkFFbEUsSUFBSSxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFO3FCQUNsQyxRQUFRLENBQUMsTUFBTSxDQUFDO3FCQUVoQixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7cUJBQ3pCLFlBQVksRUFBRTtxQkFDZCxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFBO2dCQUMzRixJQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLG1CQUFtQixDQUFDLEVBQzNFO29CQUNJLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLG1CQUFtQixDQUFDLENBQUM7b0JBRXhGLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3RCLE9BQU87aUJBQ1Y7O29CQUVHLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFBO1lBQ0YsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ25CLE9BQU87UUFDWCxDQUFDO0tBQUE7Q0FDSjtBQWhERCx1QkFnREMifQ==
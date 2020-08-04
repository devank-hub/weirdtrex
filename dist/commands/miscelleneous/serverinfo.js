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
class serverinfo {
    constructor() {
        this._command = "serverinfo";
        this.aliases = ["si", "info", "information"];
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
        return "?serverinfo";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            let guild = msgObject.member.guild;
            let t = guild.members.cache.filter((x) => x.user.bot).size;
            let sEmbed = new Discord.MessageEmbed()
                .setColor("cyan")
                .setTitle("Server Info")
                .setThumbnail(`${msgObject.guild.iconURL()}`)
                .setAuthor(`${msgObject.guild.name} Info`, `${msgObject.guild.iconURL()}`)
                .addField("**Guild Name:**", `${msgObject.guild.name}`, true)
                .addField("**Guild Owner:**", `${msgObject.guild.owner}`, true)
                .addField("**Member Count:**", `${msgObject.guild.memberCount}`, true)
                .addField("**Role Count:**", `${msgObject.guild.roles.cache.size}`, true)
                .addField("**Bot Count**", `${t}`)
                .setFooter(`WeirdTrex`, `${client.user.displayAvatarURL()}`);
            msgObject.channel.send(sEmbed).then(msg => msg.delete({ timeout: 20000 }));
            msgObject.delete();
            return;
        });
    }
}
exports.default = serverinfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9taXNjZWxsZW5lb3VzL3NlcnZlcmluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsNkJBQTZCO0FBRzdCLE1BQXFCLFVBQVU7SUFBL0I7UUFFb0IsYUFBUSxHQUFHLFlBQVksQ0FBQztRQUN4QixZQUFPLEdBQWMsQ0FBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2pELGFBQVEsR0FBWSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLFlBQU8sR0FBYSxJQUFJLENBQUM7SUFrQzdDLENBQUM7SUFoQ0csSUFBSTtRQUNBLE9BQU8seUNBQXlDLENBQUM7SUFDckQsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUNELEtBQUs7UUFDRCxPQUFPLGFBQWEsQ0FBQTtJQUN4QixDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUUvRSxJQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUVuQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzNELElBQUksTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDLFlBQVksRUFBRTtpQkFDbEMsUUFBUSxDQUFDLE1BQU0sQ0FBQztpQkFDaEIsUUFBUSxDQUFDLGFBQWEsQ0FBQztpQkFDdkIsWUFBWSxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO2lCQUM1QyxTQUFTLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxFQUFFLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO2lCQUN6RSxRQUFRLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQztpQkFDNUQsUUFBUSxDQUFDLGtCQUFrQixFQUFFLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLENBQUM7aUJBQzlELFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxDQUFDO2lCQUNyRSxRQUFRLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDO2lCQUN4RSxRQUFRLENBQUMsZUFBZSxFQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7aUJBQ2hDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFBO1lBRWhFLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixPQUFPO1FBQ1gsQ0FBQztLQUFBO0NBQ0o7QUF2Q0QsNkJBdUNDIn0=
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
const path = require("path");
const discord_js_1 = require("discord.js");
const ms = require("ms");
class help {
    constructor() {
        this._command = "help";
        this.aliases = ["h"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "Brings up the help";
    }
    isThisCommand(command) {
        return command == this._command;
    }
    usage() {
        return "?help";
    }
    runCommand(args, message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            let cmdsFnoArgs = client.CMDHandler.commands.concat(client.CMDHandler.aliases).filter(c => c.display == true);
            let cmds = client.CMDHandler.commands;
            let cats = client.CMDHandler.categories;
            if (args[0] == undefined) {
                let utilCMDS = cmds.filter((c) => c.category == "miscelleneous" && c.display == true);
                let modCMDS = cmds.filter((c) => c.category == "moderation" && c.display == true);
                let musicCMDS = cmds.filter((c) => c.category == "music" && c.display == true);
                let ownerCMDS = cmds.filter((c) => c.category == "owner" && c.display == true);
                let utilityCMDS = cmds.filter((c) => c.category == "utility" && c.display == true);
                let format = (cmds) => {
                    return cmds.map((cmd) => `\`${cmd._command}\``).join(' ');
                };
                let embed = new discord_js_1.MessageEmbed();
                embed.setAuthor(`${client.user.username} help`, client.user.displayAvatarURL());
                embed.setThumbnail(client.user.displayAvatarURL());
                embed.setColor(`#6699ff`);
                embed.setDescription(`
            **➤ Miscelleneous [${utilCMDS.size}]:**
            ${format(utilCMDS)}
            **➤ Moderation [${modCMDS.size}]:**
            ${format(modCMDS)}
            **➤ Music [${musicCMDS.size}]:**
            ${format(musicCMDS)}
            **➤ Owner [${ownerCMDS.size}]:**
            ${format(ownerCMDS)}
            **➤ Utility [${utilityCMDS.size}]:**
            ${format(utilityCMDS)}
            `);
                embed.setFooter(`© ${client.user.username} | Total Commands ${cmds.size}`);
                message.channel.send({ embed: embed })
                    .then(msg => {
                    setTimeout(function () { msg.delete(); }, ms("30s"));
                });
                message.delete();
                return;
            }
            else if (cmdsFnoArgs.some((cmd) => cmd._command == args[0].toLowerCase() || cmd.aliases.some((alias) => alias.toLowerCase() == args[0].toLowerCase()))) {
                let cmd = cmdsFnoArgs.find((cmd) => cmd._command == args[0].toLowerCase() || cmd.aliases.some((alias) => alias == args[0].toLowerCase()));
                let embed = new discord_js_1.MessageEmbed();
                embed.setAuthor(`${client.user.username} Help`, client.user.displayAvatarURL());
                embed.setThumbnail(client.user.displayAvatarURL());
                embed.setColor(`#6699ff`);
                embed.setDescription(`
            **Command:** ${args[0].toLowerCase()}
            **Description:** ${cmd.help()}
            **Usage:** ${cmd.usage()}
            **Aliases:** ${cmd.aliases.map((alias) => `\`${alias}\``).join(' ')}
            `);
                message.channel.send({ embed: embed })
                    .then(msg => {
                    setTimeout(function () { msg.delete(); }, ms("30s"));
                });
                message.delete();
                return;
            }
            else if (cats.some(str => str.toLowerCase() == args[0].toLowerCase())) {
                let cmdsInCat = cmds.filter(cmd => cmd.category.toLowerCase() == args[0].toLowerCase());
                let i = 0;
                let arr = Array.from(cmdsInCat.values());
                let s = cmdsInCat.size;
                let embed = new discord_js_1.MessageEmbed();
                embed.setAuthor(`${client.user.username}'s ${args[0]} Help`, client.user.displayAvatarURL());
                embed.setThumbnail(client.user.displayAvatarURL());
                embed.setColor(`#6699ff`);
                embed.setDescription(arr.map((s, i = 0) => `\`${arr[i].usage()}\` **:** \`${arr[i].help()}\``).join(`\n\n`));
                message.channel.send({ embed: embed })
                    .then(msg => { msg.delete({ timeout: 30000 }); });
                message.delete();
                return;
            }
        });
    }
}
exports.default = help;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9taXNjZWxsZW5lb3VzL2hlbHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSw2QkFBNkI7QUFDN0IsMkNBQStFO0FBRS9FLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixNQUFxQixJQUFJO0lBQXpCO1FBRW9CLGFBQVEsR0FBWSxNQUFNLENBQUM7UUFDM0IsWUFBTyxHQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0IsYUFBUSxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsWUFBTyxHQUFhLElBQUksQ0FBQztJQWdHN0MsQ0FBQztJQTlGRyxJQUFJO1FBQ0EsT0FBTyxvQkFBb0IsQ0FBQztJQUNoQyxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWdCO1FBQzFCLE9BQU8sT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDcEMsQ0FBQztJQUVELEtBQUs7UUFDRyxPQUFPLE9BQU8sQ0FBQztJQUN2QixDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxPQUFnQixFQUFFLE1BQVc7O1lBRTFELElBQUksV0FBVyxHQUFxQyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFBO1lBQy9JLElBQUksSUFBSSxHQUFxQyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUN4RSxJQUFJLElBQUksR0FBYSxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztZQUNsRCxJQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLEVBQ3ZCO2dCQUVJLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFlLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksZUFBZSxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUM7Z0JBQ3BHLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFlLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksWUFBWSxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUM7Z0JBQ2hHLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFlLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUM7Z0JBQzdGLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFlLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUM7Z0JBQzdGLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFlLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUM7Z0JBRWpHLElBQUksTUFBTSxHQUFHLENBQUMsSUFBcUMsRUFBRSxFQUFFO29CQUNuRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFnQixFQUFFLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDMUUsQ0FBQyxDQUFBO2dCQUVELElBQUksS0FBSyxHQUFHLElBQUkseUJBQVksRUFBRSxDQUFDO2dCQUMvQixLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztnQkFDaEYsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztnQkFDbkQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQTtnQkFDekIsS0FBSyxDQUFDLGNBQWMsQ0FBQztpQ0FDQSxRQUFRLENBQUMsSUFBSTtjQUNoQyxNQUFNLENBQUMsUUFBUSxDQUFDOzhCQUNBLE9BQU8sQ0FBQyxJQUFJO2NBQzVCLE1BQU0sQ0FBQyxPQUFPLENBQUM7eUJBQ0osU0FBUyxDQUFDLElBQUk7Y0FDekIsTUFBTSxDQUFDLFNBQVMsQ0FBQzt5QkFDTixTQUFTLENBQUMsSUFBSTtjQUN6QixNQUFNLENBQUMsU0FBUyxDQUFDOzJCQUNKLFdBQVcsQ0FBQyxJQUFJO2NBQzdCLE1BQU0sQ0FBQyxXQUFXLENBQUM7YUFDcEIsQ0FBQyxDQUFBO2dCQUNGLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEscUJBQXFCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQztxQkFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNSLFVBQVUsQ0FBQyxjQUFZLEdBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQSxDQUFBLENBQUMsRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDcEUsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNqQixPQUFPO2FBRVY7aUJBQ0ksSUFBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBZ0IsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFhLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUMxSztnQkFFSSxJQUFJLEdBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUE7Z0JBQ2pKLElBQUksS0FBSyxHQUFHLElBQUkseUJBQVksRUFBRSxDQUFDO2dCQUMvQixLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztnQkFDaEYsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztnQkFDbkQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQTtnQkFDekIsS0FBSyxDQUFDLGNBQWMsQ0FBQzsyQkFDTixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFOytCQUNqQixHQUFHLENBQUMsSUFBSSxFQUFFO3lCQUNoQixHQUFHLENBQUMsS0FBSyxFQUFFOzJCQUNULEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBYSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzthQUMxRSxDQUFDLENBQUE7Z0JBQ0YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUM7cUJBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDUixVQUFVLENBQUMsY0FBWSxHQUFlLENBQUMsTUFBTSxFQUFFLENBQUEsQ0FBQSxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3BFLENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDakIsT0FBTzthQUNWO2lCQUNJLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsRUFDcEU7Z0JBRUksSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUE7Z0JBQ3ZGLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDVixJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO2dCQUN2QixJQUFJLEtBQUssR0FBRyxJQUFJLHlCQUFZLEVBQUUsQ0FBQztnQkFDL0IsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO2dCQUM3RixLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO2dCQUNuRCxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMxQixLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQyxFQUFFLENBQUEsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLGNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDMUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUM7cUJBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2pCLE9BQU87YUFDVjtRQUNMLENBQUM7S0FBQTtDQUNKO0FBckdELHVCQXFHQyJ9
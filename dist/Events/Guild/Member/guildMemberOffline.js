"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
function guildMemberOffline(client, member, oldStatus) {
    let tracker = member.guild.channels.cache.find((channel) => channel.name === "presencestat");
    let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${member.user.tag + " was online and is now offline!"}`)
        .setFooter(client.user.username, client.user.displayAvatarURL());
    tracker.send(embed);
}
exports.default = guildMemberOffline;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpbGRNZW1iZXJPZmZsaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL0V2ZW50cy9HdWlsZC9NZW1iZXIvZ3VpbGRNZW1iZXJPZmZsaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0NBQXNDO0FBRXRDLFNBQXdCLGtCQUFrQixDQUFDLE1BQXNCLEVBQUUsTUFBMkIsRUFBRSxTQUFpQjtJQUc3RyxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLGNBQWMsQ0FBd0IsQ0FBQztJQUN6SCxJQUFJLEtBQUssR0FBRyxJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7U0FDakMsUUFBUSxDQUFDLFFBQVEsQ0FBQztTQUNsQixRQUFRLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBQyxpQ0FBaUMsRUFBRSxDQUFDO1NBQ2hFLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQTtJQUNwRSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRXhCLENBQUM7QUFWRCxxQ0FVQyJ9
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
function guildMemberOnline(client, member, newStatus) {
    let tracker = member.guild.channels.cache.find((channel) => channel.name === "presencestat");
    let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${member.user.tag + "** was offline and is now **" + newStatus + "**!"}`)
        .setFooter(client.user.username, client.user.displayAvatarURL());
    tracker.send(embed);
}
exports.default = guildMemberOnline;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpbGRNZW1iZXJPbmxpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvRXZlbnRzL0d1aWxkL01lbWJlci9ndWlsZE1lbWJlck9ubGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHNDQUFzQztBQUV0QyxTQUF3QixpQkFBaUIsQ0FBQyxNQUFXLEVBQUUsTUFBMkIsRUFBRSxTQUFpQjtJQUdqRyxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLGNBQWMsQ0FBd0IsQ0FBQztJQUN6SCxJQUFJLEtBQUssR0FBRyxJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7U0FDakMsUUFBUSxDQUFDLFFBQVEsQ0FBQztTQUNsQixRQUFRLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBQyw4QkFBOEIsR0FBQyxTQUFTLEdBQUMsS0FBSyxFQUFFLENBQUM7U0FDN0UsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFBO0lBQ3BFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFeEIsQ0FBQztBQVZELG9DQVVDIn0=
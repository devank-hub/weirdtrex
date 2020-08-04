"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
function guildMemberRemove(client, member) {
    let goodbyeChannel = member.guild.channels.cache.find(channel => channel.name === "🤚goodbye");
    goodbyeChannel.send(`Hey ${member.displayName}, cya,tc!`);
    let sChannel = member.guild.channels.cache.find(s => s.name === "👋joining_leaving");
    let sayArray = [
        `hey ${member} come back later,huh?`,
        `whoops! who's just got out? ${member}`,
        `brace yourself, ${member} ejected him/herself`,
        `lost ${member}?come back here again`,
        `bye bye ${member},have a safe emergence!`,
        `${member} is abondoning ship!`,
        `can any help ${member} to come back? ofcourse we!`
    ];
    let math = Math.floor(Math.random() * sayArray.length);
    let sembed = new Discord.MessageEmbed()
        .setAuthor("Bye Bye! 👋")
        .setDescription(sayArray[math])
        .setColor("RED");
    sChannel.send({ embed: sembed });
}
exports.default = guildMemberRemove;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpbGRNZW1iZXJSZW1vdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvRXZlbnRzL0d1aWxkL01lbWJlci9ndWlsZE1lbWJlclJlbW92ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFzQztBQUd0QyxTQUF3QixpQkFBaUIsQ0FBQyxNQUFXLEVBQUUsTUFBMkI7SUFFOUUsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUF3QixDQUFDO0lBRXRILGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxNQUFNLENBQUMsV0FBVyxXQUFXLENBQUMsQ0FBQztJQUMxRCxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxtQkFBbUIsQ0FBd0IsQ0FBQztJQUM1RyxJQUFJLFFBQVEsR0FBRztRQUNYLE9BQU8sTUFBTSx1QkFBdUI7UUFDcEMsK0JBQStCLE1BQU0sRUFBRTtRQUN2QyxtQkFBbUIsTUFBTSxzQkFBc0I7UUFDL0MsUUFBUSxNQUFNLHVCQUF1QjtRQUNyQyxXQUFXLE1BQU0seUJBQXlCO1FBQzFDLEdBQUcsTUFBTSxzQkFBc0I7UUFDL0IsZ0JBQWdCLE1BQU0sNkJBQTZCO0tBQUMsQ0FBQTtJQUN4RCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFdkQsSUFBSSxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFO1NBQ2xDLFNBQVMsQ0FBQyxhQUFhLENBQUM7U0FDeEIsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QixRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFcEIsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO0FBRWxDLENBQUM7QUF2QkQsb0NBdUJDIn0=
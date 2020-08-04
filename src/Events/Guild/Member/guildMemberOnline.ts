import { bot } from "../../../api";
import * as Discord from "discord.js";

export default function guildMemberOnline(client: bot, member: Discord.GuildMember, newStatus: string){

    //console.log(member.user.tag+" was offline and is now "+newStatus+"!");
    let tracker = member.guild.channels.cache.find((channel: any) => channel.name === "presencestat") as Discord.TextChannel;
    let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${member.user.tag+"** was offline and is now **"+newStatus+"**!"}`)
        .setFooter(client.user.username, client.user.displayAvatarURL())
    tracker.send(embed);

}
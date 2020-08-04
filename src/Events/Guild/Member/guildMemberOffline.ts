import { bot } from "../../../api";
import * as Discord from "discord.js";

export default function guildMemberOffline(client: Discord.Client, member: Discord.GuildMember, oldStatus: string) {

    //console.log(member.user.tag+" became offline!");
    let tracker = member.guild.channels.cache.find((channel: any) => channel.name === "presencestat") as Discord.TextChannel;
    let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${member.user.tag+" was online and is now offline!"}`)
        .setFooter(client.user.username, client.user.displayAvatarURL())
    tracker.send(embed);

}
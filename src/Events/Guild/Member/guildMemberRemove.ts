import * as Discord from "discord.js";
import { bot } from "../../../api";

export default function guildMemberRemove(client: bot, member: Discord.GuildMember){

    let goodbyeChannel = member.guild.channels.cache.find(channel => channel.name === "🤚goodbye") as Discord.TextChannel;
    //@ts-ignore
    goodbyeChannel.send(`Hey ${member.displayName}, cya,tc!`);
    let sChannel = member.guild.channels.cache.find(s => s.name === "👋joining_leaving") as Discord.TextChannel;
    let sayArray = [
        `hey ${member} come back later,huh?`,
        `whoops! who's just got out? ${member}`,
        `brace yourself, ${member} ejected him/herself`,
        `lost ${member}?come back here again`,
        `bye bye ${member},have a safe emergence!`,
        `${member} is abondoning ship!`,
        `can any help ${member} to come back? ofcourse we!`]
    let math = Math.floor(Math.random() * sayArray.length);

    let sembed = new Discord.MessageEmbed()
        .setAuthor("Bye Bye! 👋")
        .setDescription(sayArray[math])
        .setColor("RED")

    sChannel.send({embed:sembed});

}
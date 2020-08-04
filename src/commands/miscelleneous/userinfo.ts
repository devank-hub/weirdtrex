import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const ms = require("ms");

export default class userinfo implements IBotCommand {
    
    public readonly _command = "userinfo";
    public readonly aliases : string[] = ["ui","usr","user","uinfo"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command shows server's information";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?userinfo <member>"
    }
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
    
        let mentionedUser = msgObject.mentions.members.first();
        if(!mentionedUser)
        {
            msgObject.channel.send("Please provide a valid mentioned user to find his/her details")
                .then(msg =>{msg.delete({timeout: 3000})});
            msgObject.delete();
            return;
        }
        else
        {
            const moment = require('moment');
            let uEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle(`${mentionedUser}'s Info`)
                .setThumbnail(`${mentionedUser.user.displayAvatarURL()}`)
                .setAuthor(`${mentionedUser.user.username} Info`, `${mentionedUser.user.displayAvatarURL()}`)
                .addField("**Username:**", `${mentionedUser.user.username}`, true)
                .addField("**Discriminator:**", `${mentionedUser.user.discriminator}`, true)
                .addField("**ID:**", `${mentionedUser.id}`, true)
                .addField("**Status:**", `${mentionedUser.presence.status}`, true)
                .addField("**Created At:**", `${mentionedUser.user.createdAt}`, true)
                .addField("**Roles:**", `${mentionedUser.roles.cache.map(r => r.name)}`)
                .addField("**Guild joined on:**", `${mentionedUser.guild.joinedAt}`,true)
                .setFooter(`WeirdTrex |`, `${client.user.displayAvatarURL()}`)

            msgObject.channel.send(uEmbed).then(msg => msg.delete({timeout: 10000}));
            msgObject.delete();
            return;
        }  
    }
} 
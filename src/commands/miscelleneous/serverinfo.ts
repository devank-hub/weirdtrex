import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";

export default class serverinfo implements IBotCommand {
    
    public readonly _command = "serverinfo";
    public readonly aliases : string[] = ["si","info","information"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command shows server's information";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?serverinfo"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
       
        let guild = msgObject.member.guild;
        //@ts-ignore
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
            .addField("**Bot Count**",`${t}`)
            .setFooter(`WeirdTrex`, `${client.user.displayAvatarURL()}`)
            
        msgObject.channel.send(sEmbed).then(msg => msg.delete({timeout: 20000}));
        msgObject.delete();
        return;
    }
}
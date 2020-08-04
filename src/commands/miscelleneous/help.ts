import * as path from "path";
import { Message, MessageEmbed, Collection, DiscordAPIError } from "discord.js"
import { IBotCommand, bot } from "../../api";
const ms = require("ms");
export default class help implements IBotCommand {

    public readonly _command : string = "help";
    public readonly aliases : string[] = ["h"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "Brings up the help";
    }

    isThisCommand(command : string): boolean {
        return command == this._command;
    }

    usage(): string {
            return "?help";
    }

    async runCommand(args: string[], message: Message, client: bot): Promise<any> {

        let cmdsFnoArgs : Collection<string, IBotCommand> = client.CMDHandler.commands.concat(client.CMDHandler.aliases).filter(c => c.display == true)
        let cmds : Collection<string, IBotCommand> = client.CMDHandler.commands;
        let cats: string[] = client.CMDHandler.categories;
        if(args[0] == undefined) 
        {

            let utilCMDS = cmds.filter((c : IBotCommand) => c.category == "miscelleneous" && c.display == true);
            let modCMDS = cmds.filter((c : IBotCommand) => c.category == "moderation" && c.display == true);
            let musicCMDS = cmds.filter((c : IBotCommand) => c.category == "music" && c.display == true);
            let ownerCMDS = cmds.filter((c : IBotCommand) => c.category == "owner" && c.display == true);
            let utilityCMDS = cmds.filter((c : IBotCommand) => c.category == "utility" && c.display == true);

            let format = (cmds: Collection<string, IBotCommand>) => {
                return cmds.map((cmd: IBotCommand) => `\`${cmd._command}\``).join(' ')
            }

            let embed = new MessageEmbed();
            embed.setAuthor(`${client.user.username} help`, client.user.displayAvatarURL());
            embed.setThumbnail(client.user.displayAvatarURL());
            embed.setColor(`#6699ff`)
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
            `)
            embed.setFooter(`© ${client.user.username} | Total Commands ${cmds.size}`);
            message.channel.send({embed: embed})
                .then(msg =>{
                    setTimeout(function(){(msg as Message).delete()},ms("30s"));
            });
            message.delete();
            return;

        } 
        else if(cmdsFnoArgs.some((cmd: IBotCommand) => cmd._command == args[0].toLowerCase() || cmd.aliases.some((alias: string) => alias.toLowerCase() == args[0].toLowerCase())))
        {

            let cmd = cmdsFnoArgs.find((cmd) => cmd._command == args[0].toLowerCase() || cmd.aliases.some((alias: string) => alias == args[0].toLowerCase()))
            let embed = new MessageEmbed();
            embed.setAuthor(`${client.user.username} Help`, client.user.displayAvatarURL());
            embed.setThumbnail(client.user.displayAvatarURL());
            embed.setColor(`#6699ff`)
            embed.setDescription(`
            **Command:** ${args[0].toLowerCase()}
            **Description:** ${cmd.help()}
            **Usage:** ${cmd.usage()}
            **Aliases:** ${cmd.aliases.map((alias: string) => `\`${alias}\``).join(' ')}
            `)
            message.channel.send({embed: embed})
                .then(msg =>{
                    setTimeout(function(){(msg as Message).delete()},ms("30s"));
            });
            message.delete();
            return;
        } 
        else if(cats.some(str => str.toLowerCase() == args[0].toLowerCase()))
        {

            let cmdsInCat = cmds.filter(cmd => cmd.category.toLowerCase() == args[0].toLowerCase())
            let i = 0;
            let arr = Array.from(cmdsInCat.values());
            let s = cmdsInCat.size;
            let embed = new MessageEmbed();
            embed.setAuthor(`${client.user.username}'s ${args[0]} Help`, client.user.displayAvatarURL());
            embed.setThumbnail(client.user.displayAvatarURL());
            embed.setColor(`#6699ff`);
            embed.setDescription(arr.map((s,i = 0)=>`\`${arr[i].usage()}\` **:** \`${arr[i].help()}\``).join(`\n\n`));
            message.channel.send({embed: embed})
                .then(msg =>{msg.delete({timeout: 30000})});
            message.delete();
            return;
        }
    }
}
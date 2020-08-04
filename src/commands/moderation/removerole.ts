import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const ms = require("ms");

export default class removerole implements IBotCommand {
    
    public readonly _command = "removerole";
    public readonly aliases : string[] = ["rmvr"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command removes role from the mentioned member";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?removerole <member> <role> <reason>"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
        
        if(!msgObject.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"]))
        {
            msgObject.channel.send("You dont have permission to perform this command!")
                .then(msg =>{
                    setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                });
            msgObject.delete();
            return;
        }
        else{
            let rMember = msgObject.mentions.members.first() || msgObject.guild.members.cache.find(m => m.user.tag === args[0]) || msgObject.guild.members.cache.get(args[0]);
            if(!rMember) 
            {
                msgObject.channel.send("Please provide a member to remove a role.")
                    .then(msg =>{
                        setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                    });
                msgObject.delete();
                return;
            }
            else{
                let role = msgObject.guild.roles.cache.find(r => r.name == args[1]) || msgObject.guild.roles.cache.find(r => r.id == args[1]) || msgObject.mentions.roles.first();
                if(!role) 
                { 
                    msgObject.channel.send("Please provide a valid role to remove from said member.")
                        .then(msg =>{
                            setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                        });
                    msgObject.delete();
                    return;
                }
                else{
                    let reason = args.slice(2).join(" ");
                    if(!reason) 
                    {
                        msgObject.channel.send("Please provide a valid reason for removing role fron the member")
                            .then(msg =>{
                                setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                            });
                        msgObject.delete();
                        return;
                    }
                    else
                    {
                        if(!msgObject.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"]))
                        { 
                            msgObject.channel.send("I don't have permission to perform this command.")
                                .then(msg =>{
                                    setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                                });
                            msgObject.delete();
                            return;
                        }
                        else
                        {
                            if(!rMember.roles.cache.has(role.id)) {
                                msgObject.channel.send(`${rMember.displayName}, doesn't have the role!`)
                                    .then(msg =>{
                                        setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                                    });
                                msgObject.delete();
                                return;
                            } 
                            else 
                            {
                                await rMember.roles.remove(role.id).catch(e => console.log(e.message));
                                msgObject.channel.send(`The role, **${role.name}**, has been removed from **${rMember.user}**.`)
                                    .then(msg =>{
                                        setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                                    });
                                msgObject.delete();
                            }
                        
                            let embed = new Discord.MessageEmbed()
                                .setColor("RANDOM")
                                .setAuthor(`${msgObject.guild.name} Modlogs`, msgObject.guild.iconURL())
                                .addField("Moderation:", "Remove role")
                                .addField("Member:", rMember.user.username)
                                .addField("Moderator:", msgObject.author.username)
                                .addField("Reason:", reason)
                                .addField("Date:", msgObject.createdAt.toLocaleString())

                            let sChannel = msgObject.guild.channels.cache.find(c => c.name === "mod-logs");
                            //@ts-ignore
                            sChannel.send(embed);
                        }
                    }
                }
            }
        }
    }
}
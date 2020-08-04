import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const ms = require("ms");

export default class mute implements IBotCommand {
    
    public readonly _command = "mute";
    public readonly aliases : string[] = ["mt"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "Admin/Mod/Manager only-this command mutes the mentioned person for a given limited time or by default time is 2 hours\ninput - ?mute time member reason, if dont wanna give time then give a space in between member and reason(can be empty) like this ?mute member <space> reason";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?mute <member> (time) (reason)"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
        
                // check if the command caller has permission to use the command
        if(!msgObject.member.hasPermission("MANAGE_ROLES") || !msgObject.guild.owner) {
            msgObject.channel.send("You dont have permission to use this command.")
                .then(msg =>{
                    setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                });
            msgObject.delete();
            return;    
        }    
        else if(!msgObject.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])){
            msgObject.channel.send("I don't have permission to add roles!")
                .then(msg =>{
                    setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                });
            msgObject.delete();
            return;
        }
        else{
            //define the reason and mutee
            let mutee = msgObject.mentions.members.first() || msgObject.guild.members.cache.get(args[0]);
            if(!mutee) 
            {
                msgObject.channel.send("Please supply a user to be muted!")
                    .then(msg =>{
                        setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                });
                msgObject.delete();
                return;
            }
            else{
                let reason = args.slice(2).join(" ");
                let time = args[1];
                if(!time)
                    time = "2h";
                if(!reason)
                    reason = "No reason given";

                //define mute role and if the mute role doesnt exist then create one
                let muterole = msgObject.guild.roles.cache.find(r => r.name === "Muted");
                if(!muterole) {
                    try{
                        let muterole = await msgObject.guild.roles.create({
                            data: {
                                name: "Muted",
                                color: "RED",
                                permissions: 0
                            },
                            reason: "Need a role for muted members",
                        })
                        msgObject.guild.channels.cache.forEach(async (channel, id) => {
                            await channel.updateOverwrite(muterole, {
                                SEND_MESSAGES: false,
                                ADD_REACTIONS: false,
                                SEND_TTS_MESSAGES: false,
                                ATTACH_FILES: false,
                                SPEAK: false,
                                ADMINISTRATOR: false,
                                MANAGE_ROLES: false,
                                USE_EXTERNAL_EMOJIS: false,
                                EMBED_LINKS: false,
                                MANAGE_MESSAGES: false,
                                MANAGE_WEBHOOKS: false,
                            });
                        })
                    } catch(e) {
                        console.log(e.stack);
                    }
                }
                let roleList = mutee.roles.cache;
                //removing any other role to the person mentioned
                mutee.roles.set([]);            
                //add role to the mentioned user and also send the user a dm explaing where and why they were muted
                mutee.roles.add(muterole);
                mutee.send(`Hello, you have been muted in ${msgObject.guild.name} for: ${reason}`);
                msgObject.channel.send(`${mutee.user.username} was successfully muted.`)
                    .then(msg =>{
                        setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                });
                msgObject.delete();
                //send an embed to the modlogs channel
                let embed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setAuthor(`${msgObject.guild.name} Modlogs`, `${msgObject.guild.iconURL()}`)
                    .addField("Moderation:", "mute")
                    .addField("Muted:", mutee.user.username)
                    .addField("Moderator:", msgObject.author.username)
                    .addField("Reason:", reason)
                    .addField("Date:", msgObject.createdAt.toLocaleString())
                    .addField("Duration", `${time}`)

                let sChannel = msgObject.guild.channels.cache.find(c => c.name === "mod-logs")
                //@ts-ignore
                sChannel.send(embed);
                setTimeout(function(){
                    mutee.roles.set(roleList);
                    mutee.roles.remove(muterole);
                    msgObject.channel.send(`${mutee.user.username} is unmuted now after ${time}`)
                        .then(msg =>{
                            setTimeout(function(){(msg as Discord.Message).delete()},ms("5s"));
                        });
                }, ms(time));
            }
        }
    }
}
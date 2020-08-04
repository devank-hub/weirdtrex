import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const fetch = require("node-fetch");

export default class meme implements IBotCommand {
    
    public readonly _command = "meme";
    public readonly aliases : string[] = ["mm"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "Displays a meme randomly";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    
    usage(): string {
        return "?meme"
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
        
        let msg = await msgObject.channel.send("Generating...")
            .then(msg =>{msg.delete({timeout: 3000})});

        fetch("https://apis.duncte123.me/meme")
        //@ts-ignore
        .then((res: any) => res.json()).then(body => {
            if(!body) return msgObject.reply("whoops! I've broke, try again!")
    
            let mEmbed = new Discord.MessageEmbed()
                .setColor("cyan")
                //.setAuthor(`${client.user.username} MEMES!`, `${msgObject.guild.iconURL}`)
                .setImage(body.data.image)
                .setTimestamp()
                .setFooter(client.user.username.toUpperCase(), `${client.user.displayAvatarURL()}`)
        if(msgObject.guild.channels.cache.find(c => c.name === "meme-images-posts"))
        {
            let cchannel = msgObject.guild.channels.cache.find(c => c.name === "meme-images-posts");
            //@ts-ignore
            cchannel.send(mEmbed);
            return;
        }
        else
            msgObject.channel.send(mEmbed);
        })
        msgObject.delete();
        return;
    }
}
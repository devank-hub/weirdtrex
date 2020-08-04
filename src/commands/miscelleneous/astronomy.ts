import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const { stripIndents } = require("common-tags");
const fetch = require("node-fetch");
const ms = require("ms");

export default class astronomy implements IBotCommand {
    
    public readonly _command = "astronomy";
    public readonly aliases : string[] = ["astro"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command is for gettting astronomical fact of the day";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?astronomy"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
        
        msgObject.channel.send("Generating . . . Please go to facts channel under FUN_STUFFS to see the outcome").then(msg => {msg.delete({timeout: 5000})});
        let data = await (await fetch(`https://api.nasa.gov/planetary/apod?api_key=MQlZMvvmV8rt09B5dBQXzhFR3f0Zlo183eIirhxp`)).json();
        let embed = new Discord.MessageEmbed()
            .setColor("CYAN")
            .setTitle(data.title)
            .setDescription(`**Explanation**\n${data.explanation}`)
            .setFooter(`**${data.copyright}**`)
            
        let cembed = new Discord.MessageEmbed()
            .setColor("random")
            .setImage(data.url)
        if(msgObject.guild.channels.cache.find(channel => channel.name === "facts"))
        {
            let cchannel = msgObject.guild.channels.cache.find(channel => channel.name === "facts");
            //@ts-ignore 
            cchannel.send(embed);
            //@ts-ignore    
            cchannel.send(cembed);
        }
        else{
            msgObject.channel.send(embed);
            msgObject.channel.send(cembed);
        }
        msgObject.delete();
        return;
    }

}
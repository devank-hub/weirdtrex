import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const ms = require("ms");

const cheerio = require('cheerio');
const request = require('request');

export default class image implements IBotCommand {
    
    public readonly _command = "image"
    public readonly aliases : string[] = ["img","i"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command brings up random image depending upon given keyword from google or will provide random wallpaper";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    
    usage(): string {
        return "?image <keyword>"
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
        
        msgObject.channel.send("Generating...")
            .then(msg =>{msg.delete({timeout: 3000})});
        if(!args[0])
            args[0] = "wallpaper";
        else
            args.join();
        console.log(args.join(' '));  
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + `${args.join(' ')}`,
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        };
        request(options, function(error: any, response: any, responseBody: any) {
            if (error) {
                return;
            }

            var x = cheerio.load(responseBody);
            var links = x(".image a.link");
            var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
           
            //console.log(urls);
            if (!urls.length) {
                return;
            }

            let embed = new Discord.MessageEmbed()
            embed.setImage(urls[Math.floor(Math.random() * urls.length)]);
            // Send result
            if(msgObject.guild.channels.cache.find(channel => channel.name === "meme-images-posts"))
            {
                let cchannel = msgObject.guild.channels.cache.find(channel => channel.name === "meme-images-posts");
                //@ts-ignore
                cchannel.send(embed);
            }
            else
                msgObject.channel.send(embed);
        });
        msgObject.delete();
    }

}
import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const ms = require("ms");
const fetch = require("node-fetch");

export default class randomf implements IBotCommand {
    
    public readonly _command = "randomf";
    public readonly aliases : string[] = ["rf","rfacts"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command posts a random fact reagrding numbers in **facts** channel";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?randomf"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {

        let c = Math.floor(Math.random() * 4);
        console.log(c);
        switch(c){
            case 1:
                let x = Math.floor(Math.random() * 2020) + 200;
                msgObject.channel.send("Generating facts from random year...go to facts channel and see")
                    .then(msg =>{msg.delete({timeout: 3000})});
                let data = await (await fetch(`https://numbersapi.p.rapidapi.com/${x}/year?fragment=true&json=true`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "numbersapi.p.rapidapi.com",
                        "x-rapidapi-key": "ac88a95d36mshb6131141b7ac1a2p126513jsn647183dccfb9"
                    }
                })).json();
                let embed = new Discord.MessageEmbed()
                    .setTitle(`**The Fact**`)
                    .setDescription(data.text)
                    .addField("Year :",`${data.number}`,true)
                    .addField("date :",`${data.date}`,true)
                if(msgObject.guild.channels.cache.find(f => f.name === "facts"))
                {    
                    let fchannel = msgObject.guild.channels.cache.find(f => f.name === "facts");
                    //@ts-ignore
                    fchannel.send(embed);
                }
                else
                {
                    msgObject.channel.send(embed);
                }
                msgObject.delete();
                break;
            
            case 2:
                let v = Math.floor(Math.random() * 30) + 1;
                let x1 = Math.floor(Math.random() * 12) + 1;
                msgObject.channel.send("Generating facts from random date...go to facts channel and see")
                    .then(msg =>{msg.delete({timeout: 3000})});
                let data1 = await (await fetch(`https://numbersapi.p.rapidapi.com/${x1}/${v}/date?fragment=true&json=true`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "numbersapi.p.rapidapi.com",
                        "x-rapidapi-key": "ac88a95d36mshb6131141b7ac1a2p126513jsn647183dccfb9"
                    }
                })).json();
                let cembed = new Discord.MessageEmbed()
                    .setTitle(`#${data1.number} :**The Fact** on ${v}/${x1}/${data1.year}`)
                    .setDescription(data1.text)
                    // .addField("Year :",data.year)
                if(msgObject.guild.channels.cache.find(f => f.name === "facts"))
                {
                    let gchannel = msgObject.guild.channels.cache.find(f => f.name === "facts");
                    //@ts-ignore
                    gchannel.send(cembed);
                }
                else
                {
                    msgObject.channel.send(cembed);
                }
                msgObject.delete();
                break;

            case 3:
                let v1 = Math.floor(Math.random() * 10000000000000000000000000000000000000000000000);
                msgObject.channel.send("Generating trivia facts...go to facts channel and see")
                    .then(msg =>{msg.delete({timeout: 3000})});
                let data2 = await (await fetch(`https://numbersapi.p.rapidapi.com/${v1}/trivia?fragment=true&notfound=floor&json=true`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "numbersapi.p.rapidapi.com",
                        "x-rapidapi-key": "ac88a95d36mshb6131141b7ac1a2p126513jsn647183dccfb9"
                    }
                })).json();
                let dembed = new Discord.MessageEmbed()
                    .setTitle(`**The Fact**`)
                    .setDescription(`${data2.text}\n Number : ${data2.number}`)
                    // .addField("Year :",data.year)
                if(msgObject.guild.channels.cache.find(f => f.name === "facts"))
                {
                    let hchannel = msgObject.guild.channels.cache.find(f => f.name === "facts");
                    //@ts-ignore
                    hchannel.send(dembed);
                }
                else
                {
                    msgObject.channel.send(dembed);
                }
                msgObject.delete();
                break;
            default:
                msgObject.channel.send("**Oops!!! I am broke now ,try again some time later**")
                    .then(msg =>{msg.delete({timeout: 5000})});
                msgObject.delete();
        }
        return;
    }
}
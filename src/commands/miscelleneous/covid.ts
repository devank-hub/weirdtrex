import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api"; 
import { compareAsc, format } from 'date-fns';
const fetch = require("node-fetch");
const ms = require("ms");


export default class covid implements IBotCommand {
    
    public readonly _command = "covid";
    public readonly aliases : string[] = ["cov","cv"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command shows covide outbreak stats at various countries";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?covid <country_name>"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
        
        if(!args[0])
        {
            msgObject.channel.send("Please provide a valid country name")
                .then(msg =>{
                    setTimeout(function(){(msg as Discord.Message).delete()},ms("3s"));
            });
            msgObject.delete();
            return;
        }
        else
        {
            let cname = args.join(" ");
            msgObject.channel.send("Generating...")
                .then(msg =>{msg.delete({timeout:3000})});
            //console.log("gets here");
            let data = await (await fetch(`https://corona.lmao.ninja/v2/countries/${cname}?yesterday=false`)).json();
            let x = data.recovered;
            let y = data.deaths;
            let z = data.cases;
            let t = (x/z * 100).toPrecision(7);
            let u = (y/z * 100).toPrecision(7);
            var timestamp = data.updated;
            var date = new Date(timestamp).toUTCString();
            var dat = new Date(date).toLocaleString();
            let embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle(`${data.country}'s COVID Stats`)
                .setThumbnail(data.countryInfo.flag)
                .addField("Updated on(IST:+5:30)",dat)
                .addField("Total Confirmed Cases",data.cases,true)
                .addField("Today's Cases",data.todayCases,true)
                .addField("Today's Deaths",data.todayDeaths,true)
                .addField("Active: ",data.active,true)
                .addField("Recovered: ",data.recovered,true)
                .addField("Recovery Rate:,",`${t}%`,true)
                .addField("Deaths: ",data.deaths,true)
                .addField("Death Rate:,",`${u}%`,true)
                .addField("Tests: ",data.tests,true)
                .addField("Critical Cases: ",data.critical,true)
                .addField("Tests per One-Million: ",data.testsPerOneMillion,true)
                .addField("Total Tests: ",data.tests,true)
                .setFooter(`WeirdTrex | created by Ank`, `${client.user.displayAvatarURL()}`)
            msgObject.channel.send(embed);
            //console.log("gets here")
            msgObject.delete();
        }
    }
}        
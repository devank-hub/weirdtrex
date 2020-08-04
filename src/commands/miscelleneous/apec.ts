import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const fetch = require("node-fetch");

export default class apec implements IBotCommand {
    
    public readonly _command = "apec";
    public readonly aliases : string[] = [];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = false;
    
    help(): string {
        return "this command shows apex legends profile details(only pc platform)";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    usage(): string {
        return "?apec <apex origin username>"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
        
        if(!args[0])
        {
            msgObject.channel.send("Please supply username and try again")
            .then(msg=>{msg.delete({timeout: 3000})});
            msgObject.delete();
            return;
        }
        else
        {
            
            const trackerToken = "d1195ddd-1f45-43fe-8fe9-4b90c76691b7"; //Token for Tracker Network API
            const trackerUrl = 'https://public-api.tracker.gg/v2/apex/standard/profile/';
            const platform = "origin";
            const username = args[0];
            const headers = { 'Content-Type': 'application/json', 'TRN-Api-Key': trackerToken };
            const response = await fetch(`${trackerUrl}${platform}/${username}`, { method: 'GET', headers: headers })
                .then((response: any) => response.json())
                .then((json: any)=> json.data)
                .catch((error: any)=> msgObject.reply('Something went wrong retrieving the information.'));
            //console.log(response);
            console.log(response.segments[1].metadata.isActive);// returns undefined;
            var i: any;
            for(i = 0; i < response.segments.length; i++)
            {
                console.log(i);
                console.log(response.segments[i].metadata.isActive);
                if(response.segments[i].metadata.isActive === true)// returns undefined, didn't read docs but probably a boolean and you used a strict equal so it probably is never true
                {
                    console.log(i);
                    let embed = new Discord.MessageEmbed()
                        .setColor("CYAN")
                        .setTitle(`${response.platformInfo.platformUserIdentifier}'s Stats`)
                        .setImage(`${response.platformInfo.avatarUrl}`)
                        .addField("Showing: ",`${response.segments[0].metadata.name}`,true)
                        .addField("Account Level: ",`${response.segments[0].stats.level.value}`,true)
                        .addField("Level completion percentage: ",`${response.segments[0].stats.level.percentile}%`,true)
                        .addField("Kills(combat): ",`${response.segments[0].stats.kills.value}`,true)
                        .addField("Damage done: ",`${response.segments[0].stats.damage.value}`,true)
                        //.addField("Times placed Top 3: ",`${response.segments[0].stats.timesPlacedtop3.value}`,true)
                        .addField("Rank in season: ",`${response.segments[0].stats.rankScore.metadata.rankName}`)
                        .setThumbnail(`${response.segments[0].stats.rankScore.metadata.iconUrl}`)
                        .addField("Rank-Score in season: ",`${response.segments[0].stats.rankScore.value}`,true)
                        .addField("Season 4 wins: ",`${response.segments[0].stats.season4Wins.value}`,true)
                        .addField("Active legend: ",`${response.segments[i].metadata.name}`)
                        .addField("Active legend's Kills: ",`${response.segments[i].stats.kills.value}`,true)
                        .addField("Active legend's Damage: ",`${response.segments[i].stats.damage.value}`,true)
                        .addField("Active legend's Headshots: ",`${response.segments[i].stats.headshots.value}`,true)

                    msgObject.channel.send(embed);
                    msgObject.delete();
                    return;
                }
                //console.log(i);
            }
        }
    }
}
import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const weatherr = require('weather-js');

export default class weather implements IBotCommand {
    
    public readonly _command = "weather";
    public readonly aliases : string[] = [];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command does absolutely nothing! Don't go open it for curiosity";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?weather <place_name>"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
        
        if (!args[0])
        { 
            msgObject.channel.send(`Please provide a location.`).then(m => {m.delete({timeout: 3000})});
            return;
        }
        else
        {
            //@ts-ignore
            weatherr.find({
                search: args.join(" "),
                degreeType: 'C'
            }, function (err: any, result: any) {
                if (err) 
                    msgObject.channel.send(err);
                
                if (result === undefined || result.length === 0)
                { 
                    msgObject.channel.send('**Please enter a valid location.**').then(m => {m.delete({timeout: 3000})});
                    return;
                }
                else
                {
                    var {
                        current,
                        location
                    } = result[0];
                    msgObject.channel.send(new Discord.MessageEmbed().setAuthor(`Weather for ${
                        current.observationpoint
                    }`).setDescription(`**${
                        current.skytext
                    }**`).setColor(0x00AE86).addField('Timezone', `UTC +${
                        location.timezone
                    }`, true).addField('Degree Type', location.degreetype, true).addField('Temperature', `${
                        current.temperature
                    } Degrees`, true).addField('Feels Like', `${
                        current.feelslike
                    } Degrees`, true).addField('Winds', current.winddisplay, true).addField('Humidity', `${
                        current.humidity
                    }%`, true).setThumbnail(current.imageUrl));
                }
            });
        }
    }
}
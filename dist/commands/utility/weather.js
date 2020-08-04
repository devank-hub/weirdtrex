"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const path = require("path");
const weatherr = require('weather-js');
class weather {
    constructor() {
        this._command = "weather";
        this.aliases = [];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "this command does absolutely nothing! Don't go open it for curiosity";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?weather <place_name>";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args[0]) {
                msgObject.channel.send(`Please provide a location.`).then(m => { m.delete({ timeout: 3000 }); });
                return;
            }
            else {
                weatherr.find({
                    search: args.join(" "),
                    degreeType: 'C'
                }, function (err, result) {
                    if (err)
                        msgObject.channel.send(err);
                    if (result === undefined || result.length === 0) {
                        msgObject.channel.send('**Please enter a valid location.**').then(m => { m.delete({ timeout: 3000 }); });
                        return;
                    }
                    else {
                        var { current, location } = result[0];
                        msgObject.channel.send(new Discord.MessageEmbed().setAuthor(`Weather for ${current.observationpoint}`).setDescription(`**${current.skytext}**`).setColor(0x00AE86).addField('Timezone', `UTC +${location.timezone}`, true).addField('Degree Type', location.degreetype, true).addField('Temperature', `${current.temperature} Degrees`, true).addField('Feels Like', `${current.feelslike} Degrees`, true).addField('Winds', current.winddisplay, true).addField('Humidity', `${current.humidity}%`, true).setThumbnail(current.imageUrl));
                    }
                });
            }
        });
    }
}
exports.default = weather;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy91dGlsaXR5L3dlYXRoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsNkJBQTZCO0FBRTdCLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUV2QyxNQUFxQixPQUFPO0lBQTVCO1FBRW9CLGFBQVEsR0FBRyxTQUFTLENBQUM7UUFDckIsWUFBTyxHQUFjLEVBQUUsQ0FBQztRQUN4QixhQUFRLEdBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QyxZQUFPLEdBQWEsSUFBSSxDQUFDO0lBMEQ3QyxDQUFDO0lBeERHLElBQUk7UUFDQSxPQUFPLHNFQUFzRSxDQUFDO0lBQ2xGLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFDRCxLQUFLO1FBQ0QsT0FBTyx1QkFBdUIsQ0FBQTtJQUNsQyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUUvRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNaO2dCQUNJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7Z0JBQzVGLE9BQU87YUFDVjtpQkFFRDtnQkFFSSxRQUFRLENBQUMsSUFBSSxDQUFDO29CQUNWLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDdEIsVUFBVSxFQUFFLEdBQUc7aUJBQ2xCLEVBQUUsVUFBVSxHQUFRLEVBQUUsTUFBVztvQkFDOUIsSUFBSSxHQUFHO3dCQUNILFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUVoQyxJQUFJLE1BQU0sS0FBSyxTQUFTLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQy9DO3dCQUNJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG9DQUFvQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7d0JBQ3BHLE9BQU87cUJBQ1Y7eUJBRUQ7d0JBQ0ksSUFBSSxFQUNBLE9BQU8sRUFDUCxRQUFRLEVBQ1gsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2QsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDLGVBQ3hELE9BQU8sQ0FBQyxnQkFDWixFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsS0FDZixPQUFPLENBQUMsT0FDWixJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxRQUMxQyxRQUFRLENBQUMsUUFDYixFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsR0FDakYsT0FBTyxDQUFDLFdBQ1osVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsR0FDckMsT0FBTyxDQUFDLFNBQ1osVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLEdBQ2hGLE9BQU8sQ0FBQyxRQUNaLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7cUJBQzlDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDO0tBQUE7Q0FDSjtBQS9ERCwwQkErREMifQ==
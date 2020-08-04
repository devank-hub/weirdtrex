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
const { stripIndents } = require("common-tags");
const fetch = require("node-fetch");
const ms = require("ms");
class newcovid {
    constructor() {
        this._command = "newcovid";
        this.aliases = ["ncov"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "this command is for testing covid data tally";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?newcovid";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield (yield fetch(`https://coronavirus-tracker-api.herokuapp.com/all`)).json();
            let embed = new Discord.MessageEmbed()
                .addField("Confirmed", stripIndents `
                **Total Cases:** ${data.confirmed.latest}
                **Total Locations:** ${data.confirmed.locations.length}
                **Last Updated:** ${data.confirmed.last_updated}
            `)
                .addField("Deaths", stripIndents `
                **Total Deaths:** ${data.deaths.latest}
                **Total Locations:** ${data.deaths.locations.length}
                **Last Updated:** ${data.deaths.last_updated}
            `)
                .addField("Recovered", stripIndents `
                **Total Recoveries:** ${data.recovered.latest}
                **Total Locations:** ${data.recovered.locations.length}
                **Last Updated:** ${data.recovered.last_updated}
            `);
            msgObject.channel.send(embed);
            msgObject.delete();
            return;
        });
    }
}
exports.default = newcovid;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3Y292aWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvbWlzY2VsbGVuZW91cy9uZXdjb3ZpZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0Qyw2QkFBNkI7QUFFN0IsTUFBTSxFQUFFLFlBQVksRUFBRSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNoRCxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDcEMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXpCLE1BQXFCLFFBQVE7SUFBN0I7UUFFb0IsYUFBUSxHQUFHLFVBQVUsQ0FBQztRQUN0QixZQUFPLEdBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QixhQUFRLEdBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QyxZQUFPLEdBQWEsSUFBSSxDQUFDO0lBcUM3QyxDQUFDO0lBbkNHLElBQUk7UUFDQSxPQUFPLDhDQUE4QyxDQUFDO0lBQzFELENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFDRCxLQUFLO1FBQ0QsT0FBTyxXQUFXLENBQUE7SUFDdEIsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFFL0UsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMzRixJQUFJLEtBQUssR0FBRyxJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7aUJBQ2pDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFBO21DQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTTt1Q0FDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTTtvQ0FDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZO2FBQ2xELENBQUM7aUJBQ0QsUUFBUSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUE7b0NBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO3VDQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU07b0NBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWTthQUMvQyxDQUFDO2lCQUNELFFBQVEsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFBO3dDQUNQLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTTt1Q0FDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTTtvQ0FDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZO2FBQ2xELENBQUMsQ0FBQTtZQUNOLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlCLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQixPQUFPO1FBQ1gsQ0FBQztLQUFBO0NBRUo7QUExQ0QsMkJBMENDIn0=
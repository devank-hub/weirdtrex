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
const fetch = require("node-fetch");
const ms = require("ms");
class covid {
    constructor() {
        this._command = "covid";
        this.aliases = ["cov", "cv"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "this command shows covide outbreak stats at various countries";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?covid <country_name>";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args[0]) {
                msgObject.channel.send("Please provide a valid country name")
                    .then(msg => {
                    setTimeout(function () { msg.delete(); }, ms("3s"));
                });
                msgObject.delete();
                return;
            }
            else {
                let cname = args.join(" ");
                msgObject.channel.send("Generating...")
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                let data = yield (yield fetch(`https://corona.lmao.ninja/v2/countries/${cname}?yesterday=false`)).json();
                let x = data.recovered;
                let y = data.deaths;
                let z = data.cases;
                let t = (x / z * 100).toPrecision(7);
                let u = (y / z * 100).toPrecision(7);
                var timestamp = data.updated;
                var date = new Date(timestamp).toUTCString();
                var dat = new Date(date).toLocaleString();
                let embed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle(`${data.country}'s COVID Stats`)
                    .setThumbnail(data.countryInfo.flag)
                    .addField("Updated on(IST:+5:30)", dat)
                    .addField("Total Confirmed Cases", data.cases, true)
                    .addField("Today's Cases", data.todayCases, true)
                    .addField("Today's Deaths", data.todayDeaths, true)
                    .addField("Active: ", data.active, true)
                    .addField("Recovered: ", data.recovered, true)
                    .addField("Recovery Rate:,", `${t}%`, true)
                    .addField("Deaths: ", data.deaths, true)
                    .addField("Death Rate:,", `${u}%`, true)
                    .addField("Tests: ", data.tests, true)
                    .addField("Critical Cases: ", data.critical, true)
                    .addField("Tests per One-Million: ", data.testsPerOneMillion, true)
                    .addField("Total Tests: ", data.tests, true)
                    .setFooter(`WeirdTrex | created by Ank`, `${client.user.displayAvatarURL()}`);
                msgObject.channel.send(embed);
                msgObject.delete();
            }
        });
    }
}
exports.default = covid;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY292aWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvbWlzY2VsbGVuZW91cy9jb3ZpZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0Qyw2QkFBNkI7QUFHN0IsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUd6QixNQUFxQixLQUFLO0lBQTFCO1FBRW9CLGFBQVEsR0FBRyxPQUFPLENBQUM7UUFDbkIsWUFBTyxHQUFjLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLGFBQVEsR0FBWSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdDLFlBQU8sR0FBYSxJQUFJLENBQUM7SUE4RDdDLENBQUM7SUE1REcsSUFBSTtRQUNBLE9BQU8sK0RBQStELENBQUM7SUFDM0UsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLE9BQU8sT0FBTyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDckMsQ0FBQztJQUNELEtBQUs7UUFDRCxPQUFPLHVCQUF1QixDQUFBO0lBQ2xDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBRS9FLElBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1g7Z0JBQ0ksU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMscUNBQXFDLENBQUM7cUJBQ3hELElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDUixVQUFVLENBQUMsY0FBWSxHQUF1QixDQUFDLE1BQU0sRUFBRSxDQUFBLENBQUEsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUMzRSxDQUFDLENBQUMsQ0FBQztnQkFDSCxTQUFTLENBQUMsTUFBTSxF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
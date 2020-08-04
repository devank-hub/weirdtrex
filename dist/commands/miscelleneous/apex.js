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
const Canvas = require('canvas');
const fetch = require("node-fetch");
const FONT_PATH = 'C:/Users/ank/Documents/WeirdTrexy/fonts/blocktastic.otf';
const FONT_FAMILY = 'Blocktastic';
const LARGE_FONT = '36px';
const SMALL_FONT = '16px';
const BANNER_PATH = 'C:/Users/ank/Documents/WeirdTrexy/images/level-bg.png';
const BANNER_PATH1 = 'C:/Users/ank/Documents/WeirdTrexy/images/apexs5.png';
const CANVAS_WIDTH = 1300;
const CANVAS_HEIGHT = 705;
const LEFT_PANEL_WIDTH = 350;
const LEFT_PANEL_COLOR = '#272727';
const RIGHT_PANEL_COLOR = '#db2b29';
const TEXT_COLOR = '#ffffff';
const DISCORD_IMAGE_NAME = 'stats-image.png';
class apex {
    constructor() {
        this._command = "apex";
        this.aliases = [];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "this command shows apex legends profile details**(only pc platform)**";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?apex <apex ORIGIN username>";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!args[0]) {
                msgObject.channel.send("Please supply username and try again")
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                msgObject.delete();
                return;
            }
            else {
                msgObject.channel.send("If nothing comes in result in 4-5 seconds then there is problem with provided username,please check it again and try again")
                    .then(msg => { msg.delete({ timeout: 30000 }); });
                const trackerToken = "d1195ddd-1f45-43fe-8fe9-4b90c76691b7";
                const trackerUrl = 'https://public-api.tracker.gg/v2/apex/standard/profile/';
                const platform = "origin";
                const username = args[0];
                const headers = { 'Content-Type': 'application/json', 'TRN-Api-Key': trackerToken };
                const response = yield fetch(`${trackerUrl}${platform}/${username}`, { method: 'GET', headers: headers })
                    .then((response) => response.json())
                    .then((json) => json.data)
                    .catch((error) => msgObject.reply('Something went wrong retrieving the information.'));
                let data = yield (yield fetch(`https://api.mozambiquehe.re/bridge?version=4&platform=PC&player=${username}&auth=fPs0jPfzsSjTbDflIyuj`)).json();
                if (data.error == "Player not found. Please try again (err 1 / fatal error)") {
                    msgObject.channel.send("The provided username does not exist in the database of apex or could not be found,please provide a valid username")
                        .then(msg => { msg.delete({ timeout: 3000 }); });
                    msgObject.delete();
                    return;
                }
                else {
                    msgObject.channel.send("Generating details . . . Please wait 4 - 5 seconds")
                        .then(msg => { msg.delete({ timeout: 4000 }); });
                    msgObject.delete();
                    const { toNextLevelPercent: levelbar, battlepass: { level: blevel } } = data.global;
                    const { displayValue: playerLevel } = response.segments[0].stats.level;
                    const { metadata: { name: legendName, imageUrl: legendBanner }, stats } = response.segments[1];
                    const { metadata: { rankName: playerrank, iconUrl: icon }, displayValue: rankValue } = response.segments[0].stats.rankScore;
                    const { avatarUrl: avatar } = response.platformInfo;
                    const { kills: { displayValue: killv }, headshots: { displayValue: hs }, damage: { displayValue: dmv } } = response.segments[0].stats;
                    const { metadata: { name: lname } } = response.segments[0];
                    let c = levelbar;
                    const canvas = Canvas.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
                    const ctx = canvas.getContext('2d');
                    Canvas.registerFont(FONT_PATH, { family: FONT_FAMILY });
                    ctx.fillStyle = LEFT_PANEL_COLOR;
                    ctx.fillRect(0, 0, LEFT_PANEL_WIDTH + 25, canvas.height);
                    ctx.fillStyle = RIGHT_PANEL_COLOR;
                    ctx.fillRect(LEFT_PANEL_WIDTH, 0, canvas.width, canvas.height);
                    const icon1 = yield Canvas.loadImage(icon);
                    ctx.drawImage(icon1, 700, 515, 170, 170);
                    const levelbg = yield Canvas.loadImage(BANNER_PATH);
                    ctx.drawImage(levelbg, 325, 15, 375, 96);
                    ctx.fillStyle = LEFT_PANEL_COLOR;
                    ctx.fillRect(454, 67, 217, 35);
                    ctx.fillStyle = RIGHT_PANEL_COLOR;
                    ctx.fillRect(458, 70, c * 2.09, 26);
                    const levelbg1 = yield Canvas.loadImage(BANNER_PATH1);
                    ctx.drawImage(levelbg1, 900, 0, 380, 600);
                    ctx.fillStyle = TEXT_COLOR;
                    ctx.font = `${LARGE_FONT} "${FONT_FAMILY}"`;
                    ctx.textAlign = 'left';
                    ctx.fillStyle = `#FFDC73`;
                    ctx.fillText(`${username.toUpperCase()}`, 460, 50);
                    const userData = Object.values(stats);
                    if (!Array.isArray(userData) || !userData.length) {
                        ctx.fillText(`:(  No Trackers Active`, 355, 180);
                        ctx.fillRect(355, 190, 315, 2);
                    }
                    else {
                        userData.map((value, index) => {
                            if (index <= 4) {
                                ctx.fillStyle = `#000000`;
                                ctx.fillText(`${value.displayName}: ${value.displayValue}`, 355, 160 + index * 60);
                                ctx.fillStyle = `#FFDC73`;
                                ctx.fillRect(355, 170 + index * 60, 445, 2);
                            }
                            ctx.fillStyle = `#000000`;
                            ctx.fillText(`${playerrank}`, 355, 170 + 5 * 60);
                            ctx.fillText(`Rank points: ${rankValue}`, 510, 170 + 5 * 60);
                            ctx.fillStyle = `#FFDC73`;
                            ctx.fillRect(355, 180 + 5 * 60, 445, 2);
                            ctx.fillStyle = `#000000`;
                            ctx.fillText(`${lname}`, 355, 165 + 6 * 60);
                            ctx.fillStyle = `#FFDC73`;
                            ctx.fillRect(355, 180 + 6 * 60, 300, 5);
                            ctx.fillStyle = `#000000`;
                            ctx.fillText(`Total Kills: ${killv}`, 355, 160 + 7 * 60);
                            ctx.fillText(`Total dmage: ${dmv}`, 355, 155 + 8 * 60);
                            ctx.fillText(`Headshots: ${hs}`, 355, 150 + 9 * 60);
                        });
                    }
                    ctx.textAlign = 'center';
                    ctx.font = `43px "${FONT_FAMILY}"`;
                    ctx.fillStyle = `#FFDC73`;
                    ctx.fillText(`Battlepass Level: ${blevel}`, 1090, 670);
                    ctx.font = `50px "${FONT_FAMILY}"`;
                    ctx.fillStyle = `#FFDC73`;
                    ctx.fillText(`${legendName.toUpperCase()}`, 162.5, 675);
                    ctx.fillStyle = `#000000`;
                    ctx.fillText(`${playerLevel}`, 403, 80);
                    ctx.font = `${SMALL_FONT} "${FONT_FAMILY}"`;
                    ctx.fillText('LEVEL', 403, 45);
                    const legend = yield Canvas.loadImage(legendBanner);
                    ctx.drawImage(legend, -78, 0, 510, 650);
                    ctx.beginPath();
                    ctx.arc(790, 95, 70, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.clip();
                    const dp = yield Canvas.loadImage(avatar);
                    ctx.drawImage(dp, 690, 4, 180, 180);
                    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), DISCORD_IMAGE_NAME);
                    return msgObject.reply(attachment)
                        .then(msg => { msg.delete({ timeout: 25000 }); });
                }
            }
        });
    }
}
exports.default = apex;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBleC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9taXNjZWxsZW5lb3VzL2FwZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsNkJBQTZCO0FBRTdCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFcEMsTUFBTSxTQUFTLEdBQUcseURBQXlELENBQUM7QUFDNUUsTUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDO0FBQ2xDLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQztBQUMxQixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUM7QUFFMUIsTUFBTSxXQUFXLEdBQUcsdURBQXVELENBQUM7QUFDNUUsTUFBTSxZQUFZLEdBQUcscURBQXFELENBQUM7QUFDM0UsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDO0FBQzFCLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQztBQUMxQixNQUFNLGdCQUFnQixHQUFHLEdBQUcsQ0FBQztBQUM3QixNQUFNLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztBQUNuQyxNQUFNLGlCQUFpQixHQUFHLFNBQVMsQ0FBQztBQUNwQyxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUM7QUFDN0IsTUFBTSxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQztBQUU3QyxNQUFxQixJQUFJO0lBQXpCO1FBRW9CLGFBQVEsR0FBRyxNQUFNLENBQUM7UUFDbEIsWUFBTyxHQUFjLEVBQUUsQ0FBQztRQUN4QixhQUFRLEdBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QyxZQUFPLEdBQWEsSUFBSSxDQUFDO0lBeUs3QyxDQUFDO0lBdktHLElBQUk7UUFDQSxPQUFPLHVFQUF1RSxDQUFDO0lBQ25GLENBQUM7SUFFRCxhQUFhLENBQUMsT0FB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QUMsR0FBRyxFQUFFLEdBQUcsR0FBRyxLQUFLLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzs2QkFDL0M7NEJBQ0QsR0FBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7NEJBQzFCLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxVQUFVLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQzs0QkFDakQsR0FBRyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFFLENBQUM7NEJBQzlELEdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDOzRCQUMxQixHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQ3hDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDOzRCQUMxQixHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7NEJBQzVDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDOzRCQUMxQixHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQ3hDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDOzRCQUMxQixHQUFHLENBQUMsUUFBUSxDQUFDLGdCQUFnQixLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQzs0QkFDekQsR0FBRyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxD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
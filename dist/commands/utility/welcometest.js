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
const Canvas = require("canvas");
const FONT_PATH = 'C:/Users/ank/Documents/WeirdTrexy/fonts/sword.otf';
const FONT_FAMILY = 'Sword Regular';
class welcometest {
    constructor() {
        this._command = "welcometest";
        this.aliases = ["wt"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "this command shows welcome banner test modules which could be implemented by using wcupdate command";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?welcometest <direct url of the image> <model_number>";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const applyText = (canvas, text) => {
                const ctx = canvas.getContext('2d');
                Canvas.registerFont(FONT_PATH, { family: FONT_FAMILY });
                let LARGE_FONT = 120;
                do {
                    ctx.font = `${LARGE_FONT -= 10}px ${FONT_FAMILY}`;
                } while (ctx.measureText(text).width > canvas.width - 875);
                return ctx.font;
            };
            const channel = msgObject.guild.channels.cache.find((ch) => ch.name === 'bot-testing');
            if (!channel) {
                msgObject.channel.send("The required channel(**welcome**) could not found on this server,so cant show/work to give output")
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                msgObject.delete();
                return;
            }
            else {
                if (!args[0] || !msgObject.content.includes("https://" || "http://")) {
                    msgObject.channel.send("**Direct link** of the image is require,without it,sorry cant show output")
                        .then(msg => { msg.delete({ timeout: 3000 }); });
                    msgObject.delete();
                    return;
                }
                else {
                    const bgimage = args[0];
                    const canvas = Canvas.createCanvas(1500, 350);
                    const ctx = canvas.getContext('2d');
                    const background = yield Canvas.loadImage(bgimage);
                    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                    ctx.strokeStyle = '#74037b';
                    ctx.strokeRect(0, 0, canvas.width, canvas.height);
                    let c = Number(args[1]);
                    if (!args[1]) {
                        msgObject.channel.send("as no choice is given so default model no. 1 is choosen");
                        c = 1;
                    }
                    else {
                        switch (c) {
                            case 1:
                                ctx.font = applyText(canvas, msgObject.member.user.username);
                                ctx.fillStyle = '#ff0303';
                                ctx.fillText(`${msgObject.member.user.username},`, canvas.width / 1.8, canvas.height / 2.5);
                                ctx.fillStyle = `#ffffff`;
                                ctx.font = `60px "${FONT_FAMILY}"`;
                                ctx.fillText(`\nWelcome \nto the`, canvas.width / 1.7, canvas.height / 2.5);
                                ctx.fillStyle = `#fff200`;
                                ctx.font = `60px "${FONT_FAMILY}"`;
                                ctx.fillText(`\n${msgObject.member.guild.name}`, canvas.width / 1.7, canvas.height / 1.35);
                                ctx.beginPath();
                                ctx.arc(710, 235, 95, 0, Math.PI * 2, true);
                                ctx.closePath();
                                ctx.clip();
                                const avatar = yield Canvas.loadImage(msgObject.member.user.displayAvatarURL({ format: 'jpg' }));
                                ctx.drawImage(avatar, 615, 140, 190, 190);
                                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'banner-image.png');
                                channel.send(attachment);
                                msgObject.delete();
                                break;
                            case 2:
                                ctx.font = applyText(canvas, msgObject.member.user.username);
                                ctx.fillStyle = '#ff0303';
                                ctx.rotate(12 * Math.PI / 180);
                                ctx.fillText(`${msgObject.member.user.username},`, canvas.width / 1.74, -95);
                                ctx.fillStyle = `#ffffff`;
                                ctx.font = `60px "${FONT_FAMILY}"`;
                                ctx.fillText(`Welcome to the`, 858, 5);
                                ctx.fillStyle = `#fff200`;
                                ctx.fillText(`\n${msgObject.member.guild.name}`, 858, 10);
                                ctx.fillRect(852, 90, 300, 10);
                                ctx.rotate(-12 * Math.PI / 180);
                                ctx.beginPath();
                                ctx.arc(490, 190, 85, 0, Math.PI * 2, true);
                                ctx.closePath();
                                ctx.clip();
                                const avatar1 = yield Canvas.loadImage(msgObject.member.user.displayAvatarURL({ format: 'jpg' }));
                                ctx.drawImage(avatar1, 405, 102, 180, 180);
                                const attachment1 = new Discord.MessageAttachment(canvas.toBuffer(), 'banner-image.png');
                                channel.send(attachment1);
                                msgObject.delete();
                                break;
                            case 3:
                                ctx.fillStyle = '#01ffff';
                                ctx.fillText(`${msgObject.member.user.username},`, canvas.width / 6.5, canvas.height / 3.5);
                                ctx.fillStyle = `#ffffff`;
                                ctx.font = `60px "${FONT_FAMILY}"`;
                                ctx.fillText(`\nWelcome`, canvas.width / 5.1, canvas.height / 2.5);
                                ctx.fillText(`\nto the`, canvas.width / 4.1, canvas.height / 1.7);
                                ctx.font = `80px "${FONT_FAMILY}"`;
                                ctx.fillStyle = `#fff200`;
                                ctx.fillText(`\n${msgObject.member.guild.name} !`, canvas.width / 1.475, canvas.height / 2.8);
                                const avatar3 = yield Canvas.loadImage(msgObject.guild.iconURL({ format: 'jpg' }));
                                ctx.drawImage(avatar3, 710, 90, 190, 190);
                                ctx.beginPath();
                                ctx.arc(145, 205, 105, 0, Math.PI * 2, true);
                                ctx.closePath();
                                ctx.clip();
                                ctx.fillStyle = `#ffffff`;
                                ctx.fill();
                                ctx.beginPath();
                                ctx.arc(145, 205, 95, 0, Math.PI * 2, true);
                                ctx.closePath();
                                ctx.clip();
                                const avatar2 = yield Canvas.loadImage(msgObject.member.user.displayAvatarURL({ format: 'jpg' }));
                                ctx.drawImage(avatar2, 50, 110, 190, 190);
                                const attachment2 = new Discord.MessageAttachment(canvas.toBuffer(), 'banner-image.png');
                                channel.send(attachment2);
                                msgObject.delete();
                                break;
                            case 4:
                                ctx.font = applyText(canvas, msgObject.member.user.username);
                                ctx.fillStyle = '#ff0303';
                                ctx.fillText(`${msgObject.member.user.username},`, canvas.width / 1.8, canvas.height / 2.5);
                                ctx.fillStyle = `#ffffff`;
                                ctx.font = `60px "${FONT_FAMILY}"`;
                                ctx.fillText(`\nWelcome \nto the`, canvas.width / 1.7, canvas.height / 2.5);
                                ctx.fillStyle = `#fff200`;
                                ctx.font = `60px "${FONT_FAMILY}"`;
                                ctx.fillText(`\n${msgObject.member.guild.name}`, canvas.width / 1.7, canvas.height / 1.35);
                                ctx.drawImage(avatar3, 710, 90, 190, 190);
                                ctx.beginPath();
                                ctx.arc(145, 205, 105, 0, Math.PI * 2, true);
                                ctx.closePath();
                                ctx.clip();
                                ctx.fillStyle = `#ffffff`;
                                ctx.fill();
                                ctx.beginPath();
                                ctx.arc(145, 205, 95, 0, Math.PI * 2, true);
                                ctx.closePath();
                                ctx.clip();
                                const avatar4 = yield Canvas.loadImage(msgObject.member.user.displayAvatarURL({ format: 'jpg' }));
                                ctx.drawImage(avatar4, 615, 140, 190, 190);
                                const attachment3 = new Discord.MessageAttachment(canvas.toBuffer(), 'banner-image.png');
                                channel.send(attachment3);
                                msgObject.delete();
                                break;
                        }
                    }
                }
            }
        });
    }
}
exports.default = welcometest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VsY29tZXRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvdXRpbGl0eS93ZWxjb21ldGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFzQztBQUN0Qyw2QkFBNkI7QUFHN0IsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pDLE1BQU0sU0FBUyxHQUFHLG1EQUFtRCxDQUFDO0FBQ3RFLE1BQU0sV0FBVyxHQUFHLGVBQWUsQ0FBQztBQUVwQyxNQUFxQixXQUFXO0lBQWhDO1FBRW9CLGFBQVEsR0FBRyxhQUFhLENBQUM7UUFDekIsWUFBTyxHQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsYUFBUSxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsWUFBTyxHQUFhLElBQUksQ0FBQztJQTZLN0MsQ0FBQztJQTNLRyxJQUFJO1FBQ0EsT0FBTyxxR0FBcUcsQ0FBQztJQUNqSCxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsS0FBSztRQUNELE9BQU8sdURBQXVELENBQUE7SUFDbEUsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFFM0UsTUFBTSxTQUFTLEdBQUcsQ0FBQyxNQUFXLEVBQUUsSUFBUyxFQUFFLEVBQUU7Z0JBQzdDLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRXBDLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7Z0JBQ3hELElBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQztnQkFDckIsR0FBRztvQkFFQyxHQUFHLENBQUMsSUFB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QUNuQyxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dDQUNuRSxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dDQUNsRSxHQUFHLENBQUMsSUFBSSxHQUFHLFNBQVMsV0FBVyxHQUFHLENBQUM7Z0NBQ25DLEdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO2dDQUMxQixHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztnQ0FDOUYsTUFBTSxPQUFPLEdBQUcsTUFBTSxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQ0FDbkYsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0NBQzFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQ0FDaEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0NBQzdDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQ0FDaEIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO2dDQUNYLEdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO2dDQUMxQixHQUFHLENBQUMsSUFBSSxFQUFFLENB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
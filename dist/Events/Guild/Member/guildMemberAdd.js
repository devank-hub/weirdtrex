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
const Canvas = require("canvas");
const Database = require('better-sqlite3');
const db = new Database('bot.sqlite');
const FONT_PATH = 'C:/Users/ank/Documents/WeirdTrexy/fonts/sword.otf';
const FONT_FAMILY = 'Sword Regular';
const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');
    Canvas.registerFont(FONT_PATH, { family: FONT_FAMILY });
    let LARGE_FONT = 120;
    do {
        ctx.font = `${LARGE_FONT -= 10}px ${FONT_FAMILY}`;
    } while (ctx.measureText(text).width > canvas.width - 875);
    return ctx.font;
};
function guildMemberAdd(client, member) {
    return __awaiter(this, void 0, void 0, function* () {
        db.prepare(`CREATE TABLE IF NOT EXISTS welcomeSetting (guildID TEXT, url TEXT, model INT)`).run();
        const data = db.prepare(`SELECT * FROM welcomeSetting WHERE guildID =?`).get(member.guild.id);
        if (data == null)
            return;
        const bgimage = data.url;
        if (bgimage == null)
            return;
        const model = data.model;
        if (model == null)
            return;
        const channel = member.guild.channels.cache.find((ch) => ch.name === '🙏welcome');
        const canvas = Canvas.createCanvas(1500, 350);
        const ctx = canvas.getContext('2d');
        const background = yield Canvas.loadImage(bgimage);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        let c = data.model;
        switch (c) {
            case 1:
                ctx.font = applyText(canvas, member.user.username);
                ctx.fillStyle = '#ff0303';
                ctx.fillText(`${member.user.username},`, canvas.width / 1.8, canvas.height / 2.5);
                ctx.fillStyle = `#ffffff`;
                ctx.font = `60px "${FONT_FAMILY}"`;
                ctx.fillText(`\nWelcome \nto the`, canvas.width / 1.7, canvas.height / 2.5);
                ctx.fillStyle = `#fff200`;
                ctx.font = `60px "${FONT_FAMILY}"`;
                ctx.fillText(`\n${member.guild.name}`, canvas.width / 1.7, canvas.height / 1.35);
                ctx.beginPath();
                ctx.arc(710, 235, 95, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();
                const avatar = yield Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
                ctx.drawImage(avatar, 615, 140, 190, 190);
                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'banner-image.png');
                channel.send(attachment);
                break;
            case 2:
                ctx.font = applyText(canvas, member.user.username);
                ctx.fillStyle = '#ff0303';
                ctx.rotate(12 * Math.PI / 180);
                ctx.fillText(`${member.user.username},`, canvas.width / 1.74, -95);
                ctx.fillStyle = `#ffffff`;
                ctx.font = `60px "${FONT_FAMILY}"`;
                ctx.fillText(`Welcome to the`, 858, 5);
                ctx.fillStyle = `#fff200`;
                ctx.fillText(`\n${member.guild.name}`, 858, 10);
                ctx.fillRect(852, 90, 300, 10);
                ctx.rotate(-12 * Math.PI / 180);
                ctx.beginPath();
                ctx.arc(490, 190, 85, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();
                const avatar1 = yield Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
                ctx.drawImage(avatar1, 405, 102, 180, 180);
                const attachment1 = new Discord.MessageAttachment(canvas.toBuffer(), 'banner-image.png');
                channel.send(attachment1);
                break;
            case 3:
                ctx.fillStyle = '#01ffff';
                ctx.fillText(`${member.user.username},`, canvas.width / 6.5, canvas.height / 3.5);
                ctx.fillStyle = `#ffffff`;
                ctx.font = `60px "${FONT_FAMILY}"`;
                ctx.fillText(`\nWelcome`, canvas.width / 5.1, canvas.height / 2.5);
                ctx.fillText(`\nto the`, canvas.width / 4.1, canvas.height / 1.7);
                ctx.font = (`80px "${FONT_FAMILY}"`);
                ctx.fillStyle = `#fff200`;
                ctx.fillText(`\n${member.guild.name} !`, canvas.width / 1.475, canvas.height / 2.8);
                const avatar3 = yield Canvas.loadImage(member.guild.iconURL({ format: 'jpg' }));
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
                const avatar2 = yield Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
                ctx.drawImage(avatar2, 50, 110, 190, 190);
                const attachment2 = new Discord.MessageAttachment(canvas.toBuffer(), 'banner-image.png');
                channel.send(attachment2);
                break;
        }
        let memberRole = member.guild.roles.cache.find(memberRole => memberRole.name === "member");
        member.roles.add(memberRole);
        member.send("Thanks for joining our server,hope you like being here");
        let sChannel = member.guild.channels.cache.find(s => s.name === "👋joining_leaving");
        let sayArray = [
            `hey commander,${member} just landed!`,
            `we have been expecting you,${member}`,
            `${member} just entered the hall of fame`,
            `come on ${member}, show some energy`,
            `welcome ${member},have a sit`,
            `sit and watch and be active, mr.${member}`,
            `welcome ${member},hope you brought pizza`,
            `hey ${member},hold my beer`,
            `whoaaaa!! look who is here? ta da.. ${member}`,
            `welcome to the weirdest world, ${member}`
        ];
        let math = Math.floor(Math.random() * sayArray.length);
        let sembed = new Discord.MessageEmbed()
            .setAuthor("Welcome! 👋")
            .setDescription(sayArray[math])
            .setColor("GREEN");
        sChannel.send({ embed: sembed });
    });
}
exports.default = guildMemberAdd;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpbGRNZW1iZXJBZGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvRXZlbnRzL0d1aWxkL01lbWJlci9ndWlsZE1lbWJlckFkZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHNDQUFzQztBQUN0QyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDakMsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDM0MsTUFBTSxFQUFFLEdBQUcsSUFBSSxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdEMsTUFBTSxTQUFTLEdBQUcsbURBQW1ELENBQUM7QUFDdEUsTUFBTSxXQUFXLEdBQUcsZUFBZSxDQUFDO0FBQ3BDLE1BQU0sU0FBUyxHQUFHLENBQUMsTUFBVyxFQUFFLElBQVMsRUFBRSxFQUFFO0lBQ3pDLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFcEMsTUFBTSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUN4RCxJQUFJLFVBQVUsR0FBRyxHQUFHLENBQUM7SUFDckIsR0FBRztRQUVDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxVQUFVLElBQUksRUFBRSxNQUFNLFdBQVcsRUFBRSxDQUFDO0tBRXJELFFBQVEsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQUU7SUFHM0QsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBQ3BCLENBQUMsQ0FBQztBQUVGLFNBQThCLGNBQWMsQ0FBQyxNQUFXLEVBQUUsTUFBMkI7O1FBRWpGLEVBQUUsQ0FBQyxPQUFPLENBQUMsK0VBQStFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNsRyxNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLCtDQUErQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUYsSUFBRyxJQUFJLElBQUksSUFBSTtZQUFFLE9BQU87UUFDeEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUN6QixJQUFHLE9BQU8sSUFBSSxJQUFJO1lBQUUsT0FBTztRQUMzQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3pCLElBQUcsS0FBSyxJQUFJLElBQUk7WUFBRSxPQUFPO1FBRXpCLE1BQU0sT0FBTyxHQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUFDLENBQUM7UUFFM0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDOUMsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxNQUFNLFVBQVUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RCxHQUFHLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUM1QixHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFOUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNuQixRQUFPLENBQUMsRUFBQztZQUNOLEtBQUssQ0FBQztnQkFDRixHQUFHLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbkQsR0FBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7Z0JBQzFCLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEdBQUcsR0FBRyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQ2xGLEdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO2dCQUMxQixHQUFHLENBQUMsSUFBSSxHQUFHLFNBQVMsV0FBVyxHQUFHLENBQUM7Z0JBQ25DLEdBQUcsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLEVBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDNUUsR0FBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7Z0JBQzFCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsU0FBUyxXQUFXLEdBQUcsQ0FBQztnQkFDbkMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDakYsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDNUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNoQixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ1gsTUFBTSxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN2RixHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDMUMsTUFBTSxVQUFVLEdBQUcsSUFBSSxPQUFPLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLGtCQUFrQixDQUFDLENBQUM7Z0JBRXhGLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3pCLE1BQU07WUFFVixLQUFLLENBQUM7Z0JBQ0YsR0FBRyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ25ELEdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO2dCQUMxQixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUMvQixHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNuRSxHQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztnQkFDMUIsR0FBRyxDQUFDLElBQUksR0FBRyxTQUFTLFdBQVcsR0FBRyxDQUFDO2dCQUNuQyxHQUFHLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDdkMsR0FBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7Z0JBQzFCLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDaEQsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDL0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM1QyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2hCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDWCxNQUFNLE9BQU8sR0FBRyxNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hGLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLFdBQVcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztnQkFFekYsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDMUIsTUFBTTtZQUVWLEtBQUssQ0FBQztnQkFDRixHQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztnQkFDMUIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDbEYsR0FBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7Z0JBQzFCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsU0FBUyxXQUFXLEdBQUcsQ0FBQztnQkFDbkMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDbkUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDbEUsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLFNBQVMsV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFDckMsR0FBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7Z0JBQzFCLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQ3BGLE1BQU0sT0FBTyxHQUFHLE1BQU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hGLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM3QyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2hCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDWCxHQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztnQkFDMUIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNYLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDaEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzVDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDaEIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNYLE1BQU0sT0FBTyxHQUFHLE1BQU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDeEYsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQzFDLE1BQU0sV0FBVyxHQUFHLElBQUksT0FBTyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2dCQUV6RixPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMxQixNQUFNO1NBQ2I7UUFDRCxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQztRQUMzRixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUU3QixNQUFNLENBQUMsSUFBSSxDQUFDLHdEQUF3RCxDQUFDLENBQUM7UUFDdEUsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssbUJBQW1CLENBQXdCLENBQUM7UUFDNUcsSUFBSSxRQUFRLEdBQUc7WUFDWCxpQkFBaUIsTUFBTSxlQUFlO1lBQ3RDLDhCQUE4QixNQUFNLEVBQUU7WUFDdEMsR0FBRyxNQUFNLGdDQUFnQztZQUN6QyxXQUFXLE1BQU0sb0JBQW9CO1lBQ3JDLFdBQVcsTUFBTSxhQUFhO1lBQzlCLG1DQUFtQyxNQUFNLEVBQUU7WUFDM0MsV0FBVyxNQUFNLHlCQUF5QjtZQUMxQyxPQUFPLE1BQU0sZUFBZTtZQUM1Qix1Q0FBdUMsTUFBTSxFQUFFO1lBQy9DLGtDQUFrQyxNQUFNLEVBQUU7U0FBQyxDQUFBO1FBQy9DLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV2RCxJQUFJLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7YUFDbEMsU0FBUyxDQUFDLGFBQWEsQ0FBQzthQUN4QixjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzlCLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUV0QixRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxDQUFDLENBQUM7SUFDbEMsQ0FBQztDQUFBO0FBdEhELGlDQXNIQyJ9
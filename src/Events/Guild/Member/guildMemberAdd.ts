import { bot } from "../../../api";
import * as Discord from "discord.js";
const Canvas = require("canvas");
const Database = require('better-sqlite3');
const db = new Database('bot.sqlite');
const FONT_PATH = 'C:/Users/ank/Documents/WeirdTrexy/fonts/sword.otf';
const FONT_FAMILY = 'Sword Regular';
const applyText = (canvas: any, text: any) => {
    const ctx = canvas.getContext('2d');

    Canvas.registerFont(FONT_PATH, { family: FONT_FAMILY }); //Register the font to be used for the banner
    let LARGE_FONT = 120;
    do {
        // Assign the font to the context and decrement it so it can be measured again
        ctx.font = `${LARGE_FONT -= 10}px ${FONT_FAMILY}`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (ctx.measureText(text).width > canvas.width - 875);

    // Return the result to use in the actual canvas
    return ctx.font;
};

export default async function guildMemberAdd(client: bot, member: Discord.GuildMember){

    db.prepare(`CREATE TABLE IF NOT EXISTS welcomeSetting (guildID TEXT, url TEXT, model INT)`).run();
    const data = db.prepare(`SELECT * FROM welcomeSetting WHERE guildID =?`).get(member.guild.id);
    if(data == null) return;
    const bgimage = data.url;
    if(bgimage == null) return;
    const model = data.model;
    if(model == null) return;
    // my code ^^^^
    const channel =  member.guild.channels.cache.find((ch: any) => ch.name === '🙏welcome');
	// const bgimage = `https://i.imgur.com/Hv3QVGW.jpg`;//image url for background
	const canvas = Canvas.createCanvas(1500, 350);
	const ctx = canvas.getContext('2d');    
	const background = await Canvas.loadImage(bgimage);
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height); 
	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);
     // Assign the decided font to the canvas
     let c = data.model;
     switch(c){
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
            const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
            ctx.drawImage(avatar, 615, 140, 190, 190);
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'banner-image.png');
            //@ts-ignore
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
            ctx.fillRect(852 ,90 ,300 ,10);
            ctx.rotate(-12 * Math.PI / 180);
            ctx.beginPath();
            ctx.arc(490, 190, 85, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            const avatar1 = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
            ctx.drawImage(avatar1, 405, 102, 180, 180);
            const attachment1 = new Discord.MessageAttachment(canvas.toBuffer(), 'banner-image.png');
            //@ts-ignore
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
            const avatar3 = await Canvas.loadImage(member.guild.iconURL({ format: 'jpg' }));
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
            const avatar2 = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
            ctx.drawImage(avatar2, 50, 110, 190, 190);
            const attachment2 = new Discord.MessageAttachment(canvas.toBuffer(), 'banner-image.png');
            //@ts-ignore
            channel.send(attachment2);
            break;
    }
    let memberRole = member.guild.roles.cache.find(memberRole => memberRole.name === "member");
    member.roles.add(memberRole);

    member.send("Thanks for joining our server,hope you like being here");
    let sChannel = member.guild.channels.cache.find(s => s.name === "👋joining_leaving") as Discord.TextChannel;
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
        `welcome to the weirdest world, ${member}`]
    let math = Math.floor(Math.random() * sayArray.length);

    let sembed = new Discord.MessageEmbed()
        .setAuthor("Welcome! 👋")
        .setDescription(sayArray[math])
        .setColor("GREEN")

    sChannel.send({embed:sembed});
}
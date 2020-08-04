import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";

const Canvas = require("canvas");
const FONT_PATH = 'C:/Users/ank/Documents/WeirdTrexy/fonts/sword.otf';
const FONT_FAMILY = 'Sword Regular';

export default class welcometest implements IBotCommand {
    
    public readonly _command = "welcometest";
    public readonly aliases : string[] = ["wt"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command shows welcome banner test modules which could be implemented by using wcupdate command";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?welcometest <direct url of the image> <model_number>"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
    
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
            const channel = msgObject.guild.channels.cache.find((ch: any) => ch.name === 'bot-testing');
            if (!channel)
            {
                msgObject.channel.send("The required channel(**welcome**) could not found on this server,so cant show/work to give output")
                    .then(msg=>{msg.delete({timeout: 3000})});
                msgObject.delete();    
                return;
            }
            else
            {
                if(!args[0] || !msgObject.content.includes("https://" || "http://"))
                {
                    msgObject.channel.send("**Direct link** of the image is require,without it,sorry cant show output")
                        .then(msg=>{msg.delete({timeout: 3000})});
                    msgObject.delete();    
                    return;
                }
                else
                {
                    const bgimage = args[0];//image url for background
                    const canvas = Canvas.createCanvas(1500, 350);
                    const ctx = canvas.getContext('2d');
                    const background = await Canvas.loadImage(bgimage);
                    ctx.drawImage(background, 0, 0, canvas.width, canvas.height); 
                    ctx.strokeStyle = '#74037b';
                    ctx.strokeRect(0, 0, canvas.width, canvas.height);
                    // Assign the decided font to the canvas

                    let c = Number(args[1]);
                    if(!args[1]){
                        msgObject.channel.send("as no choice is given so default model no. 1 is choosen");
                        c = 1;
                    }
                    else{
                        switch(c){
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
                                const avatar = await Canvas.loadImage(msgObject.member.user.displayAvatarURL({ format: 'jpg' }));
                                ctx.drawImage(avatar, 615, 140, 190, 190);
                                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'banner-image.png');
                                //@ts-ignore
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
                                ctx.fillRect(852 ,90 ,300 ,10);
                                ctx.rotate(-12 * Math.PI / 180);
                                ctx.beginPath();
                                ctx.arc(490, 190, 85, 0, Math.PI * 2, true);
                                ctx.closePath();
                                ctx.clip();
                                const avatar1 = await Canvas.loadImage(msgObject.member.user.displayAvatarURL({ format: 'jpg' }));
                                ctx.drawImage(avatar1, 405, 102, 180, 180);
                                const attachment1 = new Discord.MessageAttachment(canvas.toBuffer(), 'banner-image.png');
                                //@ts-ignore
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
                                const avatar3 = await Canvas.loadImage(msgObject.guild.iconURL({ format: 'jpg' }));
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
                                const avatar2 = await Canvas.loadImage(msgObject.member.user.displayAvatarURL({ format: 'jpg' }));
                                ctx.drawImage(avatar2, 50, 110, 190, 190);
                                const attachment2 = new Discord.MessageAttachment(canvas.toBuffer(), 'banner-image.png');
                                //@ts-ignore
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
                                const avatar4 = await Canvas.loadImage(msgObject.member.user.displayAvatarURL({ format: 'jpg' }));
                                ctx.drawImage(avatar4, 615, 140, 190, 190);
                                const attachment3 = new Discord.MessageAttachment(canvas.toBuffer(), 'banner-image.png');
                                //@ts-ignore
                                channel.send(attachment3);
                                msgObject.delete();
                                break;
					}
				}
			}
		}
    }
}
import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
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

export default class apex implements IBotCommand {
    
    public readonly _command = "apex";
    public readonly aliases : string[] = [];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;
    
    help(): string {
        return "this command shows apex legends profile details**(only pc platform)**";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    usage(): string {
        return "?apex <apex ORIGIN username>"
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
            msgObject.channel.send("If nothing comes in result in 4-5 seconds then there is problem with provided username,please check it again and try again")
                .then(msg => {msg.delete({timeout: 30000})});

            const trackerToken = "d1195ddd-1f45-43fe-8fe9-4b90c76691b7"; //Token for Tracker Network API
            const trackerUrl = 'https://public-api.tracker.gg/v2/apex/standard/profile/';
            const platform = "origin";
            const username = args[0];
            const headers = { 'Content-Type': 'application/json', 'TRN-Api-Key': trackerToken };
            const response = await fetch(`${trackerUrl}${platform}/${username}`, { method: 'GET', headers: headers })
                .then((response: any) => response.json())
                .then((json: any)=> json.data)
                .catch((error: any)=> msgObject.reply('Something went wrong retrieving the information.'));
            
            let data = await (await fetch(`https://api.mozambiquehe.re/bridge?version=4&platform=PC&player=${username}&auth=fPs0jPfzsSjTbDflIyuj`)).json();//anothet api

            if(data.error == "Player not found. Please try again (err 1 / fatal error)")
            {
                msgObject.channel.send("The provided username does not exist in the database of apex or could not be found,please provide a valid username")
                    .then(msg=>{msg.delete({timeout: 3000})});
                msgObject.delete();
                return;  
            }
            else
            {   
                msgObject.channel.send("Generating details . . . Please wait 4 - 5 seconds")
                    .then(msg=>{msg.delete({timeout: 4000})});
                msgObject.delete();
                const { toNextLevelPercent: levelbar, battlepass: { level: blevel } } = data.global;
                const { displayValue: playerLevel } = response.segments[0].stats.level; //Only need the level from this part of the response data
                const { metadata: { name: legendName, imageUrl: legendBanner }, stats } = response.segments[1]; //Get the legend name, legend banner image url, and the stats object
                const { metadata: { rankName: playerrank, iconUrl: icon }, displayValue: rankValue } = response.segments[0].stats.rankScore;//Get the player rank and rank points along with rank icon
                const { avatarUrl: avatar } = response.platformInfo;//get the account avatar image
                const { kills: { displayValue: killv }, headshots: { displayValue: hs }, damage: { displayValue: dmv } } = response.segments[0].stats;//get lifetime achievements
                const { metadata: { name: lname } } = response.segments[0];//get the title
                let c = levelbar;

                const canvas = Canvas.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT); //Setup the canvas for the banner image
                const ctx = canvas.getContext('2d');
                Canvas.registerFont(FONT_PATH, { family: FONT_FAMILY }); //Register the font to be used for the banner

                //Left Panel Background
                ctx.fillStyle = LEFT_PANEL_COLOR;
                ctx.fillRect(0, 0, LEFT_PANEL_WIDTH + 25, canvas.height);

                //Right Panel Background
                ctx.fillStyle = RIGHT_PANEL_COLOR;
                ctx.fillRect(LEFT_PANEL_WIDTH, 0, canvas.width, canvas.height);
    
                //Get the rank image from the URL and draw it to the right panel
                const icon1 = await Canvas.loadImage(icon);
                ctx.drawImage(icon1, 700, 515, 170, 170);

                //Level Badge / Name banner placement
                const levelbg = await Canvas.loadImage(BANNER_PATH);
                ctx.drawImage(levelbg, 325, 15, 375, 96);

                ctx.fillStyle = LEFT_PANEL_COLOR;
                ctx.fillRect(454, 67, 217, 35);//create graphical representation of level's background

                ctx.fillStyle = RIGHT_PANEL_COLOR;//now it's the front representation of level's bar or techinically RECTANGLE XD
                ctx.fillRect(458, 70, c * 2.09 , 26);//level bar completion by creating another rectangle smaller than previous
                
                //season displayer
                const levelbg1 = await Canvas.loadImage(BANNER_PATH1);
                ctx.drawImage(levelbg1, 900, 0, 380, 600);

                //Text placement
                ctx.fillStyle = TEXT_COLOR;
                ctx.font = `${LARGE_FONT} "${FONT_FAMILY}"`;

                //All left aligned text
                ctx.textAlign = 'left';
                ctx.fillStyle = `#FFDC73`;
                ctx.fillText(`${username.toUpperCase()}`, 460, 50); //Add retrieved username for display

                const userData = Object.values(stats); //Convert the stats object to an array so we can iterate through it
                // const rankData = Object.values()
                if (!Array.isArray(userData) || !userData.length) {
                ctx.fillText(`:(  No Trackers Active`, 355, 180); //Display No Tracker Text
                ctx.fillRect(355, 190, 315, 2);
                } else {
                userData.map((value, index) => {
                    if(index <= 4)
                    {
                        ctx.fillStyle = `#000000`;
                        ctx.fillText(`${value.displayName}: ${value.displayValue}`, 355, 160 + index * 60);
                        ctx.fillStyle = `#FFDC73`;
                        ctx.fillRect(355, 170 + index * 60, 445, 2);
                    }
                    ctx.fillStyle = `#000000`;
                    ctx.fillText(`${playerrank}`, 355, 170 + 5 * 60);
                    ctx.fillText(`Rank points: ${rankValue}`, 510, 170 + 5 * 60,);
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

                //All centered text
                ctx.textAlign = 'center';

                //Text placement under season battlepass banner banner
                ctx.font = `43px "${FONT_FAMILY}"`;
                ctx.fillStyle = `#FFDC73`;
                ctx.fillText(`Battlepass Level: ${blevel}`,1090,670);

                ctx.font = `50px "${FONT_FAMILY}"`;
                ctx.fillStyle = `#FFDC73`;
                ctx.fillText(`${legendName.toUpperCase()}`, 162.5, 675); //Display Legend Name
                ctx.fillStyle = `#000000`;
                ctx.fillText(`${playerLevel}`, 403, 80); //Display Player Level
                //ctx.fillText(`${playerrank}`, 423, 420);

                ctx.font = `${SMALL_FONT} "${FONT_FAMILY}"`;
                ctx.fillText('LEVEL', 403, 45); //Display "LEVEL" label for badge

                //Get the legend image from the URL and draw it to the left panel
                const legend = await Canvas.loadImage(legendBanner);
                ctx.drawImage(legend, -78, 0, 510, 650);
                // Pick up the pen
                ctx.beginPath();
                // Start the arc to form a circle
                ctx.arc(790, 95, 70, 0, Math.PI * 2,true);
                // Put the pen down
                ctx.closePath();
                // Clip off the region you drew on
                ctx.clip();
                //Get the user's avatar from origina account
                const dp = await Canvas.loadImage(avatar);
                ctx.drawImage(dp, 690, 4, 180, 180);
                
                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), DISCORD_IMAGE_NAME);
                return msgObject.reply(attachment)
                    .then(msg=>{msg.delete({timeout: 25000})});
            }   
        }
    }
}
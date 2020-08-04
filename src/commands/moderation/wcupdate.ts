import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const Database = require('better-sqlite3');
const db = new Database('bot.sqlite');

const FONT_PATH = 'C:/Users/ank/Doconst FONT_FAMILY/Sword Regular';

export default class wcupdate implements IBotCommand {
    
    public readonly _command = "wcupdate";
    public readonly aliases : string[] = ["wu"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command shows welcome banner update depending upon inputs (STRICTLY link and then STRICTLY number of the model)";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?wcupdate <direct url of the image> <model_number>"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {

        if(!msgObject.member.hasPermission(["ADMINISTRATOR", "MANAGE_CHANNELS"]))
        {
            msgObject.channel.send(`Nice try ${msgObject.author.username}, but you dont have the permission to ban other users!`)
                .then(msg =>{msg.delete({timeout: 3000})});
            msgObject.delete();
            return;
        }
        else
        {
            if(args[0] == undefined)
            {
                msgObject.channel.send('Send a Image URL!').then(msg => {msg.delete({timeout: 3000})});
                msgObject.delete();
                return;
            }
            else
            {   if(args[1] == undefined)
                {
                    msgObject.channel.send(`model no is not provided,send one`).then(msg=>{msg.delete({timeout: 3000})});
                    msgObject.delete();
                    return;
                }
                else
                {
                    db.prepare(`CREATE TABLE IF NOT EXISTS welcomeSetting (guildID TEXT, url TEXT, model INT)`).run();
                    //somehow verify image url
                    let sql = db.prepare(`SELECT * FROM welcomeSetting WHERE guildID=?`).get(msgObject.guild.id) == null ? `INSERT INTO welcomeSetting (url,model,guildID) VALUES(?,?,?)` : `UPDATE welcomeSetting SET url=?,model=? WHERE guildID=?`
                    db.prepare(sql).run(args[0],args[1], msgObject.guild.id)
                    let adj = sql.includes('UPDATE') ? `updated` : `created`
                    msgObject.channel.send(`Successfully ${adj} a column in the the database`).then(msg => {msg.delete({timeout: 3000})});
                    msgObject.delete();
                }
            }
        }
    }
}
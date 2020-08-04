import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
const request = require('request');
const ms = require("ms");

export default class anime implements IBotCommand {
    
    public readonly _command = "anime";
    public readonly aliases : string[] = [];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = false;

    help(): string {
        return "this command does absolutely nothing! Don't go open it for curiosity";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?anime"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
        
        new Date(Date.now()).toLocaleString();
        console.log(Date);
        request('https://api.jikan.moe/v3/schedule/Monday', function (error: any, response: { statusCode: any; headers: any; }, body: any) {
          console.log('Status:', response.statusCode);
          console.log('Headers:', JSON.stringify(response.headers));
          console.log('Response:', body);
        });
        
        msgObject.delete();
        return;
    }

}
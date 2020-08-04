import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";

export default class testCommand implements IBotCommand {
    
    public readonly _command = "testCommand";
    public readonly aliases : string[] = [];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command does absolutely nothing! Don't go open it for curiosity";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?testCommand"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {
        
        //Let us know it all went well!
        msgObject.channel.send("Can't you read the ENGLISH,DUMBASS?");
        
        //     .then(msg =>{
        //         setTimeout(function(){(msg as Message).delete()},ms("30s"));
        // });
        msgObject.delete();
        return;
    }

}
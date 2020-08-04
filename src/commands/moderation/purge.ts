import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
import { setTimeout } from "timers";
const ms = require("ms");

export default class purge implements IBotCommand {
    
    public readonly _command = "purge";
    public readonly aliases : string[] = ["delete","del","dl","remove","rm"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "Admin only-deletes the desired no of messages from the channel";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?purge <Number_Of_Messages>"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<any> {

        //Make sure that the person using the command is an admin    
        if(!msgObject.member.hasPermission("ADMINISTRATOR")){
            msgObject.channel.send(`Sorry ${msgObject.author.username} but this command is only for admins`)
                .then(msg =>{msg.delete({timeout: 3000})});
                msgObject.delete();
                return;
        }
        else{
            //Make sure that they have said how many message to delete
            if(!args[0]){
                msgObject.channel.send(`Sorry ${msgObject.author.username} but you must supply a number of message to be deleted`)
                    .then(msg =>{msg.delete({timeout: 3000})});
                msgObject.delete();
                return;    
            }
            else{
                //convert arg[0] into a number
                let numberOfMessagesToDelete = Number(args[0]);

                //make sure arg[0] is number
                if(isNaN(numberOfMessagesToDelete)){
                    msgObject.channel.send(`Sorry ${msgObject.author.username} but That isn't a valid number`)
                        .then(msg =>{msg.delete({timeout: 3000})});
                    msgObject.delete();
                    return;
                }
                else
                {
                    //Make sure the number is integer
                    numberOfMessagesToDelete = Math.round(numberOfMessagesToDelete + 1);

                    //delete the desired number of messges
                    msgObject.channel.bulkDelete(numberOfMessagesToDelete)
                        .catch(console.error);
                    
                    msgObject.delete();    
                }    
            }    
        }   
    }
}
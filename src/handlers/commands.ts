import * as Discord from "discord.js";
import * as fs from "fs";
import * as klaw from "klaw-sync";
import * as path from "path";
import { config } from "../config";
import { IBotCommand, bot } from "../api";

export class CMDHandler {

    public commands: Discord.Collection<string, IBotCommand>;
    public aliases: Discord.Collection<string, IBotCommand>;
    public categories: string[];
    public ops: opsI

    constructor(){
        this.commands = new Discord.Collection();
        this.aliases = new Discord.Collection();
        this.ops = {
            ownerID: "404681937249370123",
            active: new Map()
        }
    }

    public loadCommands(cmdPath: string) : void {

        this.categories = fs.readdirSync(cmdPath);

        let filterFN = (item: any) : boolean => {
            return item.path.endsWith(".js");
        };

        let commandFiles = klaw(cmdPath, {
            nodir: true,
            nofile: false,
            filter: filterFN,
            traverseAll: true
        });

        commandFiles.forEach((item) => {
            const command = new (require(item.path).default)() as IBotCommand;
            if(this.commands.has(command._command)) throw new Error(`Command ${command._command} already exist in the collection`);
            this.commands.set(command._command, command);
            if(!command.aliases) return;
            if(command.aliases.length == 0) return;
            command.aliases.forEach((alias: string) => {
                if(this.aliases.has(alias)) throw new Error(`Alias/es ${alias} already exist in the collection`);
                this.aliases.set(alias, command);
            })
          })

    }

    public handle(client: bot, message: Discord.Message) : any {

        let contents = message.content.slice(config.prefix.length).split(/ +/);
        const cmd = contents[0];
        const args: string[] = contents.slice(1);

        const commandfile : IBotCommand = this.commands.get(cmd) || this.aliases.get(cmd);
        if(!commandfile) return;

        commandfile.runCommand(args, message, client, this.ops)

    }

}

interface opsI {
    ownerID: string,
    active: Map<any, any>
}
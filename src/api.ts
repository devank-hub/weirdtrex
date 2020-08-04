import * as Discord from "discord.js"
import * as path from "path";
import * as klaw from "klaw-sync";
import { ErelaClient } from "erela.js";
import { CMDHandler } from "./handlers/commands";
import  { config } from "./config";
import * as logs from "discord-logs";

export interface IBotCommand {
    //add a 'command' type string which is a type of any so we can call back the 'private readonly_command = ""';
    [_command: string]: any;
    help(): string;
    isThisCommand(command: string): boolean;
    runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client, ops: any): Promise<any>;
}

export class bot extends Discord.Client {

    public CMDHandler: CMDHandler;
    public config: any;
    public music: ErelaClient;

    constructor(){
        super();
        this.CMDHandler = new CMDHandler();
        this.config = config;
    }

    public handlers(client: bot): any {

        logs(client);

        let filterFN = (item: any) : boolean => {
            return path.basename(item.path).endsWith(".js");
        }

        let items = klaw("./dist/Events",{
            filter: filterFN,
            traverseAll: true
        });

        items.forEach((item:any) => {
            let fp = item.path;
            let evt = require(fp);
            let eName : string = path.basename(fp).replace(".js","");
            //@ts-ignore
            client.on(eName, evt.default.bind(null, client));
        });

    }

}
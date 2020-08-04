"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const fs = require("fs");
const klaw = require("klaw-sync");
const config_1 = require("../config");
class CMDHandler {
    constructor() {
        this.commands = new Discord.Collection();
        this.aliases = new Discord.Collection();
        this.ops = {
            ownerID: "404681937249370123",
            active: new Map()
        };
    }
    loadCommands(cmdPath) {
        this.categories = fs.readdirSync(cmdPath);
        let filterFN = (item) => {
            return item.path.endsWith(".js");
        };
        let commandFiles = klaw(cmdPath, {
            nodir: true,
            nofile: false,
            filter: filterFN,
            traverseAll: true
        });
        commandFiles.forEach((item) => {
            const command = new (require(item.path).default)();
            if (this.commands.has(command._command))
                throw new Error(`Command ${command._command} already exist in the collection`);
            this.commands.set(command._command, command);
            if (!command.aliases)
                return;
            if (command.aliases.length == 0)
                return;
            command.aliases.forEach((alias) => {
                if (this.aliases.has(alias))
                    throw new Error(`Alias/es ${alias} already exist in the collection`);
                this.aliases.set(alias, command);
            });
        });
    }
    handle(client, message) {
        let contents = message.content.slice(config_1.config.prefix.length).split(/ +/);
        const cmd = contents[0];
        const args = contents.slice(1);
        const commandfile = this.commands.get(cmd) || this.aliases.get(cmd);
        if (!commandfile)
            return;
        commandfile.runCommand(args, message, client, this.ops);
    }
}
exports.CMDHandler = CMDHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGFuZGxlcnMvY29tbWFuZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0M7QUFDdEMseUJBQXlCO0FBQ3pCLGtDQUFrQztBQUVsQyxzQ0FBbUM7QUFHbkMsTUFBYSxVQUFVO0lBT25CO1FBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxHQUFHLEdBQUc7WUFDUCxPQUFPLEVBQUUsb0JBQW9CO1lBQzdCLE1BQU0sRUFBRSxJQUFJLEdBQUcsRUFBRTtTQUNwQixDQUFBO0lBQ0wsQ0FBQztJQUVNLFlBQVksQ0FBQyxPQUFlO1FBRS9CLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUxQyxJQUFJLFFBQVEsR0FBRyxDQUFDLElBQVMsRUFBWSxFQUFFO1lBQ25DLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDO1FBRUYsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUM3QixLQUFLLEVBQUUsSUFBSTtZQUNYLE1BQU0sRUFBRSxLQUFLO1lBQ2IsTUFBTSxFQUFFLFFBQVE7WUFDaEIsV0FBVyxFQUFFLElBQUk7U0FDcEIsQ0FBQyxDQUFDO1FBRUgsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzFCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFpQixDQUFDO1lBQ2xFLElBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsT0FBTyxDQUFDLFFBQVEsa0NBQWtDLENBQUMsQ0FBQztZQUN2SCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzdDLElBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTztnQkFBRSxPQUFPO1lBQzVCLElBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQztnQkFBRSxPQUFPO1lBQ3ZDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBYSxFQUFFLEVBQUU7Z0JBQ3RDLElBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO29CQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsWUFBWSxLQUFLLGtDQUFrQyxDQUFDLENBQUM7Z0JBQ2pHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBRVIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFXLEVBQUUsT0FBd0I7UUFFL0MsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkUsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sSUFBSSxHQUFhLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFekMsTUFBTSxXQUFXLEdBQWlCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xGLElBQUcsQ0FBQyxXQUFXO1lBQUUsT0FBTztRQUV4QixXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUUzRCxDQUFDO0NBRUo7QUExREQsZ0NBMERDIn0=
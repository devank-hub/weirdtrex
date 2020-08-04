"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const path = require("path");
const klaw = require("klaw-sync");
const commands_1 = require("./handlers/commands");
const config_1 = require("./config");
const logs = require("discord-logs");
class bot extends Discord.Client {
    constructor() {
        super();
        this.CMDHandler = new commands_1.CMDHandler();
        this.config = config_1.config;
    }
    handlers(client) {
        logs(client);
        let filterFN = (item) => {
            return path.basename(item.path).endsWith(".js");
        };
        let items = klaw("./dist/Events", {
            filter: filterFN,
            traverseAll: true
        });
        items.forEach((item) => {
            let fp = item.path;
            let evt = require(fp);
            let eName = path.basename(fp).replace(".js", "");
            client.on(eName, evt.default.bind(null, client));
        });
    }
}
exports.bot = bot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFxQztBQUNyQyw2QkFBNkI7QUFDN0Isa0NBQWtDO0FBRWxDLGtEQUFpRDtBQUNqRCxxQ0FBbUM7QUFDbkMscUNBQXFDO0FBVXJDLE1BQWEsR0FBSSxTQUFRLE9BQU8sQ0FBQyxNQUFNO0lBTW5DO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUkscUJBQVUsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFFTSxRQUFRLENBQUMsTUFBVztRQUV2QixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFYixJQUFJLFFBQVEsR0FBRyxDQUFDLElBQVMsRUFBWSxFQUFFO1lBQ25DLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQTtRQUVELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUM7WUFDN0IsTUFBTSxFQUFFLFFBQVE7WUFDaEIsV0FBVyxFQUFFLElBQUk7U0FDcEIsQ0FBQyxDQUFDO1FBRUgsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQVEsRUFBRSxFQUFFO1lBQ3ZCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDbkIsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RCLElBQUksS0FBSyxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBQyxFQUFFLENBQUMsQ0FBQztZQUV6RCxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztJQUVQLENBQUM7Q0FFSjtBQW5DRCxrQkFtQ0MifQ==
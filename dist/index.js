"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./utils/methods/array/group");
const ConfigFile = require("./config");
const api = require("./api");
const client = new api.bot();
client.login(ConfigFile.config.token).then((token) => {
    client.handlers(client);
    client.CMDHandler.loadCommands("./dist/commands");
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBb0M7QUFFcEMsdUNBQXVDO0FBQ3ZDLDZCQUE2QjtBQUU3QixNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUU3QixNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBYSxFQUFFLEVBQUU7SUFDekQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QixNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3RELENBQUMsQ0FBQyxDQUFBIn0=
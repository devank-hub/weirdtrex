"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const Database = require('better-sqlite3');
const db = new Database('bot.sqlite');
const FONT_PATH = 'C:/Users/ank/Doconst FONT_FAMILY/Sword Regular';
class wcupdate {
    constructor() {
        this._command = "wcupdate";
        this.aliases = ["wu"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "this command shows welcome banner update depending upon inputs (STRICTLY link and then STRICTLY number of the model)";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?wcupdate <direct url of the image> <model_number>";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!msgObject.member.hasPermission(["ADMINISTRATOR", "MANAGE_CHANNELS"])) {
                msgObject.channel.send(`Nice try ${msgObject.author.username}, but you dont have the permission to ban other users!`)
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                msgObject.delete();
                return;
            }
            else {
                if (args[0] == undefined) {
                    msgObject.channel.send('Send a Image URL!').then(msg => { msg.delete({ timeout: 3000 }); });
                    msgObject.delete();
                    return;
                }
                else {
                    if (args[1] == undefined) {
                        msgObject.channel.send(`model no is not provided,send one`).then(msg => { msg.delete({ timeout: 3000 }); });
                        msgObject.delete();
                        return;
                    }
                    else {
                        db.prepare(`CREATE TABLE IF NOT EXISTS welcomeSetting (guildID TEXT, url TEXT, model INT)`).run();
                        let sql = db.prepare(`SELECT * FROM welcomeSetting WHERE guildID=?`).get(msgObject.guild.id) == null ? `INSERT INTO welcomeSetting (url,model,guildID) VALUES(?,?,?)` : `UPDATE welcomeSetting SET url=?,model=? WHERE guildID=?`;
                        db.prepare(sql).run(args[0], args[1], msgObject.guild.id);
                        let adj = sql.includes('UPDATE') ? `updated` : `created`;
                        msgObject.channel.send(`Successfully ${adj} a column in the the database`).then(msg => { msg.delete({ timeout: 3000 }); });
                        msgObject.delete();
                    }
                }
            }
        });
    }
}
exports.default = wcupdate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2N1cGRhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvbW9kZXJhdGlvbi93Y3VwZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLDZCQUE2QjtBQUU3QixNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUMzQyxNQUFNLEVBQUUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUV0QyxNQUFNLFNBQVMsR0FBRyxnREFBZ0QsQ0FBQztBQUVuRSxNQUFxQixRQUFRO0lBQTdCO1FBRW9CLGFBQVEsR0FBRyxVQUFVLENBQUM7UUFDdEIsWUFBTyxHQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsYUFBUSxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsWUFBTyxHQUFhLElBQUksQ0FBQztJQWtEN0MsQ0FBQztJQWhERyxJQUFJO1FBQ0EsT0FBTyxzSEFBc0gsQ0FBQztJQUNsSSxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsS0FBSztRQUNELE9BQU8sb0RBQW9ELENBQUE7SUFDL0QsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxNQUFzQjs7WUFFL0UsSUFBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsZUFBZSxFQUFFLGlCQUFpQixDQUFDLENBQUMsRUFDeEU7Z0JBQ0ksU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsd0RBQXdELENBQUM7cUJBQ2hILElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ25CLE9BQU87YUFDVjtpQkFFRDtnQkFDSSxJQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLEVBQ3ZCO29CQUNJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZGLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDbkIsT0FBTztpQkFDVjtxQkFFRDtvQkFBSSxJQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLEVBQ3ZCO3dCQUNJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQSxFQUFFLEdBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7d0JBQ3JHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzt3QkFDbkIsT0FBTztxQkFDVjt5QkFFRDt3QkFDSSxFQUFFLENBQUMsT0FBTyxDQUFDLCtFQUErRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7d0JBRWxHLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsOENBQThDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLDhEQUE4RCxDQUFDLENBQUMsQ0FBQyx5REFBeUQsQ0FBQTt3QkFDak8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFBO3dCQUN4RCxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQTt3QkFDeEQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsK0JBQStCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQzt3QkFDdEgsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO3FCQUN0QjtpQkFDSjthQUNKO1FBQ0wsQ0FBQztLQUFBO0NBQ0o7QUF2REQsMkJBdURDIn0=
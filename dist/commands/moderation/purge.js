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
const ms = require("ms");
class purge {
    constructor() {
        this._command = "purge";
        this.aliases = ["delete", "del", "dl", "remove", "rm"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "Admin only-deletes the desired no of messages from the channel";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?purge <Number_Of_Messages>";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!msgObject.member.hasPermission("ADMINISTRATOR")) {
                msgObject.channel.send(`Sorry ${msgObject.author.username} but this command is only for admins`)
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                msgObject.delete();
                return;
            }
            else {
                if (!args[0]) {
                    msgObject.channel.send(`Sorry ${msgObject.author.username} but you must supply a number of message to be deleted`)
                        .then(msg => { msg.delete({ timeout: 3000 }); });
                    msgObject.delete();
                    return;
                }
                else {
                    let numberOfMessagesToDelete = Number(args[0]);
                    if (isNaN(numberOfMessagesToDelete)) {
                        msgObject.channel.send(`Sorry ${msgObject.author.username} but That isn't a valid number`)
                            .then(msg => { msg.delete({ timeout: 3000 }); });
                        msgObject.delete();
                        return;
                    }
                    else {
                        numberOfMessagesToDelete = Math.round(numberOfMessagesToDelete + 1);
                        msgObject.channel.bulkDelete(numberOfMessagesToDelete)
                            .catch(console.error);
                        msgObject.delete();
                    }
                }
            }
        });
    }
}
exports.default = purge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVyZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvbW9kZXJhdGlvbi9wdXJnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLDZCQUE2QjtBQUc3QixNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFekIsTUFBcUIsS0FBSztJQUExQjtRQUVvQixhQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ25CLFlBQU8sR0FBYyxDQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUN6RCxhQUFRLEdBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QyxZQUFPLEdBQWEsSUFBSSxDQUFDO0lBdUQ3QyxDQUFDO0lBckRHLElBQUk7UUFDQSxPQUFPLGdFQUFnRSxDQUFDO0lBQzVFLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZTtRQUN6QixPQUFPLE9BQU8sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFDRCxLQUFLO1FBQ0QsT0FBTyw2QkFBNkIsQ0FBQTtJQUN4QyxDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxTQUEwQixFQUFFLE1BQXNCOztZQUcvRSxJQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEVBQUM7Z0JBQ2hELFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLHNDQUFzQyxDQUFDO3FCQUMzRixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQztnQkFDM0MsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNuQixPQUFPO2FBQ2Q7aUJBQ0c7Z0JBRUEsSUFBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQztvQkFDUixTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSx3REFBd0QsQ0FBQzt5QkFDN0csSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7b0JBQy9DLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDbkIsT0FBTztpQkFDVjtxQkFDRztvQkFFQSxJQUFJLHdCQUF3QixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFHL0MsSUFBRyxLQUFLLENBQUMsd0JBQXdCLENBQUMsRUFBQzt3QkFDL0IsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsZ0NBQWdDLENBQUM7NkJBQ3JGLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDO3dCQUMvQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7d0JBQ25CLE9BQU87cUJBQ1Y7eUJBRUQ7d0JBRUksd0JBQXdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFHcEUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUM7NkJBQ2pELEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBRTFCLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztxQkFDdEI7aUJBQ0o7YUFDSjtRQUNMLENBQUM7S0FBQTtDQUNKO0FBNURELHdCQTREQyJ9
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
class testCommand {
    constructor() {
        this._command = "testCommand";
        this.aliases = [];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "this command does absolutely nothing! Don't go open it for curiosity";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?testCommand";
    }
    runCommand(args, msgObject, client) {
        return __awaiter(this, void 0, void 0, function* () {
            msgObject.channel.send("Can't you read the ENGLISH,DUMBASS?");
            msgObject.delete();
            return;
        });
    }
}
exports.default = testCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdENvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvb3duZXIvdGVzdENvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSw2QkFBNkI7QUFHN0IsTUFBcUIsV0FBVztJQUFoQztRQUVvQixhQUFRLEdBQUcsYUFBYSxDQUFDO1FBQ3pCLFlBQU8sR0FBYyxFQUFFLENBQUM7UUFDeEIsYUFBUSxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsWUFBTyxHQUFhLElBQUksQ0FBQztJQXlCN0MsQ0FBQztJQXZCRyxJQUFJO1FBQ0EsT0FBTyxzRUFBc0UsQ0FBQztJQUNsRixDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsS0FBSztRQUNELE9BQU8sY0FBYyxDQUFBO0lBQ3pCLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0I7O1lBRy9FLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxDQUFDLENBQUM7WUFLOUQsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ25CLE9BQU87UUFDWCxDQUFDO0tBQUE7Q0FFSjtBQTlCRCw4QkE4QkMifQ==
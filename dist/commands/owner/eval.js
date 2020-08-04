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
const util = require("util");
class help {
    constructor() {
        this._command = "eval";
        this.aliases = [];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "Admin only-Evaulates stuff idk don't ask me";
    }
    isThisCommand(command) {
        return command == this._command;
    }
    usage() {
        return "?eval <code>";
    }
    runCommand(args, message, client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!client.config.developers.some((ID) => ID == message.author.id))
                    return;
                const code = args.join(" ");
                let evaled = eval(code);
                if (typeof evaled !== "string")
                    evaled = util.inspect(evaled);
                let toEval = args.join(" ");
                let evaluated = util.inspect(eval(toEval, { depth: 0 }));
                let hrStart = process.hrtime();
                let hrDiff;
                hrDiff = process.hrtime(hrStart);
                message.channel.send(`*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.*\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 });
            }
            catch (err) {
                return message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``).catch((e) => {
                    return message.channel.send(`\`\`coffee\n${e}\`\`\``);
                });
            }
        });
    }
}
exports.default = help;
function clean(text) {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9vd25lci9ldmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsNkJBQTRCO0FBRzVCLDZCQUE2QjtBQUU3QixNQUFxQixJQUFJO0lBQXpCO1FBRWtCLGFBQVEsR0FBRyxNQUFNLENBQUM7UUFDbEIsWUFBTyxHQUFjLEVBQUUsQ0FBQztRQUN4QixhQUFRLEdBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM3QyxZQUFPLEdBQWEsSUFBSSxDQUFDO0lBd0MzQyxDQUFDO0lBdENHLElBQUk7UUFDQSxPQUFPLDZDQUE2QyxDQUFDO0lBQ3pELENBQUM7SUFFRCxhQUFhLENBQUMsT0FBZ0I7UUFDMUIsT0FBTyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNwQyxDQUFDO0lBRUQsS0FBSztRQUNHLE9BQU8sY0FBYyxDQUFDO0lBQzlCLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLE9BQWdCLEVBQUUsTUFBYzs7WUFFN0QsSUFBSTtnQkFFQSxJQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7b0JBQUUsT0FBTztnQkFDbkYsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUV4QixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVE7b0JBQzVCLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUU1QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUUsQ0FBQyxDQUFBO2dCQUN6RCxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUE7Z0JBQzlCLElBQUksTUFBTSxDQUFDO2dCQUNWLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUVqQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLHlCQUF5QixTQUFTLFVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO2FBQ2xLO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBRVosT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDbkYsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUE7Z0JBQ3ZELENBQUMsQ0FBQyxDQUFBO2FBQ0g7UUFFUCxDQUFDO0tBQUE7Q0FDSjtBQTdDRCx1QkE2Q0M7QUFHRCxTQUFTLEtBQUssQ0FBQyxJQUFZO0lBQ3pCLElBQUksT0FBTSxDQUFDLElBQUksQ0FBQyxLQUFLLFFBQVE7UUFDM0IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7UUFFeEcsT0FBTyxJQUFJLENBQUM7QUFDbEIsQ0FBQyJ9
import * as path from "path"
import { Message, Client, MessageEmbed } from "discord.js"
import { IBotCommand } from "../../api";
import * as util from "util";

export default class help implements IBotCommand {

  public readonly _command = "eval";
  public readonly aliases : string[] = [];
  public readonly category : string = path.basename(__dirname);
  public readonly display : boolean = true;

    help(): string {
        return "Admin only-Evaulates stuff idk don't ask me";
    }

    isThisCommand(command : string): boolean {
        return command == this._command;
    }

    usage(): string {
            return "?eval <code>";
    }

    async runCommand(args: string[], message: Message, client: Client): Promise<any> {

        try {
            //@ts-ignore
            if(!client.config.developers.some((ID: string) => ID == message.author.id)) return;
            const code = args.join(" ");
            let evaled = eval(code);
       
            if (typeof evaled !== "string")
              evaled = util.inspect(evaled);
            let toEval = args.join(" ");
            //@ts-ignore
            let evaluated = util.inspect(eval(toEval, { depth: 0 } ))
            let hrStart = process.hrtime()
            let hrDiff;
             hrDiff = process.hrtime(hrStart)
             //@ts-ignore
            message.channel.send(`*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.*\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 })
          } catch (err) {
              //@ts-ignore
            return message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``).catch((e) => {
              return message.channel.send(`\`\`coffee\n${e}\`\`\``)
            })
          }

    }
}


function clean(text: string) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
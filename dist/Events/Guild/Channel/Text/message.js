"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigFile = require("../../../../config");
const Discord = require("discord.js");
function message(client, msg) {
    let blacklisted = ["bc", "bokachoda", "madarchod", "mc", "hack", "h@ck", "hck", "motherfucker", "mf", "mthrfukr", "mthrfkr", "mother_fucker", "mthr_fkr", "bahenchod", "b@henchod", "bahen_chod", "mfukr", "m_fukr", "loda", "bichi", "balchal", "bal6al", "kuttachoda", "choda", "gar mara", "chutiya", "bal", "bankachoda", "bara", "wara", "whore", "shuor er bachcha", "goruchor", "gandu", "mother fucker", "mthr fukr", "mthr fkr", "mother_fucker", "mthr_fukr", "mthr_fkr", "mother@fucker", "mthr@fkr", "mthr@fukr", "mtherfkr", "mther_fukr", "madarjat", "madarjaat", "fucker", "fuker", "fkr", "fckr", "beshya", "bessa", "banchod", "bnchd", "bhnchd", "lode", "bustard", "bstrd", "faggot", "chodon", "chudun", "chdna", "chodna", "chudir bai", "chudir_bai", "chudir_bi", "chudirbai", "chudirbi"];
    let foundInText = false;
    for (var i in blacklisted) {
        if (!msg.content.includes('https://' || 'http://')) {
            if (msg.content.toLowerCase().includes(blacklisted[i])) {
                foundInText = true;
                if (foundInText) {
                    msg.delete();
                    let modlog = msg.guild.channels.cache.find((channel) => channel.name === "mod-logs");
                    let embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`message is deleted because of containing **BANNED WORD/S** :**${blacklisted[i]}** sent by ${msg.author}`);
                    modlog.send(embed);
                }
                console.log(blacklisted[i]);
                break;
            }
        }
        else
            foundInText = false;
    }
    if (msg.channel.name == "🗣suggestions") {
        msg.react("🇾");
        msg.react("🇳");
        msg.react("🤷");
    }
    if (msg.content.includes('discord.gg/' || 'discordapp.com/invite/')) {
        msg.delete()
            .then(msg => msg.channel.send('Link Deleted:\n**Invite links are not permitted on this server**'));
    }
    if (msg.author.bot) {
        return;
    }
    if (msg.channel.type == "dm") {
        return;
    }
    if (!msg.content.startsWith(ConfigFile.config.prefix)) {
        return;
    }
    client.CMDHandler.handle(client, msg);
}
exports.default = message;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9FdmVudHMvR3VpbGQvQ2hhbm5lbC9UZXh0L21lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxpREFBaUQ7QUFDakQsc0NBQXNDO0FBRXRDLFNBQXdCLE9BQU8sQ0FBQyxNQUFXLEVBQUUsR0FBb0I7SUFHekQsSUFBSSxXQUFXLEdBQUcsQ0FBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLFdBQVcsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsY0FBYyxFQUFDLElBQUksRUFBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLGVBQWUsRUFBQyxVQUFVLEVBQUMsV0FBVyxFQUFDLFdBQVcsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLEtBQUssRUFBQyxZQUFZLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxlQUFlLEVBQUMsV0FBVyxFQUFDLFVBQVUsRUFBQyxlQUFlLEVBQUMsV0FBVyxFQUFDLFVBQVUsRUFBQyxlQUFlLEVBQUMsVUFBVSxFQUFDLFdBQVcsRUFBQyxVQUFVLEVBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQyxXQUFXLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsWUFBWSxFQUFDLFdBQVcsRUFBQyxXQUFXLEVBQUMsVUFBVSxDQUFDLENBQUM7SUFFL3NCLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztJQUN4QixLQUFJLElBQUksQ0FBQyxJQUFJLFdBQVcsRUFBQztRQUNyQixJQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxJQUFJLFNBQVMsQ0FBQyxFQUNqRDtZQUNJLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ3REO2dCQUNJLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ25CLElBQUksV0FBVyxFQUFDO29CQUNaLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDYixJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxDQUFDO29CQUMxRixJQUFJLEtBQUssR0FBRyxJQUFJLE9BQU8sQ0FBQyxZQUFZLEVBQUU7eUJBQ2xDLFFBQVEsQ0FBQyxRQUFRLENBQUM7eUJBQ2xCLGNBQWMsQ0FBQyxpRUFBaUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxjQUFjLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO29CQUU5SCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN0QjtnQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixNQUFNO2FBRVQ7U0FDSjs7WUFFRyxXQUFXLEdBQUcsS0FBSyxDQUFDO0tBQzNCO0lBSUQsSUFBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxlQUFlLEVBQ3RDO1FBQ0ksR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQixHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbkI7SUFDRCxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGFBQWEsSUFBRSx3QkFBd0IsQ0FBQyxFQUNqRTtRQUNJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7YUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDLENBQUM7S0FDeEc7SUFHRixJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO1FBQUUsT0FBTztLQUFFO0lBRy9CLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFDO1FBQUUsT0FBTztLQUFFO0lBR3hDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQUUsT0FBTztLQUFFO0lBR2xFLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztBQUU3QyxDQUFDO0FBeERELDBCQXdEQyJ9
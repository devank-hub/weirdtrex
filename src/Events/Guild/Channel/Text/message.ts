import { bot } from "../../../../api";
import * as ConfigFile from "../../../../config";
import * as Discord from "discord.js";

export default function message(client: bot, msg: Discord.Message){

        //declaring words
        let blacklisted = ["bc","bokachoda","madarchod","mc","hack","h@ck","hck","motherfucker","mf","mthrfukr","mthrfkr","mother_fucker","mthr_fkr","bahenchod","b@henchod","bahen_chod","mfukr","m_fukr","loda","bichi","balchal","bal6al","kuttachoda","choda","gar mara","chutiya","bal","bankachoda","bara","wara","whore","shuor er bachcha","goruchor","gandu","mother fucker","mthr fukr","mthr fkr","mother_fucker","mthr_fukr","mthr_fkr","mother@fucker","mthr@fkr","mthr@fukr","mtherfkr","mther_fukr","madarjat","madarjaat","fucker","fuker","fkr","fckr","beshya","bessa","banchod","bnchd","bhnchd","lode","bustard","bstrd","faggot","chodon","chudun","chdna","chodna","chudir bai","chudir_bai","chudir_bi","chudirbai","chudirbi"];
        //checking and removing the words
        let foundInText = false;
        for(var i in blacklisted){
            if(!msg.content.includes('https://' || 'http://'))
            {
                if (msg.content.toLowerCase().includes(blacklisted[i])) 
                {
                    foundInText = true;
                    if (foundInText){
                        msg.delete();
                        let modlog = msg.guild.channels.cache.find((channel: any) => channel.name === "mod-logs");
                        let embed = new Discord.MessageEmbed()
                           .setColor("RANDOM")
                           .setDescription(`message is deleted because of containing **BANNED WORD/S** :**${blacklisted[i]}** sent by ${msg.author}`);
                       //@ts-ignore    
                        modlog.send(embed);
                    }
                    console.log(blacklisted[i]);
                    break;
                    
                }
            }
            else
                foundInText = false;
        }
        
        //checking whether there is any suggestions channel or not
        //@ts-ignore
        if(msg.channel.name == "🗣suggestions")
        {
            msg.react("🇾");
            msg.react("🇳");
            msg.react("🤷");
        }
        if (msg.content.includes('discord.gg/'||'discordapp.com/invite/')) 
        { //if it contains an invite link
            msg.delete() //delete the message
              .then(msg => msg.channel.send('Link Deleted:\n**Invite links are not permitted on this server**'));
        }

       //Ignore the message if it was sent by the bot   
       if (msg.author.bot) { return; }
   
       //ignore the message if it was sent in dm
       if (msg.channel.type == "dm"){ return; }
   
       //Ignore messages that dont start with the prefix
       if (!msg.content.startsWith(ConfigFile.config.prefix)) { return; }
       //msg.channel.send(`${msg.author.username} just send a command!`);
       //handle the command
       client.CMDHandler.handle(client, msg);

}

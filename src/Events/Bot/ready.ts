import * as Discord from "discord.js";
import { ErelaClient, Utils } from "erela.js";
import { bot } from "../../api";
import { config } from "../../config"

export default function ready(client: bot){

    //se the bot's activity
    client.user.setActivity("hair-Pulling",{type: "PLAYING" });

    //display that we are online
    console.log("I'm ready")
    client.music = new ErelaClient(client, config.nodes)
    .on("nodeError", console.log)
    .on("nodeConnect", () => console.log("Successfully created a new Node."))
    .on("queueEnd", (player: any) => {
        player.textChannel.send("Queue has ended.");
        player.voiceChannel.leave();
        return client.music.players.destroy(player.guild.id)
    })
    //@ts-ignore
    .on("trackStart", ({textChannel}, {title, duration}) => textChannel.send(`Now playing: **${title}** \`${Utils.formatTime(duration, true)}\``).then((m:any) => m.delete({ timeout:15000 })));
    //@ts-ignore
    client.levels = new Map()
    .set("none", 0.0)
    .set("low", 0.10)
    .set("medium", 0.15)
    .set("high", 0.25);

}
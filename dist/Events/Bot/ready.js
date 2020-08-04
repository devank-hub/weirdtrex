"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const erela_js_1 = require("erela.js");
const config_1 = require("../../config");
function ready(client) {
    client.user.setActivity("hair-Pulling", { type: "PLAYING" });
    console.log("I'm ready");
    client.music = new erela_js_1.ErelaClient(client, config_1.config.nodes)
        .on("nodeError", console.log)
        .on("nodeConnect", () => console.log("Successfully created a new Node."))
        .on("queueEnd", (player) => {
        player.textChannel.send("Queue has ended.");
        player.voiceChannel.leave();
        return client.music.players.destroy(player.guild.id);
    })
        .on("trackStart", ({ textChannel }, { title, duration }) => textChannel.send(`Now playing: **${title}** \`${erela_js_1.Utils.formatTime(duration, true)}\``).then((m) => m.delete({ timeout: 15000 })));
    client.levels = new Map()
        .set("none", 0.0)
        .set("low", 0.10)
        .set("medium", 0.15)
        .set("high", 0.25);
}
exports.default = ready;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvRXZlbnRzL0JvdC9yZWFkeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHVDQUE4QztBQUU5Qyx5Q0FBcUM7QUFFckMsU0FBd0IsS0FBSyxDQUFDLE1BQVc7SUFHckMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFDLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFHM0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUN4QixNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksc0JBQVcsQ0FBQyxNQUFNLEVBQUUsZUFBTSxDQUFDLEtBQUssQ0FBQztTQUNuRCxFQUFFLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUM7U0FDNUIsRUFBRSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7U0FDeEUsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQVcsRUFBRSxFQUFFO1FBQzVCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDNUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ3hELENBQUMsQ0FBQztTQUVELEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFDLFdBQVcsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBQyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGtCQUFrQixLQUFLLFFBQVEsZ0JBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFNUwsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRTtTQUN4QixHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQztTQUNoQixHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztTQUNoQixHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQztTQUNuQixHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBRXZCLENBQUM7QUF4QkQsd0JBd0JDIn0=
import "./utils/methods/array/group"
import * as Discord from "discord.js";
import * as ConfigFile from "./config";
import * as api from "./api";

const client = new api.bot();

client.login(ConfigFile.config.token).then((token: string) => {
    client.handlers(client);
    client.CMDHandler.loadCommands("./dist/commands");
})
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
const Discord = require("discord.js");
const path = require("path");
const ms = require("ms");
class queue {
    constructor() {
        this._command = "queue";
        this.aliases = ["sq"];
        this.category = path.basename(__dirname);
        this.display = true;
    }
    help() {
        return "this command shows shows the queue and navigate through if queue is greater than 10 by reacting to it accordingly";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    usage() {
        return "?queue";
    }
    runCommand(args, msgObject, client, ops) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = client.music.players.get(msgObject.guild.id);
            const { title, requester, uri } = player.queue[0];
            const { queue } = player;
            if (!player) {
                msgObject.channel.send({
                    embed: {
                        description: 'No song is currently playing in this guild.',
                    },
                }).then(msg => { msg.delete({ timeout: 3000 }); });
                msgObject.delete();
                return;
            }
            else if (player.queue.length < 1) {
                msgObject.channel.send('**:x: Nothing playing in this server**')
                    .then(msg => { msg.delete({ timeout: 3000 }); });
                msgObject.delete();
                return;
            }
            else if (!player.queue[1])
                return msgObject.channel.send('', {
                    embed: {
                        description: `🎧 Now Playing:\n[${title}](${uri}) [<@${requester.id}>]`,
                        author: {
                            name: `${msgObject.guild.name}'s Queue.`,
                            icon_url: msgObject.guild.iconURL(),
                        },
                        color: 3447003,
                    },
                });
            else {
                let x;
                if (args.length > 1)
                    x = args.length * 10 + 1;
                else
                    x = 11;
                let i;
                if (args.length > 1)
                    i = x - 11;
                else
                    i = 0;
                let queuelist = player.queue.slice(x - 10, x).map(() => `**${++i}.** [${queue[i].title}](${queue[i].uri}) [<@${queue[i].requester.id}>]`).join('\n');
                if (!queuelist)
                    return msgObject.channel.send('Page doesn\'t exist!');
                const embed = new Discord.MessageEmbed();
                embed.setDescription(`🎧 Now Playing:\n [${title}](${uri}) [<@${requester.id}>]\n__Up Next__:\n${queuelist}`);
                embed.setThumbnail(`https://b1.pngbarn.com/png/59/73/272-youtube-icons-promo-pack-wood-you-tube2-s-webtreatsetc-png-clip-art.png`);
                embed.setAuthor(`${msgObject.guild.name}'s Queue (${Math.floor(x / 10)} / ${player.queue.length})`);
                embed.setFooter(`Total items in queue: ${player.queue.length}`);
                msgObject.channel.send(embed).then((msg) => __awaiter(this, void 0, void 0, function* () {
                    if (player.queue.length > 10) {
                        yield msg.react('⏪');
                        yield msg.react('◀');
                        yield msg.react('🟣');
                        yield msg.react('▶');
                        yield msg.react('⏩');
                        const pages = Math.floor((player.queue.slice(1).length + 10) / 10);
                        let page = Math.floor(x / 10);
                        const back = msg.createReactionCollector((reaction, user) => reaction.emoji.name === '◀' && user.id === msgObject.author.id, { time: 60000 });
                        const doubleback = msg.createReactionCollector((reaction, user) => reaction.emoji.name === '⏪' && user.id === msgObject.author.id, { time: 60000 });
                        const doubleforwad = msg.createReactionCollector((reaction, user) => reaction.emoji.name === '⏩' && user.id === msgObject.author.id, { time: 60000 });
                        const forwad = msg.createReactionCollector((reaction, user) => reaction.emoji.name === '▶' && user.id === msgObject.author.id, { time: 60000 });
                        const middle = msg.createReactionCollector((reaction, user) => reaction.emoji.name === '🟣' && user.id === msgObject.author.id, { time: 60000 });
                        msg.delete({ timeout: 60000 });
                        back.on('collect', (r) => __awaiter(this, void 0, void 0, function* () {
                            if (page === 1)
                                return r.users.remove(msgObject.author);
                            yield r.users.remove(msgObject.author);
                            yield page--;
                            x = Math.floor(page) * 10 + 1;
                            i = x - 11;
                            queuelist = player.queue.slice(x - 10, x).map(() => `**${++i}.** [${queue[i].title}](${queue[i].uri}) [<@${queue[i].requester.id}>]`).join('\n');
                            embed.setDescription(`🎧 Now Playing:\n [${title}](${uri}) [<@${requester.id}>]\n__Up Next__:\n${queuelist}`);
                            embed.setAuthor(`${msgObject.guild.name}'s Queue (${page} / ${pages})`);
                            msg.edit(embed);
                        }));
                        forwad.on('collect', (r) => __awaiter(this, void 0, void 0, function* () {
                            if (page === pages)
                                return r.users.remove(msgObject.author);
                            yield r.users.remove(msgObject.author);
                            yield page++;
                            x = Math.floor(page) * 10 + 1;
                            i = x - 11;
                            queuelist = player.queue.slice(x - 10, x).map(() => `**${++i}.** [${queue[i].title}](${queue[i].uri}) [<@${queue[i].requester.id}>]`).join('\n');
                            embed.setDescription(`🎧 Now Playing:\n [${title}](${uri}) [<@${requester.id}>]\n__Up Next__:\n${queuelist}`);
                            embed.setAuthor(`${msgObject.guild.name}'s Queue (${page} / ${pages})`);
                            msg.edit(embed);
                        }));
                        doubleback.on('collect', (r) => __awaiter(this, void 0, void 0, function* () {
                            if (page === 1)
                                return r.users.remove(msgObject.author);
                            yield r.users.remove(msgObject.author);
                            page = 1;
                            x = Math.floor(page) * 10 + 1;
                            i = x - 11;
                            queuelist = player.queue.slice(x - 10, x).map(() => `**${++i}.** [${queue[i].title}](${queue[i].uri}) [<@${queue[i].requester.id}>]`).join('\n');
                            embed.setDescription(`🎧 Now Playing:\n [${title}](${uri}) [<@${requester.id}>]\n__Up Next__:\n${queuelist}`);
                            embed.setAuthor(`${msgObject.guild.name}'s Queue (${page} / ${pages})`);
                            msg.edit(embed);
                        }));
                        doubleforwad.on('collect', (r) => __awaiter(this, void 0, void 0, function* () {
                            if (page === pages)
                                return r.users.remove(msgObject.author);
                            yield r.users.remove(msgObject.author);
                            page = pages;
                            x = Math.floor(page) * 10 + 1;
                            i = x - 11;
                            queuelist = player.queue.slice(x - 10, x).map(() => `**${++i}.** [${queue[i].title}](${queue[i].uri}) [<@${queue[i].requester.id}>]`).join('\n');
                            embed.setDescription(`🎧 Now Playing:\n [${title}](${uri}) [<@${requester.id}>]\n__Up Next__:\n${queuelist}`);
                            embed.setAuthor(`${msgObject.guild.name}'s Queue (${page} / ${pages})`);
                            msg.edit(embed);
                        }));
                        middle.on('collect', (r) => __awaiter(this, void 0, void 0, function* () { return r.users.remove(msgObject.author); }));
                    }
                }));
                msgObject.delete();
            }
        });
    }
}
exports.default = queue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvbXVzaWMvcXVldWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsNkJBQTZCO0FBRzdCLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QixNQUFxQixLQUFLO0lBQTFCO1FBRW9CLGFBQVEsR0FBRyxPQUFPLENBQUM7UUFDbkIsWUFBTyxHQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsYUFBUSxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0MsWUFBTyxHQUFhLElBQUksQ0FBQztJQXFJN0MsQ0FBQztJQW5JRyxJQUFJO1FBQ0EsT0FBTyxtSEFBbUgsQ0FBQztJQUMvSCxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQWU7UUFDekIsT0FBTyxPQUFPLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsS0FBSztRQUNELE9BQU8sUUFBUSxDQUFBO0lBQ25CLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLFNBQTBCLEVBQUUsTUFBc0IsRUFBRSxHQUFROztZQUd6RixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUU1RCxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWxELE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLENBQUM7WUFDekIsSUFBSSxDQUFDLE1BQU0sRUFDWDtnQkFDSSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztvQkFDbkIsS0FBSyxFQUFFO3dCQUNQLFdBQVcs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QUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBTyxHQUFHLEVBQUUsRUFBRTtvQkFDN0MsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLEVBQUM7d0JBQ3pCLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDckIsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNyQixNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3RCLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDckIsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNyQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO3dCQUNuRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQzt3QkFDOUIsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUMsUUFBYSxFQUFFLElBQVMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzt3QkFDeEosTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUMsUUFBYSxFQUFFLElBQVMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUss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
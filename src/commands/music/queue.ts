import * as Discord from "discord.js";
import * as path from "path";
import { IBotCommand } from "../../api";
import { Track } from "erela.js";
const ms = require("ms");

export default class queue implements IBotCommand {
    
    public readonly _command = "queue";
    public readonly aliases : string[] = ["sq"];
    public readonly category : string = path.basename(__dirname);
    public readonly display : boolean = true;

    help(): string {
        return "this command shows shows the queue and navigate through if queue is greater than 10 by reacting to it accordingly";
    }
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }
    usage(): string {
        return "?queue"
    }
    
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client, ops: any): Promise<any> {

        //@ts-ignore
        const player = client.music.players.get(msgObject.guild.id);
        
        const { title, requester, uri } = player.queue[0];

        const { queue } = player;
        if (!player)
        { 
            msgObject.channel.send({
                embed: {
                description: 'No song is currently playing in this guild.',
                },
            }).then(msg=> {msg.delete({timeout: 3000})});
            msgObject.delete();
            return;
        }
        
        else
        if (player.queue.length < 1)
        { 
            msgObject.channel.send('**:x: Nothing playing in this server**')
            .then(msg => {msg.delete({timeout: 3000})});
            msgObject.delete();
            return;
        }
        else
        if (!player.queue[1]) return msgObject.channel.send('', {
            embed: {
            description: `🎧 Now Playing:\n[${title}](${uri}) [<@${requester.id}>]`,
            author: {
                name: `${msgObject.guild.name}'s Queue.`,
                icon_url: msgObject.guild.iconURL(),
            },
            color: 3447003,
            },
        });
        else{
            let x: any;
            //@ts-ignore
            if (args.length > 1) x = args.length * 10 + 1;
            else x = 11 ;
            let i: any;
            //@ts-ignore
            if (args.length > 1) i = x - 11;
            else i = 0;

            let queuelist = player.queue.slice(x - 10, x).map(() => `**${++i}.** [${queue[i].title}](${queue[i].uri}) [<@${queue[i].requester.id}>]`).join('\n');
            if (!queuelist) return msgObject.channel.send('Page doesn\'t exist!');
            const embed = new Discord.MessageEmbed();
            embed.setDescription(`🎧 Now Playing:\n [${title}](${uri}) [<@${requester.id}>]\n__Up Next__:\n${queuelist}`);
            embed.setThumbnail(`https://b1.pngbarn.com/png/59/73/272-youtube-icons-promo-pack-wood-you-tube2-s-webtreatsetc-png-clip-art.png`);
            embed.setAuthor(`${msgObject.guild.name}'s Queue (${Math.floor(x / 10)} / ${player.queue.length})`);
            embed.setFooter(`Total items in queue: ${player.queue.length}`);
            msgObject.channel.send(embed).then(async (msg) => {
                if (player.queue.length > 10){
                    await msg.react('⏪');
                    await msg.react('◀');
                    await msg.react('🟣');
                    await msg.react('▶');
                    await msg.react('⏩');
                    const pages = Math.floor((player.queue.slice(1).length + 10) / 10);
                    let page = Math.floor(x / 10);
                    const back = msg.createReactionCollector((reaction: any, user: any) => reaction.emoji.name === '◀' && user.id === msgObject.author.id, { time: 60000 });
                    const doubleback = msg.createReactionCollector((reaction: any, user: any) => reaction.emoji.name === '⏪' && user.id === msgObject.author.id, { time: 60000 });
                    const doubleforwad = msg.createReactionCollector((reaction: any, user: any) => reaction.emoji.name === '⏩' && user.id === msgObject.author.id, { time: 60000 });
                    const forwad = msg.createReactionCollector((reaction: any, user: any) => reaction.emoji.name === '▶' && user.id === msgObject.author.id, { time: 60000 });
                    const middle = msg.createReactionCollector((reaction: any, user: any) => reaction.emoji.name === '🟣' && user.id === msgObject.author.id, { time: 60000 });
                    msg.delete({ timeout: 60000 });
                    back.on('collect', async (r: any) => {
                    if (page === 1) return r.users.remove(msgObject.author);
                    await r.users.remove(msgObject.author);
                    await page--;
                    x = Math.floor(page) * 10 + 1;
                    i = x - 11;
                    queuelist = player.queue.slice(x - 10, x).map(() => `**${++i}.** [${queue[i].title}](${queue[i].uri}) [<@${queue[i].requester.id}>]`).join('\n');
                    embed.setDescription(`🎧 Now Playing:\n [${title}](${uri}) [<@${requester.id}>]\n__Up Next__:\n${queuelist}`);
                    embed.setAuthor(`${msgObject.guild.name}'s Queue (${page} / ${pages})`);
                    msg.edit(embed);
                    });
                    forwad.on('collect', async (r: any) => {
                    if (page === pages) return r.users.remove(msgObject.author);
                    await r.users.remove(msgObject.author);
                    await page++;
                    x = Math.floor(page) * 10 + 1;
                    i = x - 11;
                    queuelist = player.queue.slice(x - 10, x).map(() => `**${++i}.** [${queue[i].title}](${queue[i].uri}) [<@${queue[i].requester.id}>]`).join('\n');
                    embed.setDescription(`🎧 Now Playing:\n [${title}](${uri}) [<@${requester.id}>]\n__Up Next__:\n${queuelist}`);
                    embed.setAuthor(`${msgObject.guild.name}'s Queue (${page} / ${pages})`);
                    msg.edit(embed);
                    });
                    doubleback.on('collect', async (r) => {
                    if (page === 1) return r.users.remove(msgObject.author);
                    await r.users.remove(msgObject.author);
                    page = 1;
                    x = Math.floor(page) * 10 + 1;
                    i = x - 11;
                    queuelist = player.queue.slice(x - 10, x).map(() => `**${++i}.** [${queue[i].title}](${queue[i].uri}) [<@${queue[i].requester.id}>]`).join('\n');
                    embed.setDescription(`🎧 Now Playing:\n [${title}](${uri}) [<@${requester.id}>]\n__Up Next__:\n${queuelist}`);
                    embed.setAuthor(`${msgObject.guild.name}'s Queue (${page} / ${pages})`);
                    msg.edit(embed);
                    });
                    doubleforwad.on('collect', async (r) => {
                    if (page === pages) return r.users.remove(msgObject.author);
                    await r.users.remove(msgObject.author);
                    page = pages;
                    x = Math.floor(page) * 10 + 1;
                    i = x - 11;
                    queuelist = player.queue.slice(x - 10, x).map(() => `**${++i}.** [${queue[i].title}](${queue[i].uri}) [<@${queue[i].requester.id}>]`).join('\n');
                    embed.setDescription(`🎧 Now Playing:\n [${title}](${uri}) [<@${requester.id}>]\n__Up Next__:\n${queuelist}`);
                    embed.setAuthor(`${msgObject.guild.name}'s Queue (${page} / ${pages})`);
                    msg.edit(embed);
                    });
                    middle.on('collect', async (r) => r.users.remove(msgObject.author));
                }
            })
            msgObject.delete();
        }
    }
}
import Telegraf, { Context } from 'telegraf';
import { Bot } from '../server/models/Bot';
import { logFailed, logSuccess } from '../logger';

type ctxType = typeof Context;

export class BotInstance {
    private bot: Telegraf<Context>;

    constructor(token: string) {
        this.bot = new Telegraf(token);
    }

    start() {
        // @ts-ignore
        this.bot.start((ctx: ctxType) => ctx.reply('Welcome!'));
        // @ts-ignore
        this.bot.help((ctx: ctxType) => ctx.reply('Send me a sticker'));
        // @ts-ignore
        this.bot.on('sticker', (ctx: ctxType) => ctx.reply('👍'));
        // @ts-ignore
        this.bot.hears('hi', (ctx: ctxType) => ctx.reply('Hey there'));
        this.bot.launch();
    }

    stop() {
        this.bot.stop();
    }
}

export class BotManager {
    private botInstanceList: any = {};
    private static instance: BotManager;

    public static getInstance(): BotManager {
        if (!BotManager.instance) {
            BotManager.instance = new BotManager();
        }
        return BotManager.instance;
    }

    /* Start all bots with status started */
    async init() {
        const list = await Bot.find({ status: 'started' }).exec();

        list.forEach((item) => {
            let bot = new BotInstance(item.token);
            this.add(bot, item.token, item.status);
            this.start(item.token, item._id);
        });
    }

    build(token: string) {
        const bot = new BotInstance(token);
        this.add(bot, token, 'created');
    }

    add(bot: BotInstance, token: string, status: string) {
        this.botInstanceList = {
            ...this.botInstanceList,
            [token]: { instance: bot, status: status },
        };
    }

    getInfo() {
        return Object.keys(this.botInstanceList).map((item) => ({
            [item]: { status: this.botInstanceList[item].status },
        }));
    }

    start(token: string, id: string) {
        if (!this.botInstanceList[token]) {
            this.build(token);
        }

        this.botInstanceList[token].instance.start();
        this.botInstanceList[token].status = 'started';

        logSuccess(`Bot id=${id} started`);
    }

    stop(token: string, id: string) {
        if (!this.botInstanceList[token]) {
            this.build(token);
        }

        this.botInstanceList[token].instance.stop();
        this.botInstanceList[token].status = 'stopped';

        logFailed(`Bot id=${id} stopped`);
    }
}

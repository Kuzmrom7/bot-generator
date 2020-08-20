import Telegraf, { Context } from 'telegraf';

type ctxType = typeof Context;
type BotStatus = 'STARTED' | 'STOPPED';

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
    private botInstanceList: any;
    private static instance: BotManager;

    public static getInstance(): BotManager {
        if (!BotManager.instance) {
            BotManager.instance = new BotManager();
        }
        return BotManager.instance;
    }

    add(bot: BotInstance, token: string) {
        this.botInstanceList = {
            ...this.botInstanceList,
            [token]: { instance: bot, status: 'STOPPED' },
        };
    }

    get(token: string) {
        return this.botInstanceList[token];
    }

    getInfo() {
        return Object.keys(this.botInstanceList).map((item) => ({
            [item]: { status: this.botInstanceList[item].status },
        }));
    }

    start(token: string) {
        this.botInstanceList[token].instance.start();
        this.botInstanceList[token].status = 'STARTED';
    }

    stop(token: string) {
        this.botInstanceList[token].instance.stop();
        this.botInstanceList[token].status = 'STOPPED';
    }
}

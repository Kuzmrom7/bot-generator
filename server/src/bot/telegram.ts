import Telegraf, { Context } from 'telegraf'

type ctxType = typeof Context;

export class BotTgInstance {
    private bot: Telegraf<Context>;

    constructor(token: string) {
        this.bot = new Telegraf(token);
    }

    /**
     * Start instance bot
     * here example logic for bot
     */
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

    /**
     * Stop instance bot
     */
    stop() {
        this.bot.stop();
    }
}

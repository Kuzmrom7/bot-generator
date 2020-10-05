import { BotType } from './../api/types';
import Telegraf, { Context, Telegram } from 'telegraf'

type ctxType = typeof Context;


export interface ITelegramBot {
    start: () => void;
    stop: () => void;
}

export class BotTgInstance implements ITelegramBot {
    private bot: Telegraf<Context> | Telegram;

    constructor(token: string, type: BotType) {
        this.bot = type === "monitor" ? new Telegram(token) : new Telegraf(token);
    }

    /**
     * Start instance bot
     * here example logic for bot
     */
    start() {
        if (this.bot instanceof Telegram) {
            // somecode
        }

        if (this.bot instanceof Telegraf) {
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


    }

    /**
     * Stop instance bot
     */
    stop() {
        if (this.bot instanceof Telegraf) {
            this.bot.stop();
        }

    }
}

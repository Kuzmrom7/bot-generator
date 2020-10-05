import { BotType } from './../api/types';
import { Bot } from '../api/models/Bot';
import { logFailed, logSuccess } from '../logger';
import { BotTgInstance } from './telegram'

export class BotManager {
    private botInstanceList: any = {};
    private static instance: BotManager;

    public static getInstance(): BotManager {
        if (!BotManager.instance) {
            BotManager.instance = new BotManager();
        }
        return BotManager.instance;
    }

    /**
     * Start all bots with status === started
     */
    async init() {
        const list = await Bot.find({ status: 'started' }).exec();

        list.forEach((item) => {
            let bot = new BotTgInstance(item.token, item.type);
            this.add(bot, item.token, item.status);
            this.start(item.token, item._id);
        });
    }

    /**
     * Build bot instance by token
     */
    build(token: string, type: BotType) {
        const bot = new BotTgInstance(token, type);
        this.add(bot, token, 'created');
    }

    /**
     * Add bot to bot instances list
     */
    add(bot: BotTgInstance, token: string, status: string) {
        this.botInstanceList = {
            ...this.botInstanceList,
            [token]: { instance: bot, status: status },
        };
    }


    /**
     * Running bot by token
     * Checking instances list if don't have bot we need a build instance
     */
    start(token: string, id?: string, type?: BotType,) {
        if (!this.botInstanceList[token]) {
            this.build(token, type = 'default_logic');
        }

        this.botInstanceList[token].instance.start();
        this.botInstanceList[token].status = 'started';

        logSuccess(`Bot id=${id || ''} started`);
    }

    /**
     * Stopping bot by token
     */
    stop(token: string, id: string) {
        this.botInstanceList[token].instance.stop();
        this.botInstanceList[token].status = 'stopped';

        logFailed(`Bot id=${id} stopped`);
    }

    /**
    * Remove bot fron instance
    */
    remove(token: string, id: string) {
        if (this.botInstanceList[token]) {
            this.botInstanceList[token].instance.stop();
            delete this.botInstanceList[token]

            logFailed(`Bot id=${id} removed`);
        }

    }

}

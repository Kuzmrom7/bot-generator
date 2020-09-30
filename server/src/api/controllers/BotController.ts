import { Response } from 'express';
import { BotManager } from '../../bot';
import { Bot } from '../models/Bot';

export class BotController {
    public async add(req: any, res: Response): Promise<void> {
        try {
            if (req.params) {
                await Bot.create({ token: req.params.token, status: 'created', userId: req.user._id });

                await res.status(200).send({ message: `Bot ${req.params.token} created!` });
            } else {
                res.send('Token undefined');
            }
        } catch (e) {
            res.sendStatus(400).send(e);
        }
    }

    public async start(req: any, res: Response): Promise<void> {
        try {
            if (req.params) {
                const bot = await Bot.findOne({ userId: req.user._id, _id: req.params.id });

                if (bot) {
                    const botManager = await BotManager.getInstance();
                    await botManager.start(bot.token, req.params.id);
                    await Bot.findByIdAndUpdate({ _id: req.params.id }, { status: 'started' });
                }

                await res.status(200).send({ message: `Bot ${req.params.id} started!` });
            } else {
                res.send('Token undefined');
            }
        } catch (e) {
            res.sendStatus(400).send(e);
        }
    }

    public async stop(req: any, res: Response): Promise<void> {
        try {
            if (req.params) {
                const bot = await Bot.findOne({ userId: req.user._id, _id: req.params.id });

                if (bot) {
                    const botManager = await BotManager.getInstance();
                    await botManager.stop(bot.token, req.params.id);
                    await Bot.findByIdAndUpdate({ _id: req.params.id }, { status: 'stopped' });
                }

                await res.status(200).send({ message: `Bot ${req.params.token} stopped!` });
            } else {
                res.send('Token undefined');
            }
        } catch (e) {
            res.sendStatus(400).send(e);
        }
    }

    public async getList(req: any, res: Response): Promise<void> {
        try {
            const list = await Bot.find({ userId: req.user._id });
            await res.status(200).send({ list: list });
        } catch (e) {
            res.sendStatus(400).send(e);
        }
    }
}

import { Response } from 'express';
import { BotManager } from '../../bot';
import { Bot } from '../models/Bot';

import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

export class BotController {
    public async add(req: any, res: Response): Promise<void> {
        try {
            if (req.params) {
                await Bot.create({
                    token: req.params.token,
                    status: 'created',
                    userId: req.user._id,
                    type: 'none',
                    name: req.user.name ?
                        req.user.name
                        : uniqueNamesGenerator({
                            dictionaries: [colors, animals],
                            style: 'capital',
                            separator: ' ',
                        })
                });

                res.status(200).send({ message: `Bot ${req.params.token} created!` });
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
                    const botManager = BotManager.getInstance();
                    botManager.start(bot.token, req.params.id, bot.type);
                    await Bot.findByIdAndUpdate({ _id: req.params.id }, { status: 'started' });
                    res.status(200).send({ message: `Bot ${req.params.id} started!` });
                } else {
                    res.send('Bot undefined');
                }

            } else {
                res.send('Token undefined');
            }
        } catch (e) {
            res.sendStatus(400).send(e);
        }
    }

    public async bindType(req: any, res: Response) {
        try {
            if (!req.body || !req.body._id && !req.body.type) {
                throw new Error('Invalid data')
            }

            if (req.body) {

                const bot = await Bot.findOneAndUpdate({ userId: req.user._id, _id: req.body._id }, { type: req.body.type, status: 'started' });

                if (bot) {
                    const botManager = BotManager.getInstance();

                    botManager.remove(bot.token, req.body.id);
                    botManager.start(bot.token, req.params.id, req.body.type);

                    res.status(200).send({ message: `Bot ${req.body._id} updated!` });

                } else {
                    res.status(200).send({ message: `Bot ${req.body._id} not updated!` });
                }

            } else {
                res.send('Token undefined');
            }


        } catch (e) {
            res.status(400).send({ message: e.message })
        }
    }

    public async stop(req: any, res: Response): Promise<void> {
        try {
            if (req.params) {
                const bot = await Bot.findOne({ userId: req.user._id, _id: req.params.id });

                if (bot) {
                    const botManager = BotManager.getInstance();
                    botManager.stop(bot.token, req.params.id);
                    await Bot.findByIdAndUpdate({ _id: req.params.id }, { status: 'stopped' });
                }

                res.status(200).send({ message: `Bot ${req.params.token} stopped!` });
            } else {
                res.send('Token undefined');
            }
        } catch (e) {
            res.sendStatus(400).send(e);
        }
    }

    public async getList(req: any, res: Response): Promise<void> {
        try {
            const list = await Bot.find({ userId: req.user._id }).exec();
            res.status(200).send({ list: list });
        } catch (e) {
            res.sendStatus(400).send(e);
        }
    }

    public async getBot(req: any, res: Response): Promise<void> {
        try {

            if (req.params) {

                const bot = await Bot.findOne({ userId: req.user._id, _id: req.params.id }).exec();
                res.status(200).send({ bot: bot });

            } else {
                res.send('Bot undefined');
            }


        } catch (e) {
            res.sendStatus(400).send(e);
        }
    }
}

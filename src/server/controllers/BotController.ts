import { Request, Response } from 'express';
import { BotInstance, BotManager } from '../../bot';

export class BotController {
    public async start(req: Request, res: Response): Promise<void> {
        try {
            if (req.params) {
                const token = req.params.token;
                const bot = await new BotInstance(token);
                const botManager = await BotManager.getInstance();

                await botManager.add(bot, token);
                await botManager.start(token);

                res.send(`Bot ${req.params.token} started!`);
            } else {
                res.send('Token undefined');
            }
        } catch (e) {
            res.sendStatus(400).send(e);
        }
    }

    public async stop(req: Request, res: Response): Promise<void> {
        try {
            if (req.params) {
                const token = req.params.token;
                const botManager = BotManager.getInstance();

                botManager.stop(token);
                res.send(`Bot ${req.params.token} stopped!`);
            } else {
                res.send('Token undefined');
            }
        } catch (e) {
            res.sendStatus(400).send(e);
        }
    }

    public async getList(req: Request, res: Response): Promise<void> {
        try {
            const botManager = BotManager.getInstance();
            const list = botManager.getInfo();

            res.send(list);
        } catch (e) {
            res.sendStatus(400).send(e);
        }
    }
}

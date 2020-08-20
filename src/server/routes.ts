import { Router } from 'express';
import AuthMiddleware from './middlewares/AuthMiddleware';
import { BotInstance, BotManager } from '../bot';
import { BotController } from './controllers/BotController';

export class Routes {
    public router: Router;
    public authMiddleware: AuthMiddleware = new AuthMiddleware();
    public botController: BotController = new BotController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/', function (req, res) {
            res.send('Hello World!');
        });

        this.router.get('/start/:token', this.botController.start);
        this.router.get('/stop/:token', this.botController.stop);
        this.router.get('/bot_list', this.botController.getList);
    }
}

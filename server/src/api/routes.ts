import { Router } from 'express';
import AuthMiddleware from './middlewares/AuthMiddleware';
import { BotController } from './controllers/BotController';
import { UserController } from './controllers/UserController';
import passport from 'passport';

export class Routes {
    public router: Router;

    public authMiddleware: AuthMiddleware = new AuthMiddleware();

    public botController: BotController = new BotController();
    public userController: UserController = new UserController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/', function (req, res) {
            res.send('Hello World!');
        });

        /** User routes */

        this.router.post('/sign_up', this.userController.registerUser);
        this.router.post('/sign_in', passport.authenticate('local'), this.userController.authenticateUser);

        /** Bot routes */

        this.router.get('/add/:token', this.authMiddleware.authenticateJWT, this.botController.add);
        this.router.get('/start/:id', this.authMiddleware.authenticateJWT, this.botController.start);
        this.router.get('/stop/:id', this.authMiddleware.authenticateJWT, this.botController.stop);
        this.router.get('/bot_list', this.authMiddleware.authenticateJWT, this.botController.getList);

        this.router.post('/bind_type', this.authMiddleware.authenticateJWT, this.botController.bindType);
    }
}

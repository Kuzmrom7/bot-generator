import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { JWT_SECRET } from '../secret';

export class UserController {
    public async registerUser(req: Request, res: Response): Promise<void> {
        try {
            await User.create({
                username: req.body.username,
                password: req.body.password,
            });

            const token = await jwt.sign(
                { username: req.body.username, scope: req.body.scope },
                JWT_SECRET,
            );
            await res.status(200).send({ token: token });
        } catch (e) {
            res.send(e);
        }
    }

    public async authenticateUser(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const token = await jwt.sign(
                { username: req.body.username, scope: req.body.scope },
                JWT_SECRET,
            );
            await res.status(200).send({ token: token });
        } catch (e) {
            res.send(e);
        }
    }
}

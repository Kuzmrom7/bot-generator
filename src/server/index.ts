import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';

require('dotenv').config()

import { Routes } from './routes';
import mongoose from './db';
import { BotManager } from '../bot';

const app: express.Application = express();
const botManager = BotManager.getInstance();

mongoose.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(passport.initialize());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', new Routes().router);

botManager.init();

app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});

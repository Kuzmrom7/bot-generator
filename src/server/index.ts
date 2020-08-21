import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';

import { Routes } from './routes';
import mongoose from './db';

const app: express.Application = express();

mongoose.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(passport.initialize());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', new Routes().router);

app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});

import express from 'express';

import { Routes } from './routes';
import mongoose from 'mongoose';

const app: express.Application = express();

mongoose.connection.on(
    'error',
    console.error.bind(console, 'MongoDB connection error:'),
);

app.use('/', new Routes().router);

app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});

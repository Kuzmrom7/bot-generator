import mongoose from 'mongoose';

mongoose
    .connect('mongodb+srv://roman:kuzmenko@cluster0.cl2qt.mongodb.net/bot?retryWrites=true&w=majority', {
        useNewUrlParser: true,
    })
    .catch((e: Error) => {
        console.error('Connection error', e.message);
    });

export default mongoose.connection;

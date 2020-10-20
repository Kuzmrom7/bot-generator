import mongoose from 'mongoose';

export const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.log('No mongo connection string. Set MONGODB_URI environment variable.');
    process.exit(1);
}

mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
    })
    .catch((e: Error) => {
        console.error('Connection error', e.message);
    });

export default mongoose.connection;

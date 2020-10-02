import { Schema, Document, Model, model } from 'mongoose';

export interface IBot extends Document {
    name: string;
    token: string;
    status: string;
    userId: string;
}

export const botSchema: Schema = new Schema({
    token: { type: String, unique: true },
    name: String,
    status: String,
    userId: String,
});

export const Bot: Model<IBot> = model<IBot>('Bot', botSchema);

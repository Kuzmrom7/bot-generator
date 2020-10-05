import { BotType } from './../types';
import { Schema, Document, Model, model } from 'mongoose';


export interface IBot extends Document {
    name: string;
    token: string;
    status: string;
    userId: string;
    type: BotType;
}

export const botSchema: Schema = new Schema({
    token: { type: String, unique: true },
    name: String,
    status: String,
    userId: String,
    type: {
        type: String,
        enum: ['none', 'monitor', 'default_logic'],
        default: "none"
    }
});

export const Bot: Model<IBot> = model<IBot>('Bot', botSchema);

import { Schema, Document, Model, model } from 'mongoose';


export interface IMonitor extends Document {
    chatId: string;
    botId: string;
    url: String[],

}

export const botSchema: Schema = new Schema({
    chatId: String,
    botId: String,
    url: Array,

});

export const Bot: Model<IMonitor> = model<IMonitor>('Monitor', botSchema);

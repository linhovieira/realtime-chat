import mongoose from 'mongoose';
import { Env } from '../env.js';

export const connectDB = async () => {
    const MONGO_URI = Env.MONGO_URI;
    if (!MONGO_URI) {
        throw new Error('MONGO_URI is not defined!');
    }

    if (mongoose.connection.readyState === 1) {
        await mongoose.disconnect();
    }

    const conn = await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    console.log(`MongoDB connected! Host: ${conn.connection.host}`);
}
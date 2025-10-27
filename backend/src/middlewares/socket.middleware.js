import jwt from 'jsonwebtoken';
import { Env } from '../env.js';
import User from "../models/user.model.js";

export const socketMiddleware = async (socket, next) => {
    try {
        const token = socket.handshake.headers.cookie
            .split(';')
            .find(row => row.trim().startsWith('access_token='))
            .split('=')[1];

        if (!token) {
            console.error('No token found in the handshake headers');
            return next(new Error('Unauthorized - No token provided!'));
        }

        const decoded = jwt.verify(token, Env.JWT_SECRET);
        if (!decoded) {
            console.error('Invalid token');
            return next(new Error('Unauthorized - Invalid token!'));
        }

        const user = await User.findById(decoded.userId, {}, undefined).select('-password');
        if (!user) {
            console.error('User not found');
            return next(new Error('Unauthorized - Invalid Credentials!'));
        }

        socket.user = user;
        socket.userId = user['_id']?.toString();

        console.log(`Socket authenticated for user: ${user['fullName']} (${user['_id']})`);

        next();

    } catch (error) {
        console.warn('An error occurred while trying handshake [socket-middleware]!');
        console.error(`Error: ${error.message}`);
        return next(new Error('An error occurred while processing handshake!'));
    }
}
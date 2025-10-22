import jwt from 'jsonwebtoken';
import { Env } from '../env.js';

export const generateToken = (userId, response) => {
    const JWT_SECRET = Env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined!');
    }
    const token = jwt.sign({ userId: userId }, JWT_SECRET, { expiresIn: '1d' });
    response.cookie('access_token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 })
}
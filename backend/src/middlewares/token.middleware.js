import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { Env } from '../env.js';

export const verifyCredential = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - No token provided!' });
        }

        const decoded = jwt.verify(token, Env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token!' });
        }

        const user = await User.findById(token.userId, {}, undefined);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token!' });
        }

        req.user = user;
        next();

    } catch (error) {
        console.warn('An error occurred while trying request [token-middleware]!');
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ message: 'An error occurred while processing your request!' });
    }
}
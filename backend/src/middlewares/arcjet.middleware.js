import aj from '../libraries/arcjet.js';
import { isSpoofedBot } from '@arcjet/inspect';

export const arcjetProtection = async (req, res, next) => {
    try {
        const decision = await aj.protect(req);
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ message: 'Too many requests, please try again later!' });
            } else if (decision.reason.isBot()) {
                return res.status(403).json({ message: 'Bots are not allowed!' });
            } else {
                return res.status(403).json({ message: 'Access denied by security policy!' });
            }
        }

        if (decision.results.some(isSpoofedBot)) {
            return res.status(403).json({ message: 'Spoofed bot detected!' });
        }

        next();

    } catch (error) {
        console.warn('An error occurred while trying request [arcjet-middleware]!');
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ message: 'An error occurred while processing your request!' });
    }
}
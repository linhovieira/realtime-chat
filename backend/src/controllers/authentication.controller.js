import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../libraries/jwt-token.js';
import { sendWelcomeEmail } from "../mail/mail-handler.js";
import { Env } from '../env.js';

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields!' });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long!' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format!' });
        }

        const user = await User.findOne({email: email}, {}, undefined);
        if (user) {
            return res.status(409).json({ message: 'Email already exists!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullName: fullName, email: email, password: hashedPassword });

        const userSaved = await newUser.save();
        generateToken(userSaved._id, res);

        await sendWelcomeEmail(userSaved['email'], userSaved['fullName'], Env.CLIENT_URL);

        return res.status(201).json({ id: newUser._id, fullName: newUser['fullName'], email: newUser['email'], profilePicture: newUser['profilePicture'] });

    } catch (error) {
        console.warn('An error occurred while trying request path signup!');
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ message: 'An error occurred while processing your request!' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields!' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format!' });
        }

        const user = await User.findOne({email: email}, {}, undefined);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        const isPasswordValid = await bcrypt.compare(password, user['password']);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        generateToken(user._id, res);

        return res.status(200).json({ id: user._id, fullName: user['fullName'], email: user['email'], profilePicture: user['profilePicture'] });

    } catch (error) {
        console.warn('An error occurred while trying request path login!');
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ message: 'An error occurred while processing your request!' });
    }
};

export const logout = (_, res) => {
    const options = { httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: 0 };
    res.cookie('access_token', options);
    return res.status(200).json({ message: 'Logged out successfully!' });
};
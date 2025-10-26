import dotenv from 'dotenv';

dotenv.config();

export const Env = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    IS_HTTPS: process.env.IS_HTTPS,
    CERT_PATH: process.env.CERT_PATH,
    KEY_PATH: process.env.KEY_PATH,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_MAIL_NAME: process.env.RESEND_MAIL_NAME,
    RESEND_MAIL_FROM: process.env.RESEND_MAIL_FROM,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    ARCJET_KEY: process.env.ARCJET_KEY,
    ARCJET_ENV: process.env.ARCJET_ENV,
    CLIENT_URL: process.env.CLIENT_URL,
};
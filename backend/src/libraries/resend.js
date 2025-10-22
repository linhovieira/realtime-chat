import { Resend } from 'resend';
import { Env } from '../env.js';

export const resendClient = new Resend(Env.RESEND_API_KEY);

export const sender = {
    email: Env.RESEND_MAIL_FROM,
    name: Env.RESEND_MAIL_NAME,
};
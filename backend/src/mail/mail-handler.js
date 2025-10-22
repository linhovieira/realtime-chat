import { resendClient, sender } from '../libraries/resend.js';
import { createWelcomeMailTemplate } from './mail-template.js';


export const sendWelcomeEmail = async (email, name, clientURL) => {
    const payload = {
        from: `${sender.name} <${sender.email}>`,
        to: [email],
        subject: 'Welcome to Chat App!',
        html: createWelcomeMailTemplate(name, clientURL)
    };
    const { data, error } = await  resendClient.emails.send(payload);
    if (error) {
        console.warn('Error sending welcome email!');
        console.error(`Error: ${error.message}`);
        throw error;
    }
    console.log('Welcome email sent successfully:', data);
};
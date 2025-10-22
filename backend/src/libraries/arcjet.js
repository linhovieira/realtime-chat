import arcjet, { shield, detectBot, slidingWindow } from '@arcjet/node';
import { Env } from '../env.js';

const aj = arcjet({
    key: Env.ARCJET_KEY,
    rules: [
        shield({ mode: 'LIVE' }),
        detectBot({
            mode: 'LIVE',
            allow: [
                'CATEGORY:SEARCH_ENGINE',
            ],
        }),
        slidingWindow({
            mode: 'LIVE',
            max: 50,
            interval: 60
        })
    ],
});

export default aj;
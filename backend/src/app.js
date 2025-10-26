import express from 'express';
import routes from './routes/index.js';
import * as path from 'node:path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Env } from './env.js';


const __dirname = path.resolve();

const app = express();

app.use(cors({origin: Env.CLIENT_URL, credentials: true}));
app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());

routes(app);

if (Env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (_, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}


export default app;
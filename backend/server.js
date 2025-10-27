import * as https from 'https';
import * as http from 'http';
import * as fs from 'fs';
import { Env } from './src/env.js';

import app from './src/app.js';
import { connectDB } from './src/libraries/database.js';
import { SocketInstance } from './src/libraries/socket.js';

const PORT = Env.PORT;

const serverOptions = {
    key: fs.readFileSync(Env.CERT_PATH),
    cert: fs.readFileSync(Env.KEY_PATH)
};
const server = Env.IS_HTTPS ? https.createServer(serverOptions, app) : http.createServer(app);

connectDB()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            SocketInstance(server);
        });
    })
    .catch(error => {
        console.warn('An error occurred while trying to connect to the MongoDB database!');
        console.error(`Error: ${error.message}`);
        process.exit(1);
    });




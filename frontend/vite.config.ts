import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
import * as fs from 'fs';
import tailwindcss from "@tailwindcss/vite";

dotenv.config();

const CERT_PATH = process.env.CERTS_HOME;

// https://vite.dev/config/
export default defineConfig({
   plugins: [react(), tailwindcss()],
   server: {
      https: {
         key: fs.readFileSync(`${ CERT_PATH }/server-key.pem`),
         cert: fs.readFileSync(`${ CERT_PATH }/server.pem`),
      }
   }

})

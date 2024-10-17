import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import {createEncryptionSession} from "./api/create-encryption-session";
import {createSession} from "./api/create-session";
import {collect} from "./api/collect";
import {revokeSession} from "./api/revoke-session";


// Create an instance of Express
const app = express();
app.use(express.json());

// Define the port number
const PORT = process.env.SERVER_PORT || 3005;

// Define a route
app.get('/', (req: Request, res: Response) => {
    res.send('OK');
});

app.post('/api/protected-collect', collect);
app.post('/api/protected-create-encryption-session', createEncryptionSession);
app.post('/api/protected-create-session', createSession);
app.post('/api/protected-revoke-session', revokeSession);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

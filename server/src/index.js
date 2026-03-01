import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { requestOtp, verifyOtp } from './controllers/authController.js';
import { handleScalevWebhook } from './controllers/webhookController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// DEBUG LOGGING
app.use((req, res, next) => {
    console.log(`[DEBUG] Incoming Request: ${req.method} ${req.url}`);
    console.log('[DEBUG] Body:', req.body);
    next();
});

// Routes
app.get('/', (req, res) => {
    res.send('ModalHP API Service is Running');
});

// Auth
app.get('/ping', (req, res) => res.send('pong'));

app.post('/api/auth/otp', requestOtp);
app.post('/api/auth/verify', verifyOtp);

// Webhooks
app.post('/webhooks/scalev', handleScalevWebhook);

import { pushData, pullData } from './controllers/syncController.js';

// Cloud Sync
app.post('/api/sync/push', pushData);
app.get('/api/sync/pull', pullData);

import { submitSupportRequest } from './controllers/supportController.js';
import { getFeatures, createFeature, toggleVote } from './controllers/featureController.js';

// Support & Features
app.post('/api/support', submitSupportRequest);
app.get('/api/features', getFeatures);
app.post('/api/features', createFeature);
app.post('/api/features/:id/vote', toggleVote);

// 404 Handler
app.use((req, res, next) => {
    console.log(`[DEBUG] 404 Not Found: ${req.method} ${req.url}`);
    res.status(404).send('Route not found');
});

// Error Handler
app.use((err, req, res, next) => {
    console.error('[DEBUG] Global Error Handler:', err);
    res.status(500).send('Internal Server Error');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(process.env.npm_package_version);

    // DEBUG: Force keep-alive
    setInterval(() => {
        // console.log('[DEBUG] Heartbeat');
    }, 10000);
});

process.on('exit', (code) => {
    console.log(`[DEBUG] Process exit with code: ${code}`);
});
process.on('SIGINT', () => {
    console.log('[DEBUG] SIGINT received');
    process.exit();
});

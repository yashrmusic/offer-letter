
import { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, DisconnectReason } from '@whiskeysockets/baileys';
import pino from 'pino';
import fs from 'fs';
import path from 'path';
import os from 'os';
import readline from 'readline';

const HOME = os.homedir();
const AUTH_DIR = path.join(HOME, '.clawdbot', 'credentials', 'whatsapp', 'default');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    console.log(`\nUsing Auth Directory: ${AUTH_DIR}`);

    // Clean up if corrupted
    if (fs.existsSync(AUTH_DIR)) {
        fs.rmSync(AUTH_DIR, { recursive: true, force: true });
    }
    fs.mkdirSync(AUTH_DIR, { recursive: true });

    const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
    const { version } = await fetchLatestBaileysVersion();

    // Ask for phone number
    let phoneNumber = process.argv[2];
    if (!phoneNumber) {
        phoneNumber = await new Promise(resolve => {
            rl.question("Enter your phone number (exact format, e.g. 919312943581): ", resolve);
        });
    }
    // minimal cleanup to remove + or spaces/dashes
    phoneNumber = phoneNumber.replace(/[^0-9]/g, '');

    console.log(`\nInitializing socket for: ${phoneNumber}`);

    const sock = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })),
        },
        printQRInTerminal: false,
        browser: ['Ubuntu', 'Chrome', '20.0.04'],
        markOnlineOnConnect: false,
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr && !sock.authState.creds.registered) {
            try {
                // Determine if we haven't successfully requested a code yet
                console.log(`\nConnection open. Requesting code for ${phoneNumber}...`);
                await new Promise(resolve => setTimeout(resolve, 3000)); // wait for socket

                const code = await sock.requestPairingCode(phoneNumber);
                console.log("\n============================================");
                console.log(`PAIRING CODE: ${code}`);
                console.log("============================================\n");
                console.log("Enter this code IMMEDIATELY.");
            } catch (err) {
                console.error("Failed to request pairing code:", err);
            }
        }

        if (connection === 'open') {
            console.log("\n✅ WhatsApp Connected Successfully!");
            setTimeout(() => process.exit(0), 1000);
        }

        if (connection === 'close') {
            const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error;
            // console.log(`Connection closed: ${reason}`);
            if (reason === 401) {
                console.log("Session corrupted (401). Retrying...");
                process.exit(1);
            }
        }
    });
}

main();

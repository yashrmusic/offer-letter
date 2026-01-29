
import { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, DisconnectReason } from '@whiskeysockets/baileys';
import pino from 'pino';
import fs from 'fs';
import path from 'path';
import os from 'os';

const HOME = os.homedir();
const AUTH_DIR = path.join(HOME, '.clawdbot', 'credentials', 'whatsapp', 'default');
const PHONE_NUMBER = "919312943581";

async function main() {
    console.log(`\nUsing Auth Directory: ${AUTH_DIR}`);
    fs.mkdirSync(AUTH_DIR, { recursive: true });

    const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
    const { version } = await fetchLatestBaileysVersion();

    console.log(`Initializing for ${PHONE_NUMBER}...`);

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
                console.log(`\nRequesting Pairing Code...`);
                await new Promise(resolve => setTimeout(resolve, 2000)); // Wait a sec for socket stability
                const code = await sock.requestPairingCode(PHONE_NUMBER);
                console.log("\n============================================");
                console.log(`PAIRING CODE: ${code}`);
                console.log("============================================\n");
            } catch (err) {
                console.error("Error requesting code (might need to wait):", err.message);
            }
        }

        if (connection === 'open') {
            console.log("\n✅ WhatsApp Connected Successfully!");
            setTimeout(() => process.exit(0), 2000);
        }

        if (connection === 'close') {
            const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error;
            if (reason === 401 || reason === 'Unauthorized') {
                console.log("Session corrupted. Please delete credentials and retry.");
                process.exit(1);
            }
        }
    });
}
main();

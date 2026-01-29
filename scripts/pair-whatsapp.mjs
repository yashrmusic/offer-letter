
import { createWaSocket } from "clawdbot";
import { resolveDefaultWebAuthDir } from "clawdbot/dist/web/auth-store.js";
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    const authDir = resolveDefaultWebAuthDir();

    // Get phone number from args or prompt
    let phoneNumber = process.argv[2];

    if (!phoneNumber) {
        phoneNumber = await new Promise(resolve => {
            rl.question("Enter your phone number (with country code, e.g., 919876543210): ", resolve);
        });
    }

    // specific cleanup for common formats
    phoneNumber = phoneNumber.replace(/[^0-9]/g, '');

    console.log(`\nConnecting for phone number: ${phoneNumber}`);
    console.log(`Using Auth Dir: ${authDir}`);
    console.log("Initializing socket...");

    const sock = await createWaSocket(false, false, { authDir });

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            try {
                const code = await sock.requestPairingCode(phoneNumber);
                console.log("\n============================================");
                console.log(`PAIRING CODE: ${code}`);
                console.log("============================================\n");
                console.log("Enter this on your phone IMMEDIATELY.");
            } catch (err) {
                console.error("Failed to request pairing code:", err);
            }
        }

        if (connection === 'open') {
            console.log("\n✅ WhatsApp Connected Successfully!");
            process.exit(0);
        }

        if (connection === 'close') {
            const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error;
            console.log(`Connection closed: ${reason}`);
            if (reason === 401) {
                console.log("Session corrupted. Please delete ~/.clawdbot/credentials/whatsapp/default and retry.");
                process.exit(1);
            }
        }
    });
}

main().catch(err => console.error("Main Error:", err));

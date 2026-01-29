---
description: How to use and manage your Clawdbot
---

### 🦞 Clawdbot is Ready!

I've set up Clawdbot for you using **Groq (Llama 3.3 70B)** since your Gemini key was flagged as leaked.

#### 🚀 Quick Start
Run this from your project root:
```bash
./clawd.sh agent --message "summarize my workspace"
```

#### 🛠 Commands
- **Check Status**: `./clawd.sh models status`
- **Restart Gateway**: 
  ```bash
  pkill -f clawdbot
  ./clawd.sh gateway --port 18789 > ~/clawdbot-app/gateway.log 2>&1 &
  ```
- **Login to WhatsApp**: `./clawd.sh channels login --channel whatsapp`

#### 📂 Location
The app is installed at `~/clawdbot-app`.
Config is at `~/.clawdbot/clawdbot.json`.
Workspace is at `~/clawd`.

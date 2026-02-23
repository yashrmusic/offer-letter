#!/bin/bash
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$PROJECT_DIR"
echo "🚀 Starting Offer Letter Automation Server..."
# Kill any existing process on port 5001
lsof -ti:5001 | xargs kill -9 2>/dev/null
# Start server in background
python3 signature_server.py &
# Wait for server to start
sleep 2
# Open Admin Dashboard
open "http://localhost:5001/admin"
echo "✅ Admin Dashboard opened in your browser."
echo "Terminal will stay open to show server logs."
wait

#!/bin/bash

# AMD Pi Calculation System Deployment Script

echo "=== AMD Pi Calculation System Deployment ==="
echo ""

# Git初期化
echo "1. Initializing Git repository..."
git init
git add .
git commit -m "Initial commit: AMD CPU/GPU Pi calculation system with real-time dashboard"

# リモートリポジトリ設定
echo ""
echo "2. Setting up remote repository..."
git remote add origin https://github.com/tstyr/ensyuritu.git

# プッシュ
echo ""
echo "3. Pushing to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "=== Deployment Complete ==="
echo ""
echo "Next steps:"
echo "1. Set up Pusher account: https://pusher.com/"
echo "2. Update remaining API keys (key already set):"
echo "   - local-calculator/local_calculator.js (appId and secret needed)"
echo "   - nextjs-app/lib/pusher-client.ts (key already set: cfLkDVi1qq3tgvhK8_KSu3WFqjL_6BK1NI-IIL8q8KY)"
echo "3. Deploy to Vercel:"
echo "   cd nextjs-app"
echo "   vercel deploy"
echo ""
echo "To start calculation:"
echo "   cd local-calculator && npm start"
echo ""
echo "To run dashboard:"
echo "   cd nextjs-app && npm run dev"
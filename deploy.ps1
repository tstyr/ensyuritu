# AMD Pi Calculation System Deployment Script (PowerShell)

Write-Host "=== AMD Pi Calculation System Deployment ===" -ForegroundColor Cyan
Write-Host ""

# Git初期化
Write-Host "1. Initializing Git repository..." -ForegroundColor Yellow
git init
git add .
git commit -m "Initial commit: AMD CPU/GPU Pi calculation system with real-time dashboard"

# リモートリポジトリ設定
Write-Host ""
Write-Host "2. Setting up remote repository..." -ForegroundColor Yellow
git remote add origin https://github.com/tstyr/ensyuritu.git

# プッシュ
Write-Host ""
Write-Host "3. Pushing to GitHub..." -ForegroundColor Yellow
git branch -M main
git push -u origin main

Write-Host ""
Write-Host "=== Deployment Complete ===" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Set up Pusher account: https://pusher.com/" -ForegroundColor White
Write-Host "2. Update remaining API keys (key already set):" -ForegroundColor White
Write-Host "   - local-calculator/local_calculator.js (appId and secret needed)" -ForegroundColor Gray
Write-Host "   - nextjs-app/lib/pusher-client.ts (key already set: cfLkDVi1qq3tgvhK8_KSu3WFqjL_6BK1NI-IIL8q8KY)" -ForegroundColor Gray
Write-Host "3. Deploy to Vercel:" -ForegroundColor White
Write-Host "   cd nextjs-app" -ForegroundColor Gray
Write-Host "   vercel deploy" -ForegroundColor Gray
Write-Host ""
Write-Host "To start calculation:" -ForegroundColor Cyan
Write-Host "   cd local-calculator ; npm start" -ForegroundColor Gray
Write-Host ""
Write-Host "To run dashboard:" -ForegroundColor Cyan
Write-Host "   cd nextjs-app ; npm run dev" -ForegroundColor Gray
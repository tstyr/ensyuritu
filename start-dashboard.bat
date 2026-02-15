@echo off
echo ========================================
echo   AMD Pi Calculator Dashboard
echo ========================================
echo.
echo Starting Next.js Dashboard...
echo Open browser: http://localhost:3000
echo.

cd nextjs-app
start cmd /k "npm run dev"

echo.
echo Dashboard started!
echo Press any key to exit...
pause > nul
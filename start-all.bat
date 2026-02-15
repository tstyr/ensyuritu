@echo off
echo ========================================
echo   AMD Pi Calculator System
echo ========================================
echo.
echo Starting all services...
echo.

echo [1/2] Starting Next.js Dashboard...
cd nextjs-app
start "Pi Dashboard" cmd /k "npm run dev"
cd ..

timeout /t 3 > nul

echo [2/2] Starting Calculation Engine...
cd local-calculator
start "Pi Calculator" cmd /k "npm start"
cd ..

echo.
echo ========================================
echo   System Started!
echo ========================================
echo.
echo Dashboard: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul
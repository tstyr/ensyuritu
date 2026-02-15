@echo off
echo ========================================
echo   AMD Pi Calculator Engine
echo ========================================
echo.
echo Starting calculation engine...
echo.

cd local-calculator
start cmd /k "npm start"

echo.
echo Calculator started!
echo Press any key to exit...
pause > nul
@echo off
echo ========================================
echo UmangOS Setup
echo Developed by Hansraj
echo ========================================
echo.

echo Installing dependencies...
call npm install

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo IMPORTANT: Before running the app, you need to:
echo 1. Download face-api.js models from:
echo    https://github.com/vladmandic/face-api/tree/master/model
echo.
echo 2. Place all model files in: public/models/
echo.
echo 3. Then run: npm run dev
echo.
echo ========================================
pause

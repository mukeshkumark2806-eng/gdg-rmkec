@echo off
title GDG RMKEC Server
echo ===================================================
echo   GDG RMKEC - Next.js Development Server
echo ===================================================
echo.
echo Keeping this window open runs your local server.
echo Close this window or press Ctrl+C to stop it.
echo.
:: Ensure 64-bit Node.js is prioritized over any 32-bit installation
if exist "%LOCALAPPDATA%\Programs\nodejs-x64\node.exe" (
    set "PATH=%LOCALAPPDATA%\Programs\nodejs-x64;%PATH%"
) else if exist "%ProgramFiles%\nodejs\node.exe" (
    set "PATH=%ProgramFiles%\nodejs;%PATH%"
)

cd /d "%~dp0\.."
npm run dev

pause

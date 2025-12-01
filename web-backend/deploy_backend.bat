@echo off
echo Starting backend deployment...

REM Stop any running backend processes
echo Stopping existing backend processes...
taskkill /f /im python.exe /fi "WINDOWTITLE eq UPG Backend*" 2>nul
taskkill /f /im python.exe /fi "IMAGENAME eq python.exe" 2>nul

REM Wait a moment for processes to stop
timeout /t 2 /nobreak >nul

REM Remove old backend files
echo Removing old backend files...
if exist "web-backend" (
    rmdir /s /q "web-backend"
    echo Old backend directory removed.
)

REM Copy new backend files
echo Copying new backend files...
xcopy /e /i /h /y "new-backend" "web-backend" 2>nul
if errorlevel 1 (
    echo Error: new-backend directory not found!
    echo Please ensure the new backend files are in a 'new-backend' directory.
    pause
    exit /b 1
)

REM Install/update dependencies
echo Installing dependencies...
cd web-backend
pip install -r requirements.txt --upgrade

REM Check if installation was successful
if errorlevel 1 (
    echo Error: Failed to install dependencies!
    cd ..
    pause
    exit /b 1
)

cd ..

echo Backend deployment completed successfully!
echo You can now start the backend with: cd web-backend && python app.py
pause
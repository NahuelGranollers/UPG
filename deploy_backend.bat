@echo off
echo Starting backend deployment to remote server...

REM Configuration
set SERVER_IP=192.168.1.93
set SERVER_USER=nahuel
set LOCAL_BACKEND_DIR=%~dp0web-backend
set REMOTE_BACKEND_DIR=/home/nahuel/web-backend

echo Connecting to server %SERVER_IP% as %SERVER_USER%...

REM Stop the backend service on remote server
echo Stopping remote backend service...
ssh %SERVER_USER%@%SERVER_IP% "sudo systemctl stop web-backend" 2>nul
if errorlevel 1 (
    echo Warning: Could not stop service (might not be running)
)

REM Wait a moment for service to stop
timeout /t 2 /nobreak >nul

REM Remove old backend files from remote server
echo Removing old backend files from remote server...
ssh %SERVER_USER%@%SERVER_IP% "rm -rf %REMOTE_BACKEND_DIR%/*" 2>nul
if errorlevel 1 (
    echo Warning: Could not remove old files (directory might not exist)
)

REM Create remote directory if it doesn't exist
ssh %SERVER_USER%@%SERVER_IP% "mkdir -p %REMOTE_BACKEND_DIR%"

REM Copy new backend files to remote server
echo Uploading new backend files to remote server...
scp -r "%LOCAL_BACKEND_DIR%\*" %SERVER_USER%@%SERVER_IP%:%REMOTE_BACKEND_DIR%/
if errorlevel 1 (
    echo Error: Failed to upload files to remote server!
    pause
    exit /b 1
)

REM Install/update dependencies on remote server
echo Installing dependencies on remote server...
ssh %SERVER_USER%@%SERVER_IP% "cd %REMOTE_BACKEND_DIR% && ./venv/bin/pip install -r requirements.txt --upgrade"
if errorlevel 1 (
    echo Error: Failed to install dependencies on remote server!
    pause
    exit /b 1
)

REM Start the backend service on remote server
echo Starting remote backend service...
ssh %SERVER_USER%@%SERVER_IP% "sudo systemctl start web-backend"
if errorlevel 1 (
    echo Error: Failed to start service on remote server!
    pause
    exit /b 1
)

REM Wait a moment for service to start
timeout /t 3 /nobreak >nul

REM Check service status
echo Checking service status...
ssh %SERVER_USER%@%SERVER_IP% "sudo systemctl status web-backend --no-pager -l"

echo.
echo Backend deployment to remote server completed successfully!
echo The backend should now be running on the remote server.
pause
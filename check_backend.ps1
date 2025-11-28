$remoteHost = "nahuel@192.168.1.93"

Write-Host "=== Verificando estado del servicio web-backend ===" -ForegroundColor Cyan
ssh -t $remoteHost "echo nahuel | sudo -S systemctl status web-backend --no-pager -l"

Write-Host "`n=== Últimos 20 logs del servicio ===" -ForegroundColor Cyan
ssh -t $remoteHost "echo nahuel | sudo -S journalctl -u web-backend --no-pager -n 20"

Write-Host "`n=== Verificando archivos y entorno virtual ===" -ForegroundColor Cyan
ssh -t $remoteHost "ls -la /home/nahuel/web-backend && ls -la /home/nahuel/web-backend/venv/bin/python"

# Script para desplegar el backend al servidor remoto
# Requiere que el usuario ingrese la contraseña 'nahuel' cuando se le solicite.

Write-Host "Desplegando archivos de web-backend a 192.168.1.93..."
scp -r .\web-backend\* nahuel@192.168.1.93:/home/nahuel/web-backed/

if ($LASTEXITCODE -eq 0) {
    Write-Host "Despliegue completado exitosamente." -ForegroundColor Green
} else {
    Write-Host "Error en el despliegue." -ForegroundColor Red
}

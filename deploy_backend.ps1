# Script para desplegar el backend al servidor remoto
# Copia los archivos desde la ruta local especificada al servidor remoto.
# Requiere que el usuario ingrese la contraseña 'nahuel' cuando se le solicite.

$sourcePath = "C:\Users\nahue\Documents\GitHub\UPG\web-backend\*"
$destination = "nahuel@192.168.1.93:/home/nahuel/web-backed/"

Write-Host "Copiando archivos desde $sourcePath a $destination ..."
scp -r $sourcePath $destination

if ($LASTEXITCODE -eq 0) {
    Write-Host "Despliegue completado exitosamente." -ForegroundColor Green
} else {
    Write-Host "Error en el despliegue." -ForegroundColor Red
}

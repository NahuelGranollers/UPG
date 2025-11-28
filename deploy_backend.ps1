# Script para desplegar el backend al servidor remoto
# Copia los archivos desde la ruta local especificada al servidor remoto.
# Requiere que el usuario ingrese la contraseña 'nahuel' cuando se le solicite.

$sourcePath = "C:\Users\nahue\Documents\GitHub\UPG\web-backend\*"
$destination = "nahuel@192.168.1.93:/home/nahuel/web-backed/"

Write-Host "Copiando archivos desde $sourcePath a $destination ..."
scp -r $sourcePath $destination

if ($LASTEXITCODE -eq 0) {
    Write-Host "Archivos copiados. Reiniciando servicio 'web-backend'..."
    # Se usa -t para forzar pseudo-tty si es necesario, y se pasa la contraseña a sudo via stdin
    ssh -t nahuel@192.168.1.93 "echo nahuel | sudo -S systemctl restart web-backend"

    if ($LASTEXITCODE -eq 0) {
        Write-Host "Despliegue y reinicio completados exitosamente." -ForegroundColor Green
    } else {
        Write-Host "Error al reiniciar el servicio." -ForegroundColor Red
    }
} else {
    Write-Host "Error en el despliegue (copia fallida)." -ForegroundColor Red
}

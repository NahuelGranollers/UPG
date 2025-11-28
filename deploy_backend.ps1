# Script para desplegar el backend al servidor remoto
# Copia los archivos desde la ruta local especificada al servidor remoto.
# Requiere que el usuario ingrese la contraseña 'nahuel' cuando se le solicite.

$sourcePath = "C:\Users\nahue\Documents\GitHub\UPG\web-backend\*"
$destination = "nahuel@192.168.1.93:/home/nahuel/web-backend/"

Write-Host "Copiando archivos desde $sourcePath a $destination ..."
scp -r $sourcePath $destination

if ($LASTEXITCODE -eq 0) {
    Write-Host "Archivos copiados. Configurando entorno y reiniciando servicio..."
    
    # Comandos remotos:
    # 1. Crear venv si no existe
    # 2. Instalar dependencias en venv
    # 3. Copiar archivo de servicio actualizado
    # 4. Recargar daemon y reiniciar servicio
    $remoteScript = "
        cd /home/nahuel/web-backend && 
        python3 -m venv venv && 
        ./venv/bin/pip install -r requirements.txt && 
        echo nahuel | sudo -S cp web-backend.service /etc/systemd/system/ && 
        echo nahuel | sudo -S systemctl daemon-reload && 
        echo nahuel | sudo -S systemctl restart web-backend
    "
    
    # Ejecutar todo en una sesión SSH
    ssh -t nahuel@192.168.1.93 $remoteScript

    if ($LASTEXITCODE -eq 0) {
        Write-Host "Despliegue, instalación de dependencias y reinicio completados exitosamente." -ForegroundColor Green
    } else {
        Write-Host "Error en la configuración remota." -ForegroundColor Red
    }
} else {
    Write-Host "Error en el despliegue (copia fallida)." -ForegroundColor Red
}

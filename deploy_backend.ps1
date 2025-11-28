# Script para desplegar el backend al servidor remoto
# Copia los archivos desde la ruta local especificada al servidor remoto.
# Requiere que el usuario ingrese la contraseña 'nahuel' cuando se le solicite.

$sourcePath = "C:\Users\nahue\Documents\GitHub\UPG\web-backend\*"
$destination = "nahuel@192.168.1.93:/home/nahuel/web-backend/"

Write-Host "Copiando archivos desde $sourcePath a $destination ..."
scp -r $sourcePath $destination

if ($LASTEXITCODE -eq 0) {
    Write-Host "Archivos copiados. Configurando entorno y reiniciando servicio..."
    
    # Comandos remotos en una sola línea para evitar problemas de saltos de línea (CRLF vs LF)
    # Se añade la instalación de python3-venv y se asegura que el script de servicio tenga permisos correctos
    # También se borra el venv anterior para asegurar una instalación limpia
    # Se borra la base de datos para forzar la recreación del esquema
    $remoteScript = "cd /home/nahuel/web-backend && echo nahuel | sudo -S apt-get update && echo nahuel | sudo -S apt-get install -y python3-venv python3-full && rm -rf venv instance/database.sqlite && python3 -m venv venv && ./venv/bin/pip install -r requirements.txt && echo nahuel | sudo -S cp web-backend.service /etc/systemd/system/ && echo nahuel | sudo -S chmod 644 /etc/systemd/system/web-backend.service && echo nahuel | sudo -S systemctl daemon-reload && echo nahuel | sudo -S systemctl restart web-backend"
    
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

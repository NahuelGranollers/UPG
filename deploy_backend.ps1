# Script para desplegar el backend al servidor remoto
# Detiene el servicio, elimina archivos antiguos del servidor, copia nuevos archivos,
# instala dependencias y reinicia el servicio.
# Requiere que el usuario ingrese la contraseña 'nahuel' cuando se le solicite.

$localDir = "C:\Users\nahue\Documents\GitHub\UPG\web-backend"
$destination = "nahuel@192.168.1.93:/home/nahuel/web-backend/"

Write-Host "Deteniendo servicio en el servidor remoto..."
ssh -t nahuel@192.168.1.93 "echo nahuel | sudo -S systemctl stop web-backend"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Eliminando archivos antiguos del servidor remoto..."
    ssh -t nahuel@192.168.1.93 "cd /home/nahuel && rm -rf web-backend/*"

    if ($LASTEXITCODE -eq 0) {
        # Seleccionar archivos y carpetas a copiar, EXCLUYENDO venv y otros innecesarios
        # Esto evita el error "Permission denied" al intentar sobrescribir el python del servidor con el de Windows
        $itemsToCopy = Get-ChildItem -Path $localDir | Where-Object {
            $_.Name -notin @("venv", "__pycache__", "instance", "logs", ".vscode", "database.sqlite", ".git")
        } | Select-Object -ExpandProperty FullName

        Write-Host "Copiando archivos al servidor..."
        # Ejecutar scp con la lista de archivos
        & scp -r $itemsToCopy $destination

        if ($LASTEXITCODE -eq 0) {
            Write-Host "Archivos copiados. Configurando entorno y reiniciando servicio..."

            # Comandos remotos en una sola línea
            # 1. Instalar dependencias de sistema (incluyendo herramientas de compilación para psutil)
            # 2. Recrear venv (limpio)
            # 3. Instalar requirements
            # 4. Configurar servicio y reiniciar
            # NOTA: Usamos ';' después de apt-get update para que continúe aunque falle algún repo (como cloudflare i386)
            $remoteScript = "cd /home/nahuel/web-backend && echo nahuel | sudo -S apt-get update; echo nahuel | sudo -S apt-get install -y python3-venv python3-full python3-dev build-essential && rm -rf venv && python3 -m venv venv && ./venv/bin/pip install -r requirements.txt && echo nahuel | sudo -S cp web-backend.service /etc/systemd/system/ && echo nahuel | sudo -S chmod 644 /etc/systemd/system/web-backend.service && echo nahuel | sudo -S systemctl daemon-reload && echo nahuel | sudo -S systemctl restart web-backend"

            # Ejecutar todo en una sesión SSH
            ssh -t nahuel@192.168.1.93 $remoteScript

            if ($LASTEXITCODE -eq 0) {
                Write-Host "Despliegue completado exitosamente." -ForegroundColor Green
            } else {
                Write-Host "Error en la configuración remota." -ForegroundColor Red
            }
        } else {
            Write-Host "Error en el despliegue (copia fallida)." -ForegroundColor Red
        }
    } else {
        Write-Host "Error eliminando archivos antiguos del servidor." -ForegroundColor Red
    }
} else {
    Write-Host "Error deteniendo el servicio remoto." -ForegroundColor Red
}

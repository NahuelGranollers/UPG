# Script para desplegar el frontend SSR al servidor remoto
# Copia los archivos de build y el servidor Node.js
# Requiere que el usuario ingrese la contraseña 'nahuel' cuando se le solicite.

$localDir = "C:\Users\nahue\Documents\GitHub\UPG"
$destination = "nahuel@192.168.1.93:/home/nahuel/web-frontend/"
$keyPath = "$env:USERPROFILE\.ssh\id_ed25519"

Write-Host "Construyendo la aplicación (SSR)..."
npm run build:ssr

if ($LASTEXITCODE -eq 0) {
    Write-Host "Deteniendo servicio frontend en el servidor remoto..."
    # Intentamos detener sin contraseña primero (si sudoers está configurado), si falla, usamos el método antiguo
    ssh -i $keyPath -o StrictHostKeyChecking=no -t nahuel@192.168.1.93 "sudo systemctl stop web-frontend || echo nahuel | sudo -S systemctl stop web-frontend"

    Write-Host "Creando directorio remoto si no existe..."
    ssh -i $keyPath -o StrictHostKeyChecking=no -t nahuel@192.168.1.93 "mkdir -p /home/nahuel/web-frontend"

    Write-Host "Copiando archivos al servidor..."
    # Copiar dist, server.js, package.json
    scp -i $keyPath -o StrictHostKeyChecking=no -r "$localDir\dist" "$destination"
    scp -i $keyPath -o StrictHostKeyChecking=no "$localDir\server.js" "$destination"
    scp -i $keyPath -o StrictHostKeyChecking=no "$localDir\package.json" "$destination"

    if ($LASTEXITCODE -eq 0) {
        Write-Host "Archivos copiados. Instalando dependencias y reiniciando servicio..."

        # Comandos remotos
        $remoteCommands = "cd /home/nahuel/web-frontend && npm install --production && (sudo systemctl start web-frontend || echo nahuel | sudo -S systemctl start web-frontend)"
        ssh -i $keyPath -o StrictHostKeyChecking=no -t nahuel@192.168.1.93 $remoteCommands

        Write-Host "¡Despliegue del Frontend SSR completado!"
    } else {
        Write-Host "Error al copiar archivos." -ForegroundColor Red
    }
} else {
    Write-Host "Error en el build." -ForegroundColor Red
}

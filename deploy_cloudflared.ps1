$ServerIP = "192.168.1.93"
$User = "nahuel"
$IdentityFile = "$HOME\.ssh\id_rsa"

Write-Host "Actualizando configuración de Cloudflare Tunnel en $ServerIP..."

# 1. Copiar nueva configuración
Write-Host "Copiando archivo de configuración..."
scp -i $IdentityFile .\cloudflared_config.yml "${User}@${ServerIP}:/home/nahuel/.cloudflared/config.yml"

# 2. Reiniciar el túnel
Write-Host "Reiniciando Cloudflare Tunnel..."
# Intentamos reiniciar el servicio systemd si existe, o matar el proceso para que se reinicie (si tiene autorestart)
# O simplemente avisar al usuario.
# Asumiremos que está instalado como servicio 'cloudflared' o 'cloudflared-update'
$commands = @(
    "sudo systemctl restart cloudflared || echo 'No se pudo reiniciar el servicio systemd. Intentando matar el proceso...'",
    "pkill -HUP -f 'cloudflared tunnel run' || echo 'No se encontró proceso para recargar'"
)
$commandString = $commands -join " ; "

ssh -t -i $IdentityFile $User@$ServerIP $commandString

Write-Host "¡Configuración de Cloudflare actualizada!"
Write-Host "Verifica que el túnel esté activo en https://one.dash.cloudflare.com/"

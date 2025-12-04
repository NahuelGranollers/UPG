$ServerIP = "192.168.1.93"
$User = "nahuel"
$IdentityFile = "$HOME\.ssh\id_rsa"

Write-Host "Configurando nuevo túnel 'production' en $ServerIP..."

# 1. Copiar nueva configuración
Write-Host "Copiando archivo de configuración..."
scp -i $IdentityFile .\cloudflared_config_production.yml "${User}@${ServerIP}:/home/nahuel/.cloudflared/config.yml"

# 2. Actualizar servicio systemd
Write-Host "Actualizando servicio systemd..."
$serviceContent = @"
[Unit]
Description=Cloudflare Tunnel (Production)
After=network.target

[Service]
Type=simple
User=nahuel
# Usamos 'tunnel run' sin argumentos para que lea el config.yml por defecto
ExecStart=/usr/local/bin/cloudflared tunnel run
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
"@

# Guardar contenido del servicio en un archivo temporal local para copiarlo
$serviceContent | Out-File -Encoding ASCII .\cloudflared.service.temp

scp -i $IdentityFile .\cloudflared.service.temp "${User}@${ServerIP}:/tmp/cloudflared.service"
Remove-Item .\cloudflared.service.temp

# 3. Aplicar cambios y reiniciar
Write-Host "Reiniciando servicio..."
$commands = @(
    "sudo mv /tmp/cloudflared.service /etc/systemd/system/cloudflared.service",
    "sudo systemctl daemon-reload",
    "sudo systemctl restart cloudflared",
    "sudo systemctl status cloudflared --no-pager"
)
$commandString = $commands -join " && "

ssh -t -i $IdentityFile $User@$ServerIP $commandString

Write-Host "¡Nuevo túnel desplegado y activo!"

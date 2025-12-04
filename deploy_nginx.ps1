$ServerIP = "192.168.1.93"
$User = "nahuel"
$IdentityFile = "$HOME\.ssh\id_rsa"

Write-Host "Configurando Nginx en $ServerIP..."

# 1. Instalar Nginx si no existe
Write-Host "Instalando Nginx..."
ssh -t -i $IdentityFile $User@$ServerIP "sudo apt-get update && sudo apt-get install -y nginx"

# 2. Copiar archivo de configuración
Write-Host "Copiando configuración..."
scp -i $IdentityFile .\nginx.conf "${User}@${ServerIP}:/tmp/upg.conf"

# 3. Aplicar configuración
Write-Host "Aplicando configuración..."
$commands = @(
    "sudo mv /tmp/upg.conf /etc/nginx/sites-available/upg",
    "sudo ln -sf /etc/nginx/sites-available/upg /etc/nginx/sites-enabled/",
    "sudo rm -f /etc/nginx/sites-enabled/default",
    "sudo nginx -t",
    "sudo systemctl reload nginx"
)
$commandString = $commands -join " && "

ssh -t -i $IdentityFile $User@$ServerIP $commandString

Write-Host "¡Nginx configurado correctamente!"
Write-Host "Ahora apunta tu dominio (DNS A Record) a tu IP PÚBLICA."
Write-Host "Y configura el Port Forwarding en tu router: Puerto 80 -> 192.168.1.93:80"

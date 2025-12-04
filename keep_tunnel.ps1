# Script para mantener un túnel SSH activo (Reconexión automática)
# Uso: .\keep_tunnel.ps1

# --- CONFIGURACIÓN ---
$REMOTE_USER = "nahuel"
$REMOTE_HOST = "192.168.1.93"
# Ejemplo de túnel: Exponer el puerto 5000 del servidor remoto en mi puerto 5000 local
# -L local_port:remote_host:remote_port (Traer puerto remoto a local)
# -R remote_port:local_host:local_port (Llevar puerto local a remoto)
$TUNNEL_ARGS = "-L 5000:localhost:5000" 

# --- SCRIPT ---
while ($true) {
    Write-Host "🔌 Conectando túnel SSH a $REMOTE_HOST..." -ForegroundColor Cyan
    
    # -N: No abrir terminal remota (solo forwarding)
    # -o ServerAliveInterval=60: Enviar ping cada 60s para evitar desconexión por inactividad
    # -o ExitOnForwardFailure=yes: Salir si el puerto está ocupado o falla
    ssh -N $TUNNEL_ARGS $REMOTE_USER@$REMOTE_HOST -o ServerAliveInterval=60 -o ServerAliveCountMax=3 -o ExitOnForwardFailure=yes

    Write-Host "⚠️ La conexión SSH se ha caído." -ForegroundColor Yellow
    Write-Host "🔄 Reconectando en 5 segundos..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5
}

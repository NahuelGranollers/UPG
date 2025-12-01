# 🚀 Guía Completa de Despliegue y Mantenimiento del Backend

## 📋 Información General

Esta guía contiene **TODOS** los pasos necesarios para mantener el backend funcionando correctamente. Sigue esta guía al pie de la letra para evitar problemas de conexión.

**Fecha de última actualización:** Diciembre 1, 2025
**Versión actual:** v1.0.0

## 🏗 Arquitectura del Sistema

- **Frontend:** React + TypeScript + Vite (GitHub Pages)
- **Backend:** Python Flask + Socket.IO (Servidor remoto Ubuntu/Debian)
- **Base de datos:** SQLite
- **Servidor:** Ubuntu/Debian con systemd
- **Conexión:** SSH + tunneling (cloudflared)

---

## 📁 Estructura de Archivos Crítica

### Backend (web-backend/)
```
web-backend/
├── app.py                 # 🚨 ARCHIVO PRINCIPAL - NO MODIFICAR
├── config.py             # 🚨 CONFIGURACIÓN - NO MODIFICAR
├── requirements.txt      # 🚨 DEPENDENCIAS - NO MODIFICAR
├── web-backend.service   # 🚨 SERVICIO SYSTEMD - NO MODIFICAR
├── models.py            # Modelos de base de datos
├── socket_events.py     # Eventos de Socket.IO
├── routes/              # Endpoints de API
└── instance/            # Base de datos (NO subir a git)
```

### Archivos de Despliegue
```
deploy_backend.ps1       # 🚨 SCRIPT DE DESPLIEGUE - NO MODIFICAR
check_backend.ps1        # Script de verificación
```

---

## ⚙ Configuración Inicial del Servidor

### 1. Preparar el Servidor Ubuntu/Debian

```bash
# Actualizar el sistema
sudo apt update && sudo apt upgrade -y

# Instalar dependencias del sistema
sudo apt install -y python3 python3-pip python3-venv python3-dev build-essential git

# Instalar herramientas de red
sudo apt install -y openssh-server curl wget

# Crear usuario para el backend
sudo useradd -m -s /bin/bash nahuel
sudo usermod -aG sudo nahuel
sudo passwd nahuel  # Establecer contraseña: 'nahuel'

# Configurar SSH
sudo systemctl enable ssh
sudo systemctl start ssh
```

### 2. Configurar Variables de Entorno

Crear archivo `/home/nahuel/.env` en el servidor:

```bash
# Crear directorio y archivo de configuración
mkdir -p /home/nahuel
touch /home/nahuel/.env

# Contenido del archivo .env (COMPLETAR con valores reales)
cat > /home/nahuel/.env << 'EOF'
# Discord OAuth2
DISCORD_CLIENT_ID=1432386430855938189
DISCORD_CLIENT_SECRET=TU_CLIENT_SECRET_AQUI
DISCORD_REDIRECT_URI=https://unaspartidillas.online/api/auth/discord/callback
FRONTEND_URL=https://unaspartidillas.online

# Seguridad
SECRET_KEY=tu-super-secret-key-muy-larga-y-segura-aqui-123456789

# AI (Opcional)
GEMINI_API_KEY=tu-gemini-api-key-aqui
EOF

# Asegurar permisos
chmod 600 /home/nahuel/.env
chown nahuel:nahuel /home/nahuel/.env
```

---

## 🚀 Despliegue del Backend

### Método Automático (RECOMENDADO)

1. **Desde PowerShell en Windows:**
```powershell
# Navegar al directorio del proyecto
cd "C:\Users\nahue\Documents\GitHub\UPG"

# Ejecutar el script de despliegue
.\deploy_backend.ps1
```

2. **Verificar que funciona:**
```powershell
.\check_backend.ps1
```

### Método Manual (Solo si el automático falla)

```bash
# 1. Copiar archivos al servidor (desde Windows)
scp -r C:\Users\nahue\Documents\GitHub\UPG\web-backend\* nahuel@192.168.1.93:/home/nahuel/web-backend/

# 2. Conectar al servidor
ssh nahuel@192.168.1.93

# 3. Instalar dependencias del sistema
sudo apt update
sudo apt install -y python3-venv python3-full python3-dev build-essential

# 4. Configurar entorno virtual
cd /home/nahuel/web-backend
rm -rf venv
python3 -m venv venv
./venv/bin/pip install -r requirements.txt

# 5. Configurar y iniciar servicio
sudo cp web-backend.service /etc/systemd/system/
sudo chmod 644 /etc/systemd/system/web-backend.service
sudo systemctl daemon-reload
sudo systemctl enable web-backend
sudo systemctl start web-backend

# 6. Verificar estado
sudo systemctl status web-backend
```

---

## 🔧 Mantenimiento y Monitoreo

### Verificar Estado del Servicio

```bash
# Desde Windows PowerShell
.\check_backend.ps1

# O manualmente desde SSH
ssh nahuel@192.168.1.93
sudo systemctl status web-backend --no-pager -l
sudo journalctl -u web-backend --no-pager -n 20
```

### Reiniciar Servicio

```bash
# Desde SSH
sudo systemctl restart web-backend

# O desde Windows
ssh nahuel@192.168.1.93 "sudo systemctl restart web-backend"
```

### Ver Logs en Tiempo Real

```bash
# Desde SSH
sudo journalctl -u web-backend -f

# Últimos 50 logs
sudo journalctl -u web-backend -n 50 --no-pager
```

### Verificar Conexión de Red

```bash
# Verificar que el puerto 5000 esté abierto
sudo netstat -tlnp | grep :5000

# Verificar conectividad
curl http://localhost:5000/api/health  # Si tienes endpoint de health
```

---

## 🌐 Configuración de Tunneling (Cloudflared)

### 1. Instalar Cloudflared

```bash
# En el servidor
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb
```

### 2. Autenticar con Cloudflare

```bash
# Login (requiere navegador)
cloudflared tunnel login

# Crear tunnel
cloudflared tunnel create unaspartidillas-tunnel

# Configurar DNS
cloudflared tunnel route dns unaspartidillas-tunnel api.unaspartidillas.online
```

### 3. Crear Archivo de Configuración

Crear `/home/nahuel/.cloudflared/config.yaml`:

```yaml
tunnel: unaspartidillas-tunnel
credentials-file: /home/nahuel/.cloudflared/unaspartidillas-tunnel.json

ingress:
  - hostname: api.unaspartidillas.online
    service: http://localhost:5000
  - hostname: unaspartidillas.online
    service: https://unaspartidillas.online
  - service: http_status:404
```

### 4. Ejecutar Tunnel

```bash
# Como servicio systemd
sudo cloudflared service install
sudo systemctl enable cloudflared
sudo systemctl start cloudflared

# O manualmente para testing
cloudflared tunnel run unaspartidillas-tunnel
```

---

## 🔒 Configuración de Seguridad

### Firewall (UFW)

```bash
# Configurar firewall básico
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw --force enable

# Verificar estado
sudo ufw status
```

### SSL/TLS (Let's Encrypt)

```bash
# Instalar certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtener certificado (si usas nginx)
sudo certbot --nginx -d unaspartidillas.online -d api.unaspartidillas.online
```

### Backup de Base de Datos

```bash
# Script de backup automático
crontab -e

# Agregar línea para backup diario a las 2 AM
0 2 * * * cp /home/nahuel/web-backend/database.sqlite /home/nahuel/backups/database_$(date +\%Y\%m\%d).sqlite
```

---

## 🐛 Solución de Problemas

### Problema: Servicio no inicia

```bash
# Ver logs detallados
sudo journalctl -u web-backend --no-pager -n 50

# Verificar archivos
ls -la /home/nahuel/web-backend/
ls -la /home/nahuel/web-backend/venv/bin/

# Verificar permisos
sudo chown -R nahuel:nahuel /home/nahuel/web-backend/
```

### Problema: Error de conexión Socket.IO

```bash
# Verificar puerto
sudo netstat -tlnp | grep :5000

# Verificar CORS
curl -H "Origin: https://unaspartidillas.online" http://localhost:5000/socket.io/

# Verificar configuración
cat /home/nahuel/web-backend/config.py
```

### Problema: Base de datos corrupta

```bash
# Backup actual
cp /home/nahuel/web-backend/database.sqlite /home/nahuel/database.sqlite.backup

# Recrear desde cero
cd /home/nahuel/web-backend
rm database.sqlite
python3 -c "from app import app, db; app.app_context().push(); db.create_all()"
```

### Problema: Cloudflared no conecta

```bash
# Verificar estado del tunnel
cloudflared tunnel list

# Reiniciar servicio
sudo systemctl restart cloudflared

# Ver logs
sudo journalctl -u cloudflared --no-pager -n 20
```

---

## 📊 Monitoreo Continuo

### Health Check Script

Crear `/home/nahuel/health_check.sh`:

```bash
#!/bin/bash
# Verificar que el servicio esté corriendo
if ! systemctl is-active --quiet web-backend; then
    echo "$(date): Servicio web-backend caído, reiniciando..."
    systemctl restart web-backend
fi

# Verificar conectividad
if ! curl -f http://localhost:5000 > /dev/null 2>&1; then
    echo "$(date): Backend no responde, reiniciando..."
    systemctl restart web-backend
fi
```

### Configurar Cron para Monitoreo

```bash
# Ejecutar health check cada 5 minutos
crontab -e
*/5 * * * * /home/nahuel/health_check.sh >> /home/nahuel/health_check.log 2>&1
```

---

## 🔄 Actualizaciones y Mantenimiento

### Actualizar Backend

```powershell
# Desde Windows PowerShell
cd "C:\Users\nahue\Documents\GitHub\UPG"
git pull origin main
.\deploy_backend.ps1
```

### Actualizar Dependencias

```bash
# En el servidor
cd /home/nahuel/web-backend
./venv/bin/pip install --upgrade -r requirements.txt
sudo systemctl restart web-backend
```

### Actualizar Sistema

```bash
# Mensual
sudo apt update && sudo apt upgrade -y
sudo reboot  # Si es necesario
```

---

## 📞 Contactos de Emergencia

- **Desarrollador:** Nahuel Granollers
- **Servidor:** 192.168.1.93 (IP local)
- **Dominio:** unaspartidillas.online
- **API:** api.unaspartidillas.online

---

## ⚠️ Lista de NO HACER

❌ **NO modificar** `app.py` sin backup completo
❌ **NO cambiar** configuración de CORS en `config.py`
❌ **NO eliminar** el entorno virtual `venv`
❌ **NO modificar** `web-backend.service` sin entender systemd
❌ **NO ejecutar** `pip install` globalmente (siempre usar venv)
❌ **NO cambiar** puertos sin actualizar configuración completa
❌ **NO olvidar** hacer backup antes de cambios críticos

---

## ✅ Checklist de Verificación Post-Despliegue

- [ ] Servicio systemd activo: `sudo systemctl status web-backend`
- [ ] Puerto 5000 abierto: `sudo netstat -tlnp | grep :5000`
- [ ] Logs limpios: `sudo journalctl -u web-backend --no-pager -n 10`
- [ ] Base de datos existe: `ls -la /home/nahuel/web-backend/database.sqlite`
- [ ] Conexión externa funciona: `curl https://api.unaspartidillas.online`
- [ ] Socket.IO responde: Verificar en navegador
- [ ] Frontend se conecta: Probar login y funcionalidades

---

**🚨 IMPORTANTE:** Si algo deja de funcionar, **NO intentes arreglarlo sin esta guía**. Primero revisa los logs, luego sigue los pasos de solución de problemas en orden. Si todo falla, contacta al desarrollador con los logs completos.</content>
<parameter name="filePath">c:\Users\nahue\Documents\GitHub\UPG\BACKEND_DEPLOYMENT_GUIDE.md
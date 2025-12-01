# Guía de Conexión Externa y Solución de Errores

## 1. Diagnóstico Actual
- **Backend:** El servidor en `192.168.1.93` está **FUNCIONANDO CORRECTAMENTE**. Los logs muestran que arranca y acepta conexiones.
- **Frontend:** La web `unaspartidillas.online` está intentando conectar a `wss://api.unaspartidillas.online`.
- **Error:** `ERR_CONNECTION_TIMED_OUT` y `WebSocket connection failed`.

## 2. El Problema: "Mixed Content" y Puertos
Tienes dos problemas bloqueando la conexión:

1.  **HTTPS vs HTTP:** Tu web (`unaspartidillas.online`) es segura (**HTTPS**). Tu servidor local (`192.168.1.93:5000`) es inseguro (**HTTP**). Los navegadores **BLOQUEAN** que una web segura se conecte a un servidor inseguro.
2.  **Puertos Cerrados:** La dirección `api.unaspartidillas.online` probablemente apunta a tu IP pública, pero el puerto 5000 no está abierto en tu router, o tu router no permite conectarse a sí mismo desde dentro (NAT Loopback).

---

## 3. Solución Rápida (Para jugar en LAN AHORA)
Si solo quieres jugar con gente en tu casa (mismo WiFi):

1.  En tu PC (donde tienes el código), ejecuta:
    ```powershell
    npm run dev -- --host
    ```
2.  Mira la IP que te da (ej. `http://192.168.1.93:5173`).
3.  Entra desde tu móvil u otro PC a esa dirección **EXACTA** (con `http`, no `https`).
4.  Al ser HTTP, el navegador permitirá la conexión al backend (que también es HTTP).

---

## 4. Solución Definitiva (Para jugar desde Internet)
Para que funcione `unaspartidillas.online` desde cualquier lugar, necesitas ponerle **HTTPS** a tu servidor local. La forma más fácil es usar **Cloudflare Tunnel** (gratis y seguro).

### Opción A: Cloudflare Tunnel (Recomendada)
Esto expone tu servidor local a internet con HTTPS sin abrir puertos.

1.  Crea una cuenta en [Cloudflare](https://dash.cloudflare.com/).
2.  Añade tu dominio `unaspartidillas.online` a Cloudflare (tendrás que cambiar los DNS en tu registrador).
3.  Ve a **Zero Trust > Access > Tunnels**.
4.  Crea un túnel nuevo, elige "Debian" y copia el comando de instalación.
5.  Ejecuta ese comando en tu servidor Linux (`ssh nahuel@192.168.1.93 "comando..."`).
6.  En el panel de Cloudflare, configura el "Public Hostname":
    - **Subdomain:** `api`
    - **Domain:** `unaspartidillas.online`
    - **Service:** `http://localhost:5000`
7.  ¡Listo! Ahora `https://api.unaspartidillas.online` conectará seguro a tu servidor local.

### Opción B: Abrir Puertos + Caddy (Avanzado)
Si no quieres usar Cloudflare:

1.  **Router:** Abre el puerto **80** y **443** (TCP) y redirígelos a `192.168.1.93`.
2.  **DNS:** Asegúrate que `api.unaspartidillas.online` apunta a tu IP Pública.
3.  **Servidor:** Instala Caddy en Linux:
    ```bash
    sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
    curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
    sudo apt update
    sudo apt install caddy
    ```
4.  Configura Caddy (`/etc/caddy/Caddyfile`):
    ```
    api.unaspartidillas.online {
        reverse_proxy localhost:5000
    }
    ```
5.  Reinicia Caddy: `sudo systemctl restart caddy`.

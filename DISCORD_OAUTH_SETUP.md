# 🔐 Discord OAuth2 - Guía de Configuración (Authorization Code Flow)

## 📋 Resumen

Este proyecto usa **Discord OAuth2 Authorization Code Flow** para autenticación segura. El Client Secret está protegido en el backend y nunca se expone al navegador.

## 🚀 Configuración en Discord Developer Portal

1. Ve a [Discord Developer Portal](https://discord.com/developers/applications)
2. Selecciona tu aplicación (ID: `1432386430855938189`)
3. Ve a **OAuth2** → **General**
4. En **Redirects**, agrega estas URLs:
   ```
   https://unaspartidillas.online/auth/callback
   http://localhost:3000/auth/callback
   ```
5. En **OAuth2 URL Generator**:
   - Scopes: `identify`
   - Redirect URL: `https://unaspartidillas.online/auth/callback`

## 📁 Archivos de Configuración

### `.env` (Frontend - Público)
```env
VITE_DISCORD_CLIENT_ID=1432386430855938189
VITE_API_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
```

### `.env.server` (Backend - **NUNCA COMMITEAR**)
```env
DISCORD_CLIENT_ID=1432386430855938189
DISCORD_CLIENT_SECRET=uPLiqGZfG898lDrt1vTqtovni2iEv_Hq
DISCORD_REDIRECT_URI=https://unaspartidillas.online/auth/callback
SESSION_SECRET=random-secret-change-this-in-production
NODE_ENV=production
```

⚠️ **IMPORTANTE**: El archivo `.env.server` está en `.gitignore` y contiene credenciales sensibles.

## 🔄 Flujo de Autenticación

```
Usuario → Frontend: Click "Iniciar sesión"
Frontend → Backend: Redirect a /auth/discord
Backend → Discord: Redirect a OAuth authorize
Usuario → Discord: Autoriza la app
Discord → Backend: Redirect a /auth/callback?code=xxx
Backend → Discord: POST /token (intercambia code)
Discord → Backend: Devuelve access_token
Backend → Discord: GET /users/@me (con token)
Discord → Backend: Datos del usuario
Backend: Guarda en sesión
Backend → Frontend: Redirect a /?auth=success
Frontend → Backend: GET /auth/user (verifica sesión)
Backend → Frontend: Datos del usuario
Frontend: Crea User con avatar de Discord
```

## 🛠️ Instalación Local

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
Crea los archivos `.env` y `.env.server` con las credenciales correctas.

### 3. Iniciar el servidor
```bash
node server-updated.js
```

El servidor iniciará en `http://localhost:3000`

### 4. Iniciar el frontend (en otra terminal)
```bash
npm run dev
```

El frontend estará en `http://localhost:5173`

## 🌐 Despliegue en Producción

### Backend (Render/Railway/VPS)
1. Sube el código sin `.env.server`
2. Configura las variables de entorno en el panel de tu host:
   - `DISCORD_CLIENT_ID`
   - `DISCORD_CLIENT_SECRET`
   - `DISCORD_REDIRECT_URI=https://unaspartidillas.online/auth/callback`
   - `SESSION_SECRET` (genera uno random seguro)
   - `NODE_ENV=production`

3. El servidor debe estar en HTTPS en producción para las cookies seguras

### Frontend
1. Actualiza `VITE_API_URL` en `.env` con tu URL de backend en producción:
   ```env
   VITE_API_URL=https://tu-backend.com
   ```

2. Build y deploy:
   ```bash
   npm run build
   ```

## 📡 Endpoints del Backend

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/auth/discord` | Inicia el flujo OAuth, redirige a Discord |
| `GET` | `/auth/callback` | Recibe el code y lo intercambia por token |
| `GET` | `/auth/user` | Obtiene el usuario autenticado actual |
| `POST` | `/auth/logout` | Cierra sesión y destruye la cookie |

## 🧪 Pruebas

### Desarrollo Local
1. Configura redirect URI en Discord: `http://localhost:3000/auth/callback`
2. Actualiza `.env.server`:
   ```env
   DISCORD_REDIRECT_URI=http://localhost:3000/auth/callback
   ```
3. Prueba el flujo completo

### Producción
1. Configura redirect URI en Discord: `https://unaspartidillas.online/auth/callback`
2. Verifica que las cookies funcionan con HTTPS
3. Prueba login/logout

## 🔒 Seguridad

✅ **Implementado:**
- Client Secret solo en backend
- Authorization Code Flow (no Implicit Grant)
- Sesiones con httpOnly cookies
- CORS configurado correctamente
- `.env.server` en `.gitignore`

⚠️ **Recomendaciones adicionales:**
- Usa HTTPS en producción (obligatorio)
- Genera un `SESSION_SECRET` fuerte y único
- Implementa refresh tokens si necesitas sesiones de larga duración
- Agrega validación de estado (CSRF protection) con `state` parameter

## 📞 Soporte

Si tienes problemas:
1. Verifica que las redirect URIs coincidan exactamente
2. Revisa los logs del servidor para errores de Discord API
3. Asegúrate de que las cookies funcionan (requiere HTTPS en prod)
4. Verifica que `credentials: 'include'` esté en todas las llamadas fetch

## 🔄 Migración desde Simple Auth

El código antiguo de `LockScreen` y `UserSetup` ya no se usa. Ahora:
- Los usuarios solo pueden loguearse con Discord
- El avatar y username vienen de Discord
- El ID de usuario es el Discord ID (único y persistente)

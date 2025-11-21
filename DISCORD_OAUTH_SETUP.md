# Configuración de Discord OAuth2

## Paso 1: Crear una aplicación en Discord

1. Ve a [Discord Developer Portal](https://discord.com/developers/applications)
2. Haz clic en **"New Application"**
3. Dale un nombre a tu aplicación (ej: "UPG Community")
4. Acepta los términos y crea la aplicación

## Paso 2: Configurar OAuth2

1. En el menú lateral, ve a **"OAuth2"**
2. Copia el **Client ID** (lo necesitarás para el `.env`)
3. En **"Redirects"**, haz clic en **"Add Redirect"** y agrega:
   - Para desarrollo: `http://localhost:5173/auth/callback`
   - Para producción: `https://tudominio.com/auth/callback`
4. Guarda los cambios

## Paso 3: Configurar variables de entorno

1. Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edita el archivo `.env` y reemplaza:
   ```env
   VITE_DISCORD_CLIENT_ID=tu_client_id_copiado
   VITE_DISCORD_REDIRECT_URI=http://localhost:5173/auth/callback
   ```

## Paso 4: Ejecutar la aplicación

```bash
npm install
npm run dev
```

## Notas importantes

- **No necesitas el Client Secret** para el flujo OAuth2 implicit grant
- Los avatares se cargan directamente desde Discord CDN, no se almacenan localmente
- El nombre de usuario se toma de Discord (global_name o username)
- Los datos del usuario se guardan en localStorage y cookies para persistencia

## Permisos de OAuth2

La aplicación solo solicita el scope `identify`, que permite:
- Leer nombre de usuario
- Leer avatar del usuario
- Leer ID del usuario

No se solicitan permisos adicionales como leer mensajes, acceder a servidores, etc.

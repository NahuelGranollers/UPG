<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# UPG Community Hub

Aplicación de chat estilo Discord para la comunidad UPG (United Player Group).

## 🚀 Desarrollo Local

**Prerrequisitos:** Node.js 20 o superior

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Configurar las variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto
   - Agrega las siguientes variables:
   ```env
   # Gemini API Key (para el bot)
   GEMINI_API_KEY=tu_api_key_aqui
   
   # Discord Bot Token (opcional - solo si quieres obtener información automática)
   # Si no lo configuras, puedes editar config/discordUsers.ts con los nombres manualmente
   VITE_DISCORD_BOT_TOKEN=tu_discord_bot_token
   
   # Firebase Configuration (para chat en tiempo real - opcional)
   VITE_FIREBASE_API_KEY=tu_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
   VITE_FIREBASE_DATABASE_URL=https://tu_proyecto-default-rtdb.firebaseio.com
   VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
   VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
   VITE_FIREBASE_APP_ID=tu_app_id
   ```
   
   **Notas:**
   - Si no configuras Firebase, la app funcionará en modo local (solo sincronización entre pestañas del mismo navegador).
   - Si no configuras el Discord Bot Token, se usarán avatares por defecto de Discord.

3. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```

4. Abrir en el navegador: `http://localhost:3000`

## 📦 Build para Producción

```bash
npm run build
```

El build se generará en la carpeta `dist/`.

## 🌐 Despliegue en GitHub Pages

1. **Configurar GitHub Pages:**
   - Ve a Settings > Pages en tu repositorio
   - Selecciona la rama `main` (o `gh-pages` si prefieres)
   - Selecciona la carpeta `/ (root)` o `/docs` si usas docs
   - Si usas dominio personalizado, configura el CNAME

2. **Configurar el base path (si es necesario):**
   - Si tu repositorio NO está en la raíz de GitHub Pages, edita `vite.config.ts`
   - Cambia `base: '/'` a `base: '/nombre-repo/'`

3. **Build y deploy:**
   ```bash
   npm run build
   ```
   
   Luego:
   - Si usas GitHub Actions: configura un workflow para hacer build automático
   - Si usas manual: copia el contenido de `dist/` a la rama `gh-pages` o carpeta `docs/`

4. **Variables de entorno en GitHub Pages:**
   - GitHub Pages no soporta variables de entorno del lado del servidor
   - Para las API Keys, necesitarás usar GitHub Secrets si usas Actions
   - Configura los siguientes secrets en GitHub:
     - `GEMINI_API_KEY` - Para el bot de Gemini
     - `VITE_FIREBASE_API_KEY` - Para Firebase
     - `VITE_FIREBASE_AUTH_DOMAIN` - Para Firebase
     - `VITE_FIREBASE_DATABASE_URL` - Para Firebase
     - `VITE_FIREBASE_PROJECT_ID` - Para Firebase
     - `VITE_FIREBASE_STORAGE_BUCKET` - Para Firebase
     - `VITE_FIREBASE_MESSAGING_SENDER_ID` - Para Firebase
     - `VITE_FIREBASE_APP_ID` - Para Firebase

## 📝 Notas

- **Chat en tiempo real:** 
  - **Socket.IO** (prioridad): Se conecta automáticamente a `https://unaspartidillas.online` para chat en tiempo real
  - **Firebase** (fallback): Si Firebase está configurado, se usa como alternativa
  - **Local** (fallback): Si ninguna de las anteriores está disponible, funciona solo entre pestañas del mismo navegador
- **Usuarios:** 
  - Los usuarios de Discord se cargan automáticamente usando sus IDs reales
  - Cada dispositivo obtiene un usuario único y aleatorio que se guarda en `localStorage`
- **Mensajes:** Se sincronizan en tiempo real a través de Socket.IO o Firebase (si está configurado).
- **API de Gemini:** Se ejecuta desde el cliente (requiere API Key configurada).
- **Discord API:** Se usa para obtener información de usuarios reales (opcional, puede configurarse manualmente).

## 👥 Configurar Usuarios de Discord

### Opción 1: Sin Token (Recomendado)

1. Edita el archivo `config/discordUsers.ts`
2. Actualiza los nombres de usuario según tus usuarios reales:
   ```typescript
   {
     id: '368377018372456459',
     username: 'NombreReal', // Cambia aquí
     status: 'online',
   }
   ```
3. (Opcional) Si conoces el hash del avatar, puedes agregarlo:
   ```typescript
   {
     id: '368377018372456459',
     username: 'NombreReal',
     avatarHash: 'a1b2c3d4e5f6...', // Hash del avatar (opcional)
     status: 'online',
   }
   ```

**Ventajas:**
- ✅ No requiere token
- ✅ Más seguro (no expone credenciales)
- ✅ Funciona inmediatamente
- ✅ Los avatares se obtienen del CDN público de Discord

### Opción 2: Con Token (Opcional)

Si quieres que los nombres se actualicen automáticamente desde Discord:

1. Ve a [Discord Developer Portal](https://discord.com/developers/applications)
2. Crea una nueva aplicación o selecciona una existente
3. Ve a la sección "Bot"
4. Crea un bot y copia el token
5. **Importante:** El bot necesita tener el permiso "Read User Information" en el servidor
6. Agrega el token a tu archivo `.env` como `VITE_DISCORD_BOT_TOKEN`

**Nota de seguridad:** En producción, es recomendable usar un backend proxy para proteger el bot token, ya que las variables `VITE_*` son visibles en el cliente.

## 🔥 Configurar Firebase (Opcional pero Recomendado)

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o usa uno existente
3. Habilita **Realtime Database**:
   - Ve a Realtime Database
   - Crea una base de datos en modo de prueba
   - Copia la URL de la base de datos
4. Obtén la configuración de Firebase:
   - Ve a Project Settings > General
   - En "Your apps", selecciona la web app o crea una nueva
   - Copia las credenciales de configuración
5. Agrega las credenciales a tu archivo `.env` (ver arriba)

**Reglas de seguridad recomendadas para Realtime Database:**
```json
{
  "rules": {
    "channels": {
      ".read": true,
      ".write": true
    },
    "users": {
      ".read": true,
      "$userId": {
        ".write": "$userId === auth.uid || !data.exists()"
      }
    }
  }
}
```

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Genera el build de producción
- `npm run preview` - Previsualiza el build de producción localmente

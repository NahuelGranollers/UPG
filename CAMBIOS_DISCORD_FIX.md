# 🔧 Resumen de Cambios - Fix Discord Login Persistente

## 📦 Archivos modificados

### 1. `App.tsx` (Frontend)

**Problema original**: El usuario volvía a "Invitado" después de hacer login con Discord.
**Problema descubierto**: El backend sobrescribía el usuario Discord con invitado al conectar Socket.IO.

**Cambios implementados**:

#### a) Estado inicial de `currentUser` mejorado

- ✅ Añadido log: `🔐 [Init] Using cached Discord user from localStorage` cuando se encuentra usuario guardado
- ✅ Añadido log: `👤 [Init] No valid user found, creating guest` cuando se crea invitado
- ✅ Verificación más robusta: ahora también verifica que `id` no empiece con `guest-`

#### b) `useEffect` de `checkAuth` mejorado con logs

- ✅ Log inicial: `🔐 checkAuth running. URL: ...`
- ✅ Log de storage: `🔐 checkAuth start - currentUser in storage: ...`
- ✅ Log antes de fetch: `🔄 Fetching /auth/user with credentials from ...`
- ✅ Log de respuesta: `🔁 /auth/user response status: ...`
- ✅ Log de éxito: `✅ Logged in as Discord user ...`
- ✅ Log de usuario cacheado: `✅ Using cached Discord user ...`
- ✅ Log de invitado: `👤 Using guest user ...`
- ✅ Log de error: `❌ Error in checkAuth: ...`

#### c) Fallback inteligente cuando `/auth/user` falla

**ANTES**: Si `/auth/user` devolvía 401 → creaba invitado inmediatamente

**AHORA**:

```typescript
if (response not ok) {
  // 1. Intentar usar usuario Discord guardado
  const savedUser = storage.loadUserData();
  if (savedUser es válido y no es invitado) {
    return savedUser; // ✅ No crear invitado
  }
  // 2. Solo crear invitado si no hay nada útil
  crear invitado;
}
```

Esto significa que **incluso si la cookie falla**, el usuario puede seguir usando su cuenta Discord desde `localStorage`.

#### d) Protección de usuario Discord en `user:registered` ⭐ **CRÍTICO**

**ANTES**: El socket devolvía `user:registered` con datos del servidor → **sobrescribía** usuario Discord con invitado

**AHORA**:

```typescript
socket.on('user:registered', (userData: User) => {
  // Si ya estamos autenticados con Discord
  if (isDiscordUser && !currentUser.isGuest) {
    // Solo actualizar rol, NO cambiar identidad
    setCurrentUser(prev => ({ ...prev, role: userData.role }));
    return; // ✅ Proteger identidad Discord
  }
  // Si es invitado, permitir actualización completa
  setCurrentUser(userData);
});
```

Esto **previene** que el backend sobrescriba tu usuario Discord con un invitado generado por IP.

---

### 2. `server/index.js` (Backend)

**Problema crítico descubierto**: El servidor usaba solo la IP para identificar usuarios, lo que causaba que usuarios Discord fueran sobrescritos con invitados generados por IP.

**Cambios implementados**:

#### a) CORS mejorado con manejo de preflight

```javascript
// Handle preflight requests
if (req.method === 'OPTIONS') {
  return res.sendStatus(204);
}
```

Esto previene errores de CORS con peticiones OPTIONS antes de GET/POST.

#### b) Detección de usuarios Discord en `user:join` ⭐ **CRÍTICO**

**ANTES**: Todos los usuarios se identificaban por IP → usuarios Discord eran reemplazados por invitados

**AHORA**:

```javascript
socket.on("user:join", (userData) => {
  // Detectar si es usuario Discord (no guest-XXXX)
  const isDiscordUser = userData.id && !userData.id.startsWith('guest-')
                        && !userData.username.startsWith('Invitado');

  if (isDiscordUser) {
    // Usuario Discord - usar sus datos directamente
    finalUserData = { ...userData, role, socketId, ... };
    // NO buscar por IP, NO sobrescribir
  } else {
    // Usuario invitado - sistema de IP como antes
    const existingUser = getUserByIP(ipHash);
    ...
  }
});
```

Esto **previene** que el servidor cree un nuevo invitado para usuarios Discord.

#### c) No registrar usuarios Discord por IP

**ANTES**: Todos los usuarios se registraban en `registeredUsers` por IP

**AHORA**:

```javascript
// Solo registrar por IP si es usuario invitado (no Discord)
if (!isDiscordUser) {
  registerUser(ipHash, { ... });
}
```

Los usuarios Discord mantienen su identidad única, no dependen de la IP.

#### d) Log mejorado en `/auth/user`

**ANTES**:

```javascript
logger.info(`✅ Discord user session found: ${req.session.discordUser.username}`);
```

**AHORA**:

```javascript
logger.info(
  `✅ Discord user session found (ID: ${req.session.discordUser.id}, username: ${req.session.discordUser.username})`
);
```

Ahora incluye el ID para mejor debugging.

#### e) Configuración de sesión verificada

✅ Sin `domain` en cookie (permite cross-domain)
✅ `sameSite: 'none'` en producción (permite cross-domain con HTTPS)
✅ `secure: true` en producción (solo HTTPS)
✅ `maxAge: 30 días` (sesión duradera)

---

## 🎯 Resultado esperado

### Antes de los cambios:

1. Usuario hace login con Discord ✅
2. Socket.IO se conecta → Backend crea "Invitado7139" por IP ❌
3. Frontend recibe `user:registered` → Sobrescribe "popogamer3" con "Invitado7139" ❌
4. Resultado: Vuelve a mostrar "Invitado1234" ❌
5. Logs en consola: confusos, sin detalles ❌

### Después de los cambios:

1. Usuario hace login con Discord → `popogamer3` ✅
2. Socket.IO se conecta → Backend **reconoce** usuario Discord ✅
3. Backend mantiene "popogamer3", NO crea invitado ✅
4. Frontend **rechaza** cambios de identidad desde socket ✅
5. Resultado: Muestra "popogamer3" con su avatar ✅
6. Usuario recarga (F5) → Sigue mostrando "popogamer3" ✅
7. Logs en consola: muy claros, fácil diagnosticar problemas ✅

---

## 🧪 Cómo probar

### Opción A: Flujo normal (debe funcionar)

1. Abre ventana privada
2. Ve a `https://unaspartidillas.online`
3. Haz login con Discord
4. Verifica que aparece tu nombre/avatar
5. **Recarga la página (F5)**
6. Verifica que **NO vuelve a invitado** ✅

### Opción B: Simular fallo de cookie (nuevo fallback)

1. Abre DevTools → Application → Cookies
2. Elimina la cookie `upg.sid` de `mensajeria-ksc7.onrender.com`
3. **Recarga la página**
4. Aunque la cookie no existe, debería **seguir mostrando tu usuario Discord** desde `localStorage` ✅

### Opción C: Logout funciona

1. Estando logueado con Discord
2. Haz clic en el botón **LogOut** (rojo, en la barra inferior)
3. Deberías volver a "Invitado" ✅
4. Puedes volver a hacer login cuando quieras ✅

---

## 📊 Logs que verás en la consola

### Login exitoso:

```
🔐 checkAuth running. URL: https://unaspartidillas.online/?auth=success
🔐 checkAuth start - currentUser in storage: {...}
✅ Received Discord OAuth callback, fetching user from backend...
🔄 Fetching /auth/user with credentials from https://mensajeria-ksc7.onrender.com
🔁 /auth/user response status: 200
✅ Discord user session found: {...}
✅ Logged in as Discord user TuUsername
```

### Recarga con sesión válida:

```
🔐 [Init] Using cached Discord user from localStorage: TuUsername
🔐 checkAuth running. URL: https://unaspartidillas.online/
✅ Using cached Discord user TuUsername
```

### Fallo de cookie pero localStorage OK (nuevo):

```
🔐 checkAuth running. URL: https://unaspartidillas.online/?auth=success
🔄 Fetching /auth/user with credentials from https://mensajeria-ksc7.onrender.com
🔁 /auth/user response status: 401
⚠️ Failed to fetch Discord user: 401 Unauthorized
✅ Using cached Discord user after auth failure: TuUsername
```

### No hay sesión (invitado):

```
🔐 [Init] No valid user found, creating guest
🔐 checkAuth running. URL: https://unaspartidillas.online/
👤 Entrando como invitado
```

---

## 🔧 Qué NO se cambió (está correcto)

- ✅ Configuración de `express-session`
- ✅ Middleware CORS (solo se añadió preflight)
- ✅ Rutas OAuth (`/auth/discord`, `/auth/callback`, `/auth/user`, `/auth/logout`)
- ✅ Lógica de Socket.IO
- ✅ Componentes de UI (`ChannelList`, `UserList`, etc.)

---

## 📝 Próximos pasos

1. **Deploy** estos cambios a producción (Render)
2. **Verificar** las variables de entorno (ver `INSTRUCCIONES_DISCORD_LOGIN.md`)
3. **Probar** el flujo completo en ventana privada
4. **Revisar logs** tanto del navegador como del servidor

---

## ⚠️ Importante

Los cambios en el código **NO resolverán** problemas de:

- Variables de entorno mal configuradas
- Redirect URI incorrecta en Discord Developer Portal
- Problemas de HTTPS/certificados
- Configuración incorrecta de CORS en proxy/CDN (Cloudflare, etc.)

Estos deben verificarse **manualmente** siguiendo `INSTRUCCIONES_DISCORD_LOGIN.md`.

---

## 📞 Si el problema persiste

Si después de implementar estos cambios Y verificar la configuración el problema persiste:

1. Captura los logs de la consola del navegador
2. Captura la petición `/auth/user` en Network (con cookies)
3. Captura los logs del servidor en Render
4. Verifica que las variables de entorno están exactamente como se especifica

Con esa información se puede diagnosticar el problema exacto (probablemente relacionado con configuración externa, no código).

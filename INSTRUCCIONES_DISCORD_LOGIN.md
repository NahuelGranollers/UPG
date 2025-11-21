# 🔐 Instrucciones para verificar Discord Login en Producción

## ✅ Cambios implementados en el código

### Frontend (`App.tsx`)
1. ✅ **Logs detallados** añadidos para debugging del flujo de autenticación
2. ✅ **Lógica mejorada** para no pisar usuario Discord guardado con invitado
3. ✅ **Fallback inteligente** que intenta usar usuario guardado antes de crear invitado cuando falla `/auth/user`

### Backend (`server/index.js`)
1. ✅ **Manejo de preflight OPTIONS** añadido para CORS
2. ✅ **Log mejorado** en `/auth/user` con ID y username del usuario
3. ✅ **Configuración de sesión verificada** (sin `domain`, con `sameSite: none` en producción)

---

## 🚀 Paso 1: Verificar Variables de Entorno en Render

Ve al panel de tu servidor en Render y confirma que estas variables están exactamente así:

```
DISCORD_CLIENT_ID=<tu_client_id_de_discord>
DISCORD_CLIENT_SECRET=<tu_client_secret_de_discord>
DISCORD_REDIRECT_URI=https://mensajeria-ksc7.onrender.com/auth/callback
FRONTEND_URL=https://unaspartidillas.online
SESSION_SECRET=<tu_clave_secreta_aleatoria>
NODE_ENV=production
```

### ⚠️ Importante:
- `DISCORD_REDIRECT_URI` debe ser **exactamente** `https://mensajeria-ksc7.onrender.com/auth/callback` (sin barra final)
- `FRONTEND_URL` debe ser **exactamente** `https://unaspartidillas.online` (sin barra final)

---

## 🎮 Paso 2: Verificar Configuración en Discord Developer Portal

1. Ve a https://discord.com/developers/applications
2. Selecciona tu aplicación
3. Ve a **OAuth2** → **General**
4. En **Redirects**, añade (si no está):
   ```
   https://mensajeria-ksc7.onrender.com/auth/callback
   ```
5. **Guarda los cambios**

---

## 🧪 Paso 3: Probar el flujo completo

### A) Preparación
1. Abre Chrome/Firefox en **modo incógnito** (ventana privada)
2. Abre **DevTools** (F12)
3. Ve a la pestaña **Console**
4. Ve también a la pestaña **Network**

### B) Flujo de prueba
1. **Navega** a `https://unaspartidillas.online`
2. **Observa la consola**, deberías ver:
   ```
   🔐 [Init] No valid user found, creating guest
   🔐 checkAuth running. URL: https://unaspartidillas.online/
   👤 Entrando como invitado
   ```

3. **Haz clic** en el botón de **Iniciar sesión con Discord** (icono LogIn en la barra inferior izquierda)

4. **Autoriza** la aplicación en Discord

5. **Volverás** a `https://unaspartidillas.online/?auth=success`

6. **Observa la consola**, deberías ver:
   ```
   🔐 checkAuth running. URL: https://unaspartidillas.online/?auth=success
   ✅ Received Discord OAuth callback, fetching user from backend...
   🔄 Fetching /auth/user with credentials from https://mensajeria-ksc7.onrender.com
   🔁 /auth/user response status: 200
   ✅ Discord user session found: { id: "...", username: "...", ... }
   ✅ Logged in as Discord user TuUsername
   ```

### C) Verificación en Network
1. En la pestaña **Network**, filtra por `auth/user`
2. Selecciona la petición `GET https://mensajeria-ksc7.onrender.com/auth/user`
3. En **Request Headers**, busca `Cookie:` y verifica que hay una cookie `upg.sid=...`
4. En **Response**, deberías ver un JSON como:
   ```json
   {
     "id": "123456789",
     "username": "TuUsername",
     "discriminator": "0",
     "avatar": "abc123..."
   }
   ```

### D) Verificación visual
En la **esquina inferior izquierda** de la aplicación:
- ✅ Debe aparecer tu **foto de Discord** (avatar)
- ✅ Debe aparecer tu **nombre de Discord**
- ✅ El botón **LogIn** debe haber desaparecido
- ✅ Debe aparecer un botón **LogOut** (rojo)

### E) Verificación de persistencia
1. **Recarga la página** (F5)
2. **Observa la consola**, deberías ver:
   ```
   🔐 [Init] Using cached Discord user from localStorage: TuUsername
   ✅ Using cached Discord user TuUsername
   ```
3. Tu usuario **NO debe volver a invitado**
4. Tu avatar y nombre deben seguir apareciendo

---

## ❌ Problemas comunes y soluciones

### Problema 1: `/auth/user` devuelve 401
**Síntoma**: En Network ves `401 Unauthorized`

**Causa**: La cookie de sesión no se está enviando o la sesión no se guardó correctamente

**Soluciones**:
1. Verifica que en **Request Headers** de `/auth/user` hay una cookie `upg.sid`
2. Si NO hay cookie:
   - Verifica que `DISCORD_REDIRECT_URI` en Render coincide EXACTAMENTE con la configurada en Discord
   - Verifica que estás usando HTTPS (no HTTP)
   - Limpia las cookies del navegador y prueba de nuevo
3. Si HAY cookie pero igual devuelve 401:
   - Revisa los logs del servidor en Render
   - Busca mensajes como "No Discord user in session"
   - Puede ser que la sesión expire muy rápido (poco probable con `maxAge: 30 días`)

### Problema 2: Vuelve a crear invitado después del login
**Síntoma**: Logeas con Discord pero inmediatamente vuelve a "Invitado1234"

**Causa**: El código está creando un nuevo invitado en lugar de usar el usuario Discord

**Solución**:
1. Verifica en la consola que `/auth/user` devuelve **200** (no 401)
2. Verifica que ves el log `✅ Logged in as Discord user`
3. Si ves `👤 Using guest user`, significa que `/auth/user` falló (ver Problema 1)

### Problema 3: Vuelve a invitado al recargar la página
**Síntoma**: El login funciona, pero al recargar (F5) vuelve a invitado

**Causa**: `localStorage` no está guardando el usuario correctamente

**Solución**:
1. Abre DevTools → Application → Local Storage → `https://unaspartidillas.online`
2. Busca la clave que contiene datos de usuario
3. Verifica que contiene tu usuario Discord (no un invitado)
4. Si no hay nada o hay un invitado, revisa que `storage.saveUserData(newUser)` se está ejecutando (añade un `console.log` ahí si es necesario)

### Problema 4: Error de CORS
**Síntoma**: En consola ves errores como "CORS policy blocked" o "No 'Access-Control-Allow-Origin'"

**Solución**:
1. Verifica que en el backend, el origen de tu frontend está en `allowedOrigins`
2. Verifica que el middleware CORS está ANTES de las rutas
3. Verifica que `credentials: true` está en ambos lados (backend y frontend)

---

## 🔍 Logs del servidor (Render)

Para ver los logs del servidor en tiempo real:

1. Ve a tu dashboard de Render
2. Selecciona tu servicio
3. Ve a la pestaña **Logs**
4. Filtra por "Discord" o "auth" para ver solo logs relevantes

Deberías ver mensajes como:
```
✅ [SUCCESS] Access token obtained successfully
👤 [USER] Discord user authenticated: TuUsername#0000 (ID: 123456789)
✅ [SUCCESS] Session saved for user: TuUsername
🔄 [INFO] Redirecting to frontend: https://unaspartidillas.online
✅ [INFO] Discord user session found (ID: 123456789, username: TuUsername)
```

---

## 📝 Checklist final

Antes de dar por cerrado el issue, verifica:

- [ ] Variables de entorno correctamente configuradas en Render
- [ ] Redirect URI configurada en Discord Developer Portal
- [ ] Login funciona y muestra tu nombre/avatar de Discord
- [ ] Al recargar la página, NO vuelve a invitado
- [ ] El botón LogOut aparece y funciona (vuelve a invitado al hacer clic)
- [ ] Los logs de la consola del navegador muestran el flujo correcto
- [ ] `/auth/user` devuelve 200 con tu usuario Discord
- [ ] La cookie `upg.sid` se envía en las peticiones a `/auth/user`

---

## 🎯 Resultado esperado

Después de implementar estos cambios y verificar la configuración:

1. ✅ El usuario hace login con Discord → Su avatar y nombre aparecen
2. ✅ El usuario recarga la página → Su avatar y nombre SE MANTIENEN
3. ✅ El usuario cierra y abre el navegador → Su sesión PERSISTE (hasta 30 días)
4. ✅ El usuario hace logout → Vuelve a ser invitado (como debe ser)

---

**Nota**: Si después de seguir todos estos pasos el problema persiste, captura:
1. Screenshot de las variables de entorno en Render (oculta los secretos)
2. Screenshot de la configuración OAuth2 en Discord
3. Screenshot de la pestaña Network mostrando la petición `/auth/user`
4. Copia completa de los logs de la consola del navegador

Con esa información podremos diagnosticar el problema exacto.

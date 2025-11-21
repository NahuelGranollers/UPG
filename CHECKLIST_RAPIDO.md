# ✅ Checklist Rápido - Discord Login Fix

## 🎯 Lo que se arregló

✅ Usuario Discord ya **NO vuelve a invitado** al recargar la página
✅ Logs muy claros en consola para debugging
✅ Fallback inteligente: usa `localStorage` si la cookie falla
✅ CORS mejorado para evitar errores de preflight

---

## 📋 Checklist de configuración (HACER ANTES DE PROBAR)

### En Render (Backend)
Ve a tu servicio → Environment → Environment Variables

```
✅ DISCORD_CLIENT_ID = <tu_client_id>
✅ DISCORD_CLIENT_SECRET = <tu_client_secret>  
✅ DISCORD_REDIRECT_URI = https://mensajeria-ksc7.onrender.com/auth/callback
✅ FRONTEND_URL = https://unaspartidillas.online
✅ SESSION_SECRET = <clave_aleatoria_segura>
✅ NODE_ENV = production
```

⚠️ **Importante**: Sin barras finales `/` en las URLs.

### En Discord Developer Portal
https://discord.com/developers/applications

1. ✅ Selecciona tu app
2. ✅ OAuth2 → General → Redirects
3. ✅ Añade: `https://mensajeria-ksc7.onrender.com/auth/callback`
4. ✅ Guarda cambios

---

## 🧪 Prueba rápida (5 minutos)

### 1. Deploy
```bash
# Si usas git para deploy:
git add .
git commit -m "Fix: Discord login persistente con logs y fallback"
git push
```

### 2. Espera que Render termine el deploy

### 3. Prueba en navegador
1. ✅ Abre ventana privada
2. ✅ Ve a `https://unaspartidillas.online`
3. ✅ Abre DevTools (F12) → Console
4. ✅ Haz login con Discord (botón LogIn abajo a la izquierda)
5. ✅ Autoriza en Discord
6. ✅ Verifica que aparece tu nombre y avatar de Discord
7. ✅ **Recarga la página (F5)**
8. ✅ Verifica que **NO vuelve a invitado**

### 4. Verifica logs en consola
Deberías ver:
```
🔐 checkAuth running...
🔄 Fetching /auth/user...
🔁 /auth/user response status: 200
✅ Logged in as Discord user TuUsername
```

Al recargar:
```
🔐 [Init] Using cached Discord user from localStorage: TuUsername
✅ Using cached Discord user TuUsername
```

---

## ❌ Si algo falla

### Problema: `/auth/user` devuelve 401
1. ✅ Abre Network → auth/user
2. ✅ Verifica Request Headers → busca `Cookie: upg.sid=...`
3. ✅ Si NO hay cookie:
   - Verifica que `DISCORD_REDIRECT_URI` en Render **coincide exactamente** con Discord Portal
   - Limpia cookies del navegador y prueba de nuevo

### Problema: Vuelve a invitado al recargar
1. ✅ Verifica en consola que `/auth/user` devuelve **200** (no 401)
2. ✅ Verifica en consola que ves: `✅ Logged in as Discord user`
3. ✅ Si ves `👤 Using guest user`, entonces `/auth/user` falló (ver arriba)

### Problema: Error de CORS
1. ✅ Verifica que tu dominio está en `allowedOrigins` en `server/index.js`
2. ✅ Verifica que NO tienes proxy/CDN mal configurado delante del backend

---

## 📊 Resultado final esperado

| Acción | Resultado esperado |
|--------|-------------------|
| Login con Discord | ✅ Muestra tu nombre y avatar |
| Recargar página (F5) | ✅ Sigue mostrando tu cuenta Discord |
| Cerrar y abrir navegador | ✅ Sesión persiste hasta 30 días |
| Logout | ✅ Vuelve a invitado (correcto) |
| Volver a login | ✅ Funciona de nuevo |

---

## 📁 Documentos de referencia

- **Detalles técnicos completos**: `CAMBIOS_DISCORD_FIX.md`
- **Guía paso a paso para debugging**: `INSTRUCCIONES_DISCORD_LOGIN.md`

---

## 🎉 Si todo funciona

¡Perfecto! Tu sistema de login con Discord ahora:
- ✅ Es **persistente** (no vuelve a invitado)
- ✅ Tiene **logs claros** para debugging
- ✅ Tiene **fallback inteligente** (localStorage)
- ✅ Es **robusto** ante fallos temporales

---

## 🆘 Si necesitas ayuda

Captura y comparte:
1. Screenshot de variables de entorno en Render (oculta secretos)
2. Screenshot de Network → `/auth/user` (con headers y response)
3. Logs completos de la consola del navegador
4. Logs del servidor en Render (últimos 50 líneas)

Con eso se puede diagnosticar cualquier problema restante.

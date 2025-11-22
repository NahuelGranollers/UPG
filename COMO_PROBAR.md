# 🚀 Cómo Probar la Aplicación

## ✅ Servidores Corriendo

### **Frontend (Vite Dev Server)**

- 🌐 URL: http://localhost:3000/
- 📡 Network: http://192.168.1.132:3000/
- ✅ Estado: **CORRIENDO**

### **Backend (Socket.IO Server)**

- 🔌 Puerto: 3001
- ✅ Estado: **CORRIENDO**

---

## 🧪 Cómo Probar las Funcionalidades

### **1. Abrir la Aplicación**

1. Abre tu navegador
2. Ve a: **http://localhost:3000/**
3. Deberías ver la pantalla de login

### **2. Probar Autocompletado de Menciones**

#### Paso 1: Entrar al Chat

- Ingresa con un usuario (o usa Discord login)
- Entra a cualquier canal

#### Paso 2: Escribir una Mención

1. Click en el input de mensaje (abajo)
2. Escribe **`@`**
3. **Deberías ver:**
   - 🎯 Panel desplegable con usuarios
   - 🤖 Bot UPG en la lista
   - 🟢 Usuarios online con punto verde
   - ⚫ Usuarios offline con punto gris

#### Paso 3: Autocompletar

- **Opción A:** Escribe más letras para filtrar → `@upg`
- **Opción B:** Usa **flechas ↑↓** para navegar
- **Opción C:** Presiona **Tab** o **Enter**
- **Opción D:** Haz **Click** en cualquier usuario

#### Resultado Esperado:

```
@UPG
```

(Con espacio automático al final)

### **3. Probar Resaltado de Mensajes**

#### Paso 1: Abrir en Dos Navegadores

1. **Navegador 1:** http://localhost:3000/
   - Login como "Usuario1"
2. **Navegador 2 (incógnito):** http://localhost:3000/
   - Login como "Usuario2"

#### Paso 2: Enviar Mención

En **Navegador 1** (Usuario1), escribe:

```
@Usuario2 hola, ¿cómo estás?
```

#### Paso 3: Ver el Resultado

En **Navegador 2** (Usuario2), deberías ver:

- 🟡 **Mensaje con fondo amarillo**
- 📍 **Borde amarillo a la izquierda**
- 🏷️ **Badge "MENCIÓN"** en amarillo
- 💙 **Tu nombre "@Usuario2" resaltado en azul**

### **4. Probar Bot Agresivo**

#### Mencionar al Bot:

Escribe cualquiera de estos:

```
@UPG hola
@upg como estas
@UpG ayuda
@UPG que tal
```

#### Resultado Esperado:

1. **Mientras esperas:**
   - Avatar del bot
   - 3 puntos animados
   - Texto "escribiendo..."

2. **Respuesta:**
   - Mensaje agresivo en español
   - Con insultos ocasionales
   - Tono tosco y maleducado

#### Ejemplos de Respuestas:

- "¿Qué coño quieres, tío? 🙄"
- "Hola, retrasado. ¿En qué mierda te ayudo ahora?"
- "Fatal, gracias por preguntar, capullo. 😤"

---

## 🔍 Verificar que Todo Funciona

### **Checklist:**

- [ ] Panel de menciones aparece al escribir `@`
- [ ] Puedes filtrar usuarios escribiendo después del `@`
- [ ] Tab/Enter/Click autocompletan la mención
- [ ] Usuarios online tienen punto verde 🟢
- [ ] Usuarios offline tienen punto gris ⚫
- [ ] Bot UPG aparece con badge "BOT"
- [ ] Mensajes que te mencionan tienen fondo amarillo
- [ ] Tu nombre aparece en azul en el mensaje
- [ ] Badge "MENCIÓN" aparece en mensajes que te mencionan
- [ ] Bot muestra "escribiendo..." al mencionarlo
- [ ] Bot responde de forma agresiva en español

---

## 🐛 Si No Funciona

### **El panel @ no aparece:**

1. Presiona **Ctrl + Shift + R** (hard refresh)
2. Limpia la caché del navegador
3. Cierra y abre de nuevo el navegador

### **No veo usuarios en el panel:**

1. Verifica que otros usuarios estén conectados
2. Abre DevTools (F12) → Console
3. Busca errores en rojo
4. Verifica que Socket.IO está conectado

### **Bot no responde:**

1. Verifica que el servidor backend está corriendo (puerto 3001)
2. Mira los logs del servidor en la terminal
3. Asegúrate de mencionar `@UPG` (no solo "upg")

### **Resaltado no funciona:**

1. Asegúrate de usar el username exacto
2. Debe tener el formato `@username` con el @
3. Prueba con dos usuarios diferentes

---

## 📝 URLs de Acceso

| Servicio           | URL                        | Puerto |
| ------------------ | -------------------------- | ------ |
| Frontend (Dev)     | http://localhost:3000/     | 3000   |
| Frontend (Network) | http://192.168.1.132:3000/ | 3000   |
| Backend            | Socket.IO                  | 3001   |

---

## 🎯 Escenario de Prueba Completo

### **Escenario: Conversación con Mención**

1. **Usuario1** entra al chat
2. **Usuario2** entra al chat (otro navegador)
3. **Usuario1** escribe: `@` → Ve el panel
4. **Usuario1** selecciona "Usuario2" del panel → `@Usuario2 `
5. **Usuario1** completa: `@Usuario2 necesito ayuda`
6. **Usuario1** envía el mensaje
7. **Usuario2** ve el mensaje **resaltado en amarillo**
8. **Usuario2** responde: `@Usuario1 dime`
9. **Usuario1** ve **su mensaje resaltado**
10. **Usuario1** menciona al bot: `@UPG hola`
11. Ve "escribiendo..." del bot
12. Bot responde con insulto: "¿Qué coño quieres, tío? 🙄"

---

**Todo debería funcionar ahora. Si no ves cambios, haz hard refresh (Ctrl + Shift + R) en el navegador.**

# 🎯 Nuevas Funcionalidades Implementadas - UPG Community Hub

## ✨ Sistema de Avatares Personalizados

### 📸 Subida de Imágenes
- Los usuarios pueden subir su propia foto de perfil
- **Almacenamiento permanente** en Firebase Storage
- Validación automática:
  - Formatos permitidos: JPG, PNG, GIF, WEBP
  - Tamaño máximo: 5MB
- Las fotos se guardan con URL única y permanente
- También disponibles avatares predeterminados aleatorios

### 🎨 Interfaz de Usuario
- Botón "Subir foto" con preview en tiempo real
- Opción para eliminar foto personalizada
- Grid de avatares predeterminados
- Botón "Aleatorio" para cambiar rápidamente

---

## 🛡️ Sistema de Administración

### 👑 Usuario Admin
- **Detección automática**: Si el username es "admin", se otorgan permisos de administrador
- Color especial: Naranja (#ff4d0a) para distinguir visualmente
- Badge "ADMIN" visible en mensajes y header
- Rol guardado en cookies para persistencia

### 🔧 Funcionalidades de Admin

#### 1. **Eliminar Mensajes Individuales**
- Hover sobre cualquier mensaje muestra botones de acción
- Botón de papelera (🗑️) para eliminar mensaje específico
- Solo visible para admin en mensajes de otros usuarios

#### 2. **Limpiar Canal Completo**
- Botón en el header del chat (🗑️)
- Elimina todo el historial del canal actual
- Confirmación antes de ejecutar
- Todos los usuarios ven el canal limpio instantáneamente

#### 3. **Banear Usuarios**
- Botón de ban (🚫) en hover de mensajes
- **Baneo por IP**: Bloquea tanto el userID como la IP del usuario
- El usuario baneado es desconectado inmediatamente
- No puede volver a conectarse aunque cambie de cuenta
- Lista de baneos persistente en archivo `banned.json`

---

## 🔒 Sistema de Baneos

### Características
- **Doble verificación**: UserID + IP
- **Persistencia**: Los baneos se guardan en disco
- **Prevención de reconexión**: Verifica en cada intento de conexión
- **Notificación**: Usuario baneado recibe mensaje antes de ser desconectado
- **Limpieza automática**: Borra cookies y localStorage del usuario baneado

### Archivo `banned.json`
```json
{
  "ips": ["192.168.1.100", "203.0.113.45"],
  "userIds": ["user-123456", "user-789012"]
}
```

---

## 🚀 Implementación en el Servidor

### Actualiza tu servidor Socket.IO
Reemplaza tu archivo del servidor con `server-updated.js` que incluye:

1. **Gestión de IPs**: Captura IP real del cliente (incluso tras proxy)
2. **Verificación de baneos**: Comprueba en cada conexión
3. **Eventos de admin**: 
   - `admin:delete-message`
   - `admin:clear-channel`
   - `admin:ban-user`
4. **Validación de permisos**: Solo usuarios con `role: 'admin'` pueden ejecutar acciones

### Comandos para el servidor
```bash
# Instalar dependencias
npm install express socket.io

# Ejecutar servidor
node server-updated.js

# En producción (con PM2)
pm2 start server-updated.js --name "upg-server"
pm2 save
```

---

## 📋 Variables de Entorno Requeridas

### Cliente (Vite)
```env
VITE_SOCKET_URL=https://tu-servidor.com
VITE_FIREBASE_API_KEY=tu-api-key
VITE_FIREBASE_STORAGE_BUCKET=tu-bucket.appspot.com
# ... resto de Firebase config
```

### Servidor
```env
PORT=3000
```

---

## 🎮 Cómo Usar

### Para ser Admin:
1. Ir a la pantalla de setup de usuario
2. Usar el username: **"admin"** (case insensitive)
3. Elegir avatar y confirmar
4. Automáticamente se asigna rol de administrador

### Para usuarios normales:
1. Elegir cualquier username diferente de "admin"
2. **El sistema verifica que el nombre no esté en uso** (en tiempo real)
3. Subir foto personalizada o elegir avatar predeterminado
4. Los datos se guardan en cookies por 30 días

### ✅ Sistema de Usernames Únicos
- Verificación en tiempo real antes de crear cuenta
- No se permiten usernames duplicados (case-insensitive)
- Username liberado automáticamente al desconectarse
- Indicador visual "Verificando..." durante la comprobación

---

## 🔄 Flujo de Datos

```
1. Usuario crea cuenta → UserSetup
2. Username verificado → Socket.IO (comprueba duplicados)
3. Sube foto → Firebase Storage → URL permanente
4. Datos guardados → Cookies (30 días)
5. Rol detectado → Admin o User
6. Conexión Socket.IO → Verificación de baneos + username único
7. Usuario conectado → Lista sincronizada en tiempo real
8. Al desconectar → Username liberado automáticamente
```

---

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Tiempo Real**: Socket.IO
- **Almacenamiento**: Firebase Storage
- **Persistencia**: Cookies + localStorage
- **Servidor**: Node.js + Express

---

## 🐛 Troubleshooting

### Las fotos no se suben
- Verifica que Firebase Storage esté configurado en las reglas:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /avatars/{imageId} {
      allow read;
      allow write: if request.resource.size < 5 * 1024 * 1024;
    }
  }
}
```

### Admin no tiene permisos
- Verificar que el username sea exactamente "admin"
- Comprobar cookies: `upg_role` debe ser "admin"
- Limpiar cookies y volver a crear cuenta

### Usuarios baneados pueden reconectar
- Verificar que el archivo `banned.json` tenga permisos de escritura
- Comprobar que la IP se está capturando correctamente
- Si usas proxy/nginx, configurar headers `X-Forwarded-For`

---

## 📝 Notas Importantes

- ⚠️ Solo puede haber un admin a la vez (por username)
- ⚠️ Los baneos son permanentes (editar `banned.json` para desbanear)
- ⚠️ Las fotos en Firebase Storage consumen espacio (plan gratuito: 1GB)
- ⚠️ Las IPs pueden cambiar (usuarios con IP dinámica)

---

## 🎨 Personalización

### Cambiar nombre del usuario admin
En `App.tsx`, línea ~144:
```typescript
const isAdmin = username.toLowerCase() === 'admin'; // Cambiar aquí
```

### Cambiar tiempo de cookies
En `App.tsx`, línea ~147:
```typescript
const expirationDays = 30; // Cambiar a días deseados
```

---

¡Sistema completo de administración y avatares personalizados implementado! 🚀

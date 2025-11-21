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
- **Detección automática por IP**: Solo la IP `212.97.95.46` tiene permisos de administrador
- El servidor detecta la IP en cada conexión y asigna el rol automáticamente
- Color especial: Naranja (#ff4d0a) para distinguir visualmente
- Badge "ADMIN" visible en mensajes y header
- Rol guardado en cookies y actualizado por el servidor
- **Cualquier usuario creado desde la IP de admin tendrá permisos de administrador**

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
1. Conectarse desde la IP: **212.97.95.46**
2. Crear cualquier cuenta (username puede ser cualquiera)
3. El servidor detecta automáticamente tu IP
4. Se asigna rol de administrador automáticamente
5. Recibes notificación "👑 Admin detectado por IP"

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
- Verificar que estés conectado desde la IP: **212.97.95.46**
- Comprobar cookies: `upg_role` debe ser "admin"
- Revisar logs del servidor para ver qué IP se está detectando
- Si estás detrás de proxy, configurar `X-Forwarded-For` correctamente

### Usuarios baneados pueden reconectar
- Verificar que el archivo `banned.json` tenga permisos de escritura
- Comprobar que la IP se está capturando correctamente
- Si usas proxy/nginx, configurar headers `X-Forwarded-For`

---

## 📝 Notas Importantes

- ⚠️ **Admin se determina por IP, no por username** - Puedes usar cualquier nombre
- 🔐 **La IP del admin está cifrada con SHA-256** - No se almacena en texto plano
- ⚠️ Múltiples usuarios desde la misma IP admin tendrán todos permisos de admin
- ⚠️ Los baneos son permanentes (editar `banned.json` para desbanear)
- ⚠️ Las fotos en Firebase Storage consumen espacio (plan gratuito: 1GB)
- ⚠️ Si tu IP cambia (IP dinámica), perderás permisos de admin
- 🔒 El servidor solo muestra los primeros 16 caracteres del hash en los logs por seguridad

---

## 🎨 Personalización

### Cambiar IP del administrador
La IP está cifrada con SHA-256 por seguridad. Para cambiar:

1. Obtén tu IP pública: https://api.ipify.org
2. Genera el hash SHA-256:
```bash
node -e "const crypto = require('crypto'); console.log(crypto.createHash('sha256').update('TU_IP').digest('hex'));"
```
3. En `server-updated.js`, línea ~31:
```javascript
const ADMIN_IP_HASH = 'tu_hash_generado';
```

### Verificar tu IP actual
Para saber cuál es tu IP pública:
1. Visita: https://api.ipify.org
2. En los logs del servidor verás tu IP hasheada (primeros 16 caracteres)
3. Ejemplo: `"IP Hash: 44273c5917d79833..."`

### Agregar múltiples IPs de admin
Si quieres varios admins desde diferentes IPs (primero genera los hashes):
```javascript
// Hashes SHA-256 de las IPs permitidas
const ADMIN_IP_HASHES = [
  '44273c5917d79833c51420afd84a77cef89743c63a44b3c07742ee59d9cde94a', // 212.97.95.46
  'hash_de_segunda_ip',
  'hash_de_tercera_ip'
];

function isAdminIP(ip) {
  const ipHash = hashIP(ip);
  return ADMIN_IP_HASHES.includes(ipHash);
}
```

### Cambiar tiempo de cookies
En `App.tsx`, línea ~147:
```typescript
const expirationDays = 30; // Cambiar a días deseados
```

---

¡Sistema completo de administración y avatares personalizados implementado! 🚀

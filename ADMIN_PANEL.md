# Panel de Administración - UPG Community

## 🛡️ Acceso al Panel

El panel de administración es **exclusivo para administradores** detectados por IP. Se accede mediante:
- Botón rojo con icono de escudo (🛡️) en la barra lateral izquierda
- Solo visible para usuarios con rol `admin`
- IP del admin debe coincidir con el hash configurado en el servidor

## 🎯 Funcionalidades Implementadas

### 👥 **Gestión de Usuarios**

#### 1. **Eliminar Todos los Usuarios**
- **Acción**: `admin:clear-users`
- **Descripción**: Borra todos los usuarios registrados excepto el admin
- **Efecto**:
  - Limpia el archivo `users.json`
  - Mantiene solo el usuario administrador
  - Desconecta a todos los usuarios (excepto admin)
  - Requiere doble confirmación

#### 2. **Expulsar Todos los Usuarios**
- **Acción**: `admin:kick-all-users`
- **Descripción**: Desconecta a todos los usuarios conectados
- **Efecto**:
  - Cierra conexiones Socket.IO
  - NO elimina usuarios registrados
  - Los usuarios pueden reconectarse
  - Muestra mensaje de expulsión

#### 3. **Limpiar Lista de Baneados**
- **Acción**: `admin:clear-banned`
- **Descripción**: Elimina todos los baneos activos
- **Efecto**:
  - Limpia el archivo `banned.json`
  - Elimina IPs y userIds baneados
  - Los usuarios baneados pueden volver a conectarse

### 💾 **Gestión de Datos**

#### 4. **Limpiar Todos los Mensajes**
- **Acción**: `admin:clear-all-messages`
- **Descripción**: Borra el historial completo de mensajes
- **Efecto**:
  - Elimina mensajes de todos los canales
  - Limpia `CHANNELS` en memoria
  - Todos los usuarios ven canales vacíos
  - Requiere doble confirmación

#### 5. **Limpiar Caché del Servidor**
- **Acción**: `admin:clear-cache`
- **Descripción**: Limpia datos temporales en memoria
- **Efecto**:
  - Resetea rate limits (`rateLimits.clear()`)
  - Libera memoria de datos temporales
  - NO afecta usuarios ni mensajes guardados
  - Acción rápida sin confirmación

#### 6. **Exportar Datos del Servidor**
- **Acción**: `admin:export-data`
- **Descripción**: Descarga backup completo en JSON
- **Contenido**:
  - Todos los usuarios registrados
  - Lista de baneados (IPs y userIds)
  - Información de canales y cantidad de mensajes
  - Estadísticas (usuarios conectados, total de usuarios)
  - Timestamp de la exportación
- **Formato**: `upg-server-backup-[timestamp].json`

### 🔄 **Gestión del Servidor**

#### 7. **Reiniciar Servidor Socket.IO**
- **Acción**: `admin:restart-server`
- **Descripción**: Reinicia todas las conexiones Socket.IO
- **Efecto**:
  - Notifica a todos los usuarios (2 segundos de aviso)
  - Desconecta todos los sockets (`io.disconnectSockets()`)
  - Los clientes se reconectan automáticamente
  - Útil para aplicar cambios críticos
  - Requiere doble confirmación

## 🔐 Seguridad

### Verificaciones Implementadas:
1. **Verificación de Rol**: Cada acción verifica `admin.role === 'admin'`
2. **Verificación de Socket**: Solo el socket del admin puede ejecutar acciones
3. **Logs Detallados**: Todas las acciones quedan registradas con username y timestamp
4. **Doble Confirmación**: Acciones críticas requieren 2 clics (5 segundos de timeout)

### Sistema de Confirmación:
```typescript
// Primera vez: Muestra advertencia "⚠️ Confirmar - Clic nuevamente"
// Segunda vez (dentro de 5s): Ejecuta la acción
// Después de 5s: Reset, requiere nueva confirmación
```

## 🎨 Interfaz del Panel

### Categorías Visuales:
- **🔴 Danger** (Rojo): Acciones irreversibles y críticas
- **🟠 Warning** (Naranja): Acciones que afectan usuarios
- **🔵 Info** (Azul): Acciones de mantenimiento
- **🟢 Success** (Verde): Acciones de exportación/consulta

### Animaciones:
- Aparición con fade-in y scale-in
- Botones con hover scale (1.02)
- Pulse animation en botones que requieren confirmación
- Feedback visual al confirmar acciones

### Responsive:
- Modal centrado con max-width 2xl
- Scroll interno para muchas opciones
- Safe-area support para móviles
- Cierre con backdrop click o botón X

## 📊 Eventos del Servidor

### Eventos Emitidos por Admin:
```javascript
'admin:clear-users'
'admin:clear-all-messages'
'admin:clear-banned'
'admin:clear-cache'
'admin:kick-all-users'
'admin:export-data'
'admin:restart-server'
```

### Respuestas del Servidor:
```javascript
'admin:action-success' - Confirmación de acción exitosa
'admin:notification' - Notificación broadcast
'admin:export-data-result' - Datos para exportar
'server:restarting' - Aviso de reinicio
'kicked' - Notificación a usuarios expulsados
```

## 🔨 Casos de Uso

### Limpiar servidor completamente:
1. Limpiar todos los mensajes
2. Limpiar lista de baneados
3. Eliminar todos los usuarios
4. Limpiar caché
5. Reiniciar servidor (opcional)

### Backup y mantenimiento:
1. Exportar datos del servidor
2. Guardar backup localmente
3. Limpiar caché
4. Expulsar usuarios si es necesario

### Emergencia (spam/raid):
1. Expulsar todos los usuarios
2. Limpiar mensajes si hay spam
3. Revisar lista de usuarios en backup
4. Limpiar usuarios si es necesario

## ⚠️ Advertencias

### Acciones Irreversibles:
- ❌ Eliminar usuarios
- ❌ Limpiar mensajes
- ❌ Limpiar lista de baneados

### Buenas Prácticas:
1. **Siempre exportar datos** antes de limpiar
2. **Avisar a la comunidad** antes de acciones críticas
3. **Usar "Expulsar"** en lugar de "Eliminar" cuando sea posible
4. **Revisar logs** en consola del servidor después de acciones

## 🚀 Acceso Rápido

**Atajo visual**: El botón de admin tiene `animate-pulse` cuando está inactivo, lo que lo hace fácil de identificar en la barra lateral.

**Color distintivo**: Rojo intenso (#ef4444) que contrasta con el resto de la UI.

---

**Versión**: 1.0  
**Última actualización**: Noviembre 2025  
**Nivel de acceso requerido**: ADMIN (verificado por IP hash)

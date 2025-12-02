import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getDatabase,
  Database,
  ref,
  push,
  onValue,
  off,
  set,
  serverTimestamp,
  onDisconnect,
  connectDatabaseEmulator,
} from 'firebase/database';
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { User, Message } from '../types';

// Firebase configuration - usar variables de entorno
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  databaseURL:
    import.meta.env.VITE_FIREBASE_DATABASE_URL || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
    '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

let app: FirebaseApp | null = null;
let database: Database | null = null;

export const initFirebase = (): { app: FirebaseApp; database: Database } | null => {
  // Verificar si Firebase está configurado
  if (!firebaseConfig.databaseURL) {
    console.warn('Firebase no está configurado. El chat en tiempo real no funcionará.');
    return null;
  }

  if (!app) {
    try {
      app = initializeApp(firebaseConfig);
      database = getDatabase(app);
    } catch (error) {
      console.error('Error inicializando Firebase:', error);
      return null;
    }
  }

  return { app, database: database! };
};

export const sendMessage = async (
  channelId: string,
  message: Omit<Message, 'id' | 'timestamp'>,
  userId: string
): Promise<void> => {
  const firebase = initFirebase();
  if (!firebase) {
    throw new Error('Firebase no está configurado');
  }

  const messagesRef = ref(firebase.database, `channels/${channelId}/messages`);
  const newMessageRef = push(messagesRef);

  await set(newMessageRef, {
    ...message,
    userId,
    timestamp: serverTimestamp(),
    id: newMessageRef.key,
  });
};

export const subscribeToMessages = (
  channelId: string,
  callback: (messages: Message[]) => void
): (() => void) => {
  const firebase = initFirebase();
  if (!firebase) {
    // Si Firebase no está configurado, retornar función vacía
    return () => {};
  }

  const messagesRef = ref(firebase.database, `channels/${channelId}/messages`);

  const unsubscribe = onValue(
    messagesRef,
    snapshot => {
      const data = snapshot.val();
      if (!data) {
        callback([]);
        return;
      }

      const messages: Message[] = Object.entries(data)
        .map(([id, msg]: [string, any]) => {
          // Firebase serverTimestamp() retorna un objeto, no un número directamente
          // Si es un objeto, usar la fecha actual, si es un número, convertir a Date
          let timestamp: Date;
          if (msg.timestamp) {
            if (typeof msg.timestamp === 'object' && msg.timestamp !== null) {
              // Es un objeto de Firebase, usar fecha actual
              timestamp = new Date();
            } else if (typeof msg.timestamp === 'number') {
              timestamp = new Date(msg.timestamp);
            } else {
              timestamp = new Date(msg.timestamp);
            }
          } else {
            timestamp = new Date();
          }

          return {
            id,
            userId: msg.userId,
            content: msg.content,
            timestamp,
            channelId,
            attachments: msg.attachments || [],
          };
        })
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

      callback(messages);
    },
    error => {
      console.error('Error suscribiéndose a mensajes:', error);
    }
  );

  return () => {
    off(messagesRef);
    unsubscribe();
  };
};

export const setUserOnline = (user: User): (() => void) => {
  const firebase = initFirebase();
  if (!firebase) {
    return () => {};
  }

  const userRef = ref(firebase.database, `users/${user.id}`);

  // Establecer usuario como online
  set(userRef, {
    ...user,
    lastSeen: serverTimestamp(),
    isOnline: true,
  });

  // Cuando el usuario se desconecta, marcarlo como offline
  onDisconnect(userRef).update({
    isOnline: false,
    lastSeen: serverTimestamp(),
  });

  // Retornar función para desconectar manualmente
  return () => {
    set(userRef, {
      ...user,
      isOnline: false,
      lastSeen: serverTimestamp(),
    });
  };
};

export const subscribeToOnlineUsers = (callback: (users: User[]) => void): (() => void) => {
  const firebase = initFirebase();
  if (!firebase) {
    return () => {};
  }

  const usersRef = ref(firebase.database, 'users');

  const unsubscribe = onValue(
    usersRef,
    snapshot => {
      const data = snapshot.val();
      if (!data) {
        callback([]);
        return;
      }

      const users: User[] = Object.entries(data)
        .map(([id, userData]: [string, any]) => ({
          id,
          username: userData.username || 'Usuario',
          avatar: userData.avatar || '',
          status: userData.isOnline ? userData.status || 'online' : 'offline',
          color: userData.color || '#3ba55c',
          isBot: userData.isBot || false,
        }))
        .filter(user => user.id !== 'bot'); // Excluir bot de la lista de usuarios online

      callback(users);
    },
    error => {
      console.error('Error suscribiéndose a usuarios online:', error);
    }
  );

  return () => {
    off(usersRef);
    unsubscribe();
  };
};

export const isFirebaseConfigured = (): boolean => {
  return !!firebaseConfig.databaseURL;
};

// Storage para imágenes de perfil
export const uploadProfileImage = async (file: File, userId: string): Promise<string> => {
  const firebase = initFirebase();
  if (!firebase) {
    throw new Error('Firebase no está configurado');
  }

  const storage = getStorage(firebase.app);
  const fileExtension = file.name.split('.').pop();
  const fileName = `avatars/${userId}_${Date.now()}.${fileExtension}`;
  const imageRef = storageRef(storage, fileName);

  // Subir imagen
  await uploadBytes(imageRef, file);

  // Obtener URL de descarga
  const downloadURL = await getDownloadURL(imageRef);
  return downloadURL;
};

export const deleteProfileImage = async (imageUrl: string): Promise<void> => {
  const firebase = initFirebase();
  if (!firebase) {
    throw new Error('Firebase no está configurado');
  }

  try {
    const storage = getStorage(firebase.app);
    const imageRef = storageRef(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Error eliminando imagen:', error);
  }
};

// Validar imagen antes de subir
export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Formato no permitido. Usa JPG, PNG, GIF o WEBP.' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'La imagen no puede superar 5MB.' };
  }

  return { valid: true };
};

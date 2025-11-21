/**
 * Servicio de procesamiento de imágenes local
 * Convierte imágenes a Base64 y las almacena localmente
 * No requiere API externa ni configuración
 */

export interface UploadResult {
  url: string;
}

/**
 * Convierte una imagen a Base64 optimizado
 */
const compressAndConvertImage = (file: File, maxWidth: number = 400): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        // Crear canvas para redimensionar
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Redimensionar si es muy grande
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('No se pudo crear el contexto del canvas'));
          return;
        }
        
        // Dibujar imagen redimensionada
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convertir a Base64 con compresión JPEG (calidad 0.8)
        const base64 = canvas.toDataURL('image/jpeg', 0.8);
        resolve(base64);
      };
      
      img.onerror = () => reject(new Error('Error cargando la imagen'));
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => reject(new Error('Error leyendo el archivo'));
    reader.readAsDataURL(file);
  });
};

/**
 * Procesa y "sube" la imagen (convierte a Base64)
 */
export const uploadImageToImgur = async (file: File): Promise<UploadResult> => {
  try {
    // Convertir imagen a Base64 optimizado
    const base64 = await compressAndConvertImage(file, 400);
    
    // Guardar en localStorage como backup (opcional)
    try {
      const avatarKey = `avatar_${Date.now()}`;
      localStorage.setItem(avatarKey, base64);
    } catch (e) {
      // Si localStorage está lleno, solo usar la Base64 en memoria
      console.warn('No se pudo guardar en localStorage, pero la imagen funcionará igual');
    }
    
    return {
      url: base64
    };
  } catch (error) {
    console.error('Error procesando imagen:', error);
    throw error;
  }
};

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

export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

import React, { useState, useCallback, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

const ErrorBoundary: React.FC<Props> = ({ children, fallback }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [errorInfo, setErrorInfo] = useState<React.ErrorInfo | null>(null);

  const handleReset = useCallback(() => {
    setHasError(false);
    setError(null);
    setErrorInfo(null);
  }, []);

  // This is a simplified version - in a real app you'd want proper error boundary logic
  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setHasError(true);
      setError(event.error);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="flex-1 flex items-center justify-center bg-discord-chat p-8">
        <div className="max-w-md w-full bg-[#2b2d31] rounded-lg p-6 border border-red-500/50">
          <div className="flex items-center mb-4">
            <AlertCircle className="text-red-500 mr-3" size={24} />
            <h2 className="text-xl font-bold text-white">Algo salió mal</h2>
          </div>
          <p className="text-discord-text-muted mb-4">
            Ocurrió un error inesperado. Por favor, intenta recargar la página.
          </p>
          {process.env.NODE_ENV === 'development' && error && (
            <details className="mb-4">
              <summary className="text-sm text-discord-text-muted cursor-pointer mb-2">
                Detalles del error (solo en desarrollo)
              </summary>
              <pre className="text-xs bg-[#1e1f22] p-3 rounded overflow-auto max-h-40 text-red-400">
                {error.toString()}
                {errorInfo?.componentStack}
              </pre>
            </details>
          )}
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center px-4 py-2 bg-discord-blurple hover:bg-[#4752c4] text-white rounded-md transition-colors font-medium"
          >
            <RefreshCw size={16} className="mr-2" />
            Intentar de nuevo
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full mt-2 px-4 py-2 bg-discord-hover hover:bg-[#3f4147] text-discord-text-normal rounded-md transition-colors font-medium"
          >
            Recargar página
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;

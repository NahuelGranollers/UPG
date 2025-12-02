import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return <>{this.props.fallback}</>;
      }

      return (
        <div className="flex-1 flex items-center justify-center bg-discord-chat p-8 h-full w-full">
          <div className="max-w-md w-full bg-[#2b2d31] rounded-lg p-6 border border-red-500/50 shadow-xl">
            <div className="flex items-center mb-4">
              <AlertCircle className="text-red-500 mr-3" size={24} />
              <h2 className="text-xl font-bold text-white">Algo salió mal</h2>
            </div>
            <p className="text-discord-text-muted mb-4">
              Ocurrió un error inesperado. Por favor, intenta recargar la página.
            </p>
            {import.meta.env.DEV && this.state.error && (
              <details className="mb-4">
                <summary className="text-sm text-discord-text-muted cursor-pointer mb-2 hover:text-discord-text-normal transition-colors">
                  Detalles del error (solo en desarrollo)
                </summary>
                <pre className="text-xs bg-[#1e1f22] p-3 rounded overflow-auto max-h-40 text-red-400 font-mono">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            <div className="flex flex-col gap-2">
              <button
                onClick={this.handleReset}
                className="w-full flex items-center justify-center px-4 py-2 bg-discord-blurple hover:bg-[#4752c4] text-white rounded-md transition-colors font-medium"
              >
                <RefreshCw size={16} className="mr-2" />
                Intentar de nuevo
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full px-4 py-2 bg-discord-hover hover:bg-[#3f4147] text-discord-text-normal rounded-md transition-colors font-medium"
              >
                Recargar página
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

import React, { useCallback } from 'react';
import { User } from '../types';
import { Send } from 'lucide-react';

interface MessageInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  showMentionSuggestions: boolean;
  mentionSuggestions: User[];
  selectedSuggestionIndex: number;
  setSelectedSuggestionIndex: (index: number) => void;
  completeMention: (user: { username: string }) => void;
  renderInputPreview: (text: string) => React.ReactNode;
  currentChannel: { id: string; name: string };
  onInputChange?: (value: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  inputText,
  setInputText,
  handleSendMessage,
  inputRef,
  showMentionSuggestions,
  mentionSuggestions,
  selectedSuggestionIndex,
  setSelectedSuggestionIndex,
  completeMention,
  renderInputPreview,
  currentChannel,
  onInputChange,
}) => {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputText(value);
      // Llamar al callback para manejar menciones
      if (onInputChange) {
        onInputChange(value);
      }
    },
    [setInputText, onInputChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (showMentionSuggestions && mentionSuggestions.length > 0) {
        if (e.key === 'ArrowDown') {
          setSelectedSuggestionIndex(i => (i + 1) % mentionSuggestions.length);
          e.preventDefault();
        } else if (e.key === 'ArrowUp') {
          setSelectedSuggestionIndex(
            i => (i - 1 + mentionSuggestions.length) % mentionSuggestions.length
          );
          e.preventDefault();
        } else if (e.key === 'Tab' || e.key === 'Enter') {
          e.preventDefault();
          completeMention(mentionSuggestions[selectedSuggestionIndex]);
        } else if (e.key === 'Escape') {
          // Esto debería manejarse en ChatInterface
        }
      }
    },
    [
      showMentionSuggestions,
      mentionSuggestions,
      selectedSuggestionIndex,
      setSelectedSuggestionIndex,
      completeMention,
    ]
  );

  return (
    <div className="safe-bottom">
      {/* Sugerencias de menciones */}
      {showMentionSuggestions && mentionSuggestions.length > 0 && (
        <div
          className="glass mb-2 max-h-60 overflow-y-auto custom-scrollbar animate-slide-in"
          role="listbox"
          aria-label="Sugerencias de mención"
        >
          <div className="p-2">
            <div className="px-3 py-1 text-xs font-semibold text-muted uppercase">
              Mencionar
            </div>
            {/* Renderizar sugerencias */}
            {mentionSuggestions.map((user, globalIndex) => (
              <button
                key={user.id}
                onClick={() => completeMention(user)}
                onMouseEnter={() => setSelectedSuggestionIndex(globalIndex)}
                className={`w-full px-3 py-2 flex items-center gap-3 rounded-md transition-all duration-150 ${
                  globalIndex === selectedSuggestionIndex
                    ? 'bg-accent scale-[1.02] shadow-lg'
                    : 'hover:bg-surface-hover hover:scale-[1.01]'
                }`}
                aria-label={`Mencionar a ${user.username}`}
                role="option"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 bg-surface">
                  <img
                    src={user.avatar || ''}
                    alt={user.username}
                    className="w-full h-full object-cover"
                  />
                  {'online' in user && (
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-bg ${
                        user.online ? 'bg-success' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-white flex items-center gap-2">
                    {user.username}
                    {user.id === 'bot' && (
                      <span className="text-[10px] bg-accent px-1.5 py-0.5 rounded uppercase">
                        Bot
                      </span>
                    )}
                  </div>
                  {'online' in user && (
                    <div className="text-xs text-muted">
                      {user.online ? '🟢 En línea' : '⚫ Desconectado'}
                    </div>
                  )}
                </div>
                <div className="text-xs text-muted">
                  {globalIndex === selectedSuggestionIndex && (
                    <span className="bg-surface px-2 py-0.5 rounded">Tab</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-end gap-3">
        <div
          className={`flex-1 glass px-4 py-3 flex items-center gap-2 transition-all duration-150 relative ${
            showMentionSuggestions ? 'ring-2 ring-accent' : ''
          }`}
        >
          <form onSubmit={handleSendMessage} className="flex-1 flex items-center relative">
            {/* Preview layer */}
            <div
              className="absolute left-4 right-10 inset-y-0 flex items-center pointer-events-none overflow-hidden whitespace-pre text-sm text-secondary"
              aria-hidden="true"
            >
              {renderInputPreview(inputText)}
            </div>
            {/* Input real */}
            <label htmlFor="message-input" className="sr-only">Escribir mensaje</label>
            <input
              ref={inputRef}
              type="text"
              id="message-input"
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={`Enviar mensaje a #${currentChannel.name}`}
              className="input relative z-10 bg-transparent w-full outline-none min-h-[28px] pl-1 pr-2 transition-all"
              aria-label="Escribir mensaje"
              maxLength={2000}
              autoComplete="off"
            />
          </form>
        </div>

        {/* Botón de envío */}
        <button
          onClick={(e) => handleSendMessage(e)}
          className="btn btn-primary touch-target mb-[1px] active:scale-95 transition-transform"
          aria-label="Enviar mensaje"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;

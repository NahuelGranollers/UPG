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
    <div
      className="px-4 sm:px-6 lg:px-8 pt-3 shrink-0 relative"
      style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
    >
      {/* Sugerencias de menciones */}
      {showMentionSuggestions && mentionSuggestions.length > 0 && (
        <div className="mention-suggestions z-top" role="listbox" aria-label="Sugerencias de mención">
          <div className="py-2">
            <div className="px-3 py-1 text-xs font-semibold text-discord-text-muted uppercase">
              Mencionar
            </div>
            {/* Renderizar sugerencias */}
            {mentionSuggestions.map((user, globalIndex) => (
              <button
                key={user.id}
                onClick={() => completeMention(user)}
                onMouseEnter={() => setSelectedSuggestionIndex(globalIndex)}
                className={`w-full px-3 py-2 flex items-center gap-3 transition-all duration-150 ${globalIndex === selectedSuggestionIndex ? 'bg-discord-blurple scale-[1.02] shadow-lg' : 'hover:bg-[#36373d] hover:scale-[1.01]'}`}
                aria-label={`Mencionar a ${user.username}`}
                role="option"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 bg-gray-600">
                  <img
                    src={user.avatar || ''}
                    alt={user.username}
                    className="w-full h-full object-cover"
                  />
                  {'online' in user && (
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#2f3136] ${user.online ? 'bg-green-500' : 'bg-gray-500'}`}
                    />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-white flex items-center gap-2">
                    {user.username}
                    {user.id === 'bot' && (
                      <span className="text-[10px] bg-discord-blurple px-1.5 py-0.5 rounded uppercase">
                        Bot
                      </span>
                    )}
                  </div>
                  {'online' in user && (
                    <div className="text-xs text-discord-text-muted">
                      {user.online ? '🟢 En línea' : '⚫ Desconectado'}
                    </div>
                  )}
                </div>
                <div className="text-xs text-discord-text-muted">
                  {globalIndex === selectedSuggestionIndex && (
                    <span className="bg-gray-700 px-2 py-0.5 rounded">Tab</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div
        className={`bg-[var(--chat-bg)] rounded-lg px-3 sm:px-4 lg:px-6 py-3 flex items-center gap-3 transition-all duration-150 relative z-base ${showMentionSuggestions ? 'ring-1 ring-[var(--blurple)]' : ''}`}
      >
        <form onSubmit={handleSendMessage} className="flex-1 flex items-center relative">
          {/* Preview layer */}
          <div
            className="absolute left-4 right-14 inset-y-0 flex items-center pointer-events-none overflow-hidden whitespace-pre text-sm sm:text-sm text-discord-text-normal"
            aria-hidden="true"
          >
            {renderInputPreview(inputText)}
          </div>
          {/* Input real */}
          <input
            ref={inputRef}
            type="text"
            id="message-input"
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={`Enviar mensaje a #${currentChannel.name}`}
            className={`relative z-10 bg-[var(--chat-bg)] w-full text-sm sm:text-sm outline-none min-h-[44px] pl-4 pr-14 transition-all text-[var(--text)] placeholder-[var(--muted)] rounded`}
            aria-label="Escribir mensaje"
            maxLength={2000}
            autoComplete="off"
          />
          {/* Botón de envío a la derecha */}
          <button
            type="submit"
            aria-label="Enviar mensaje"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent p-2 rounded hover:bg-[rgba(255,255,255,0.03)]"
          >
            <Send size={16} className="text-[var(--blurple)]" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;

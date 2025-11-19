// Simple message formatter for Discord-like messages
export const formatMessage = (content: string): string => {
  let formatted = content;

  // Escape HTML to prevent XSS (already sanitized, but double-check)
  formatted = formatted
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Convert URLs to links
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  formatted = formatted.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-discord-blurple hover:underline">$1</a>');

  // Convert @mentions (simple pattern)
  const mentionRegex = /@(\w+)/g;
  formatted = formatted.replace(mentionRegex, '<span class="text-discord-blurple font-medium">@$1</span>');

  // Convert **bold** to <strong>
  formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>');

  // Convert *italic* to <em>
  formatted = formatted.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');

  // Convert `code` to <code>
  formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-[#1e1f22] px-1 py-0.5 rounded text-sm font-mono">$1</code>');

  return formatted;
};

// Extract plain text from formatted message (for accessibility)
export const getPlainText = (content: string): string => {
  return content
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/@(\w+)/g, '@$1');
};


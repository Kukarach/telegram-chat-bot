import type { Message } from './index';

export interface ChatProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  onRestart: () => void;
  isTyping?: boolean;
  messageCount?: number;
  finished?: boolean;
} 
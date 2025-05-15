export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  messageCount: number;
  finished: boolean;
}

export interface BotPersonality {
  id: string;
  name: string;
  description: string;
  initialMessage: string;
}

export interface ApiResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
} 
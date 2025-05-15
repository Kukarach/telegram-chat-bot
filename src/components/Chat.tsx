import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';
import { useLocale } from '../hooks/useLocale';
import { MAX_MESSAGES } from '../constants';
import type { Message as MessageType } from '../types';

// Если вы добавите файл avatar.jpg в папку assets, раскомментируйте следующую строку:
// import avatarImage from '../assets/avatar.jpg';

// Определение типа ChatProps локально, если импорт не работает
interface ChatProps {
  messages: MessageType[];
  onSendMessage: (text: string) => void;
  onRestart: () => void;
  isTyping?: boolean;
  messageCount?: number;
  finished?: boolean;
}

const Chat: React.FC<ChatProps> = ({ 
  messages, 
  onSendMessage, 
  onRestart, 
  isTyping = false,
  messageCount = 0,
  finished = false
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLocale();
  
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!isScrolled) {
      scrollToBottom();
    }
  }, [messages, isTyping, isScrolled]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
    setIsScrolled(!isAtBottom);
  };

  return (
    <div className="bg-gradient-to-br from-[#ff6699] via-[#ff3366] to-[#ff4d79] min-h-screen flex flex-col animate-gradient bg-[length:300%_300%]">
      <header className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl p-4 m-4 rounded-2xl flex items-center">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold text-lg mr-3 shadow-lg overflow-hidden">
            <div className="w-full h-full bg-[#ff3366] flex items-center justify-center">
              <img 
                src="https://placekitten.com/200/200" 
                alt="Аватар Алисы" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  // Если изображение не загрузилось, показываем букву
                  const parent = e.currentTarget.parentNode;
                  if (parent) {
                    parent.textContent = 'А';
                  }
                }}
              />
            </div>
          </div>
          <div>
            <h1 className="text-xl text-white font-bold">{t('chatTitle')}</h1>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse mr-2"></div>
              <span className="text-xs text-white/70">{t('online')}</span>
            </div>
          </div>
        </div>
      </header>

      <div 
        className="flex-1 overflow-y-auto p-4 backdrop-blur-sm"
        onScroll={handleScroll}
      >
        <div className="space-y-4 pb-4 max-w-3xl mx-auto">
          {messages.map((message: MessageType, index: number) => (
            <Message
              key={message.id}
              message={message}
              isLastMessage={index === messages.length - 1}
              isLastOfLimit={messageCount >= MAX_MESSAGES - 1}
            />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl p-4 m-4 rounded-2xl">
        <MessageInput 
          onSendMessage={onSendMessage} 
          disabled={finished}
        />
      </div>
    </div>
  );
};

export default Chat; 
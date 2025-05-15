import React from 'react';
import type { Message as MessageType } from '../types';
import { FINAL_BUTTON_TEXT, FINAL_URL } from '../constants';

interface MessageProps {
  message: MessageType;
  isLastMessage?: boolean;
  isLastOfLimit?: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isLastMessage = false, isLastOfLimit = false }) => {
  const isBot = message.sender === 'bot';
  
  // Проверяем, есть ли в сообщении аудио-метка (можно использовать для демонстрации аудио-компонента)
  const hasAudio = message.text.includes('[audio]');
  
  // Определяем, нужно ли показать кнопку (для последнего сообщения от бота при достижении лимита)
  const showButton = isBot && isLastMessage && isLastOfLimit;
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-3 animate-fade-in`}>
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xs mr-2 flex-shrink-0 self-end mb-1">
          
        </div>
      )}
      <div 
        className={`
          ${isBot ? 'bg-white/20' : 'bg-[#ff3366]'} 
          backdrop-blur-md 
          border ${isBot ? 'border-white/10' : 'border-[#ff3366]/20'}
          p-3.5 
          ${isBot ? 'rounded-t-2xl rounded-br-2xl rounded-bl-sm' : 'rounded-t-2xl rounded-bl-2xl rounded-br-sm'} 
          shadow-lg 
          max-w-[75%]
          ${isLastMessage ? 'animate-pulse-once' : ''}
        `}
      >
        {hasAudio ? (
          <div className="audio-message">
            <div className="play-button">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 2L11 7L3 12V2Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="waveform">
              <svg width="100%" height="100%" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="10" width="3" height="4" rx="1" fill="currentColor" opacity="0.3" />
                <rect x="5" y="8" width="3" height="8" rx="1" fill="currentColor" opacity="0.4" />
                <rect x="10" y="6" width="3" height="12" rx="1" fill="currentColor" opacity="0.5" />
                <rect x="15" y="4" width="3" height="16" rx="1" fill="currentColor" opacity="0.6" />
                <rect x="20" y="2" width="3" height="20" rx="1" fill="currentColor" opacity="0.7" />
                <rect x="25" y="6" width="3" height="12" rx="1" fill="currentColor" opacity="0.8" />
                <rect x="30" y="8" width="3" height="8" rx="1" fill="currentColor" opacity="0.7" />
                <rect x="35" y="10" width="3" height="4" rx="1" fill="currentColor" opacity="0.6" />
                <rect x="40" y="7" width="3" height="10" rx="1" fill="currentColor" opacity="0.5" />
                <rect x="45" y="9" width="3" height="6" rx="1" fill="currentColor" opacity="0.4" />
                <rect x="50" y="8" width="3" height="8" rx="1" fill="currentColor" opacity="0.5" />
                <rect x="55" y="6" width="3" height="12" rx="1" fill="currentColor" opacity="0.6" />
                <rect x="60" y="4" width="3" height="16" rx="1" fill="currentColor" opacity="0.7" />
                <rect x="65" y="2" width="3" height="20" rx="1" fill="currentColor" opacity="0.8" />
                <rect x="70" y="4" width="3" height="16" rx="1" fill="currentColor" opacity="0.7" />
                <rect x="75" y="6" width="3" height="12" rx="1" fill="currentColor" opacity="0.6" />
                <rect x="80" y="8" width="3" height="8" rx="1" fill="currentColor" opacity="0.5" />
                <rect x="85" y="10" width="3" height="4" rx="1" fill="currentColor" opacity="0.4" />
                <rect x="90" y="9" width="3" height="6" rx="1" fill="currentColor" opacity="0.3" />
                <rect x="95" y="11" width="3" height="2" rx="1" fill="currentColor" opacity="0.2" />
              </svg>
            </div>
            <div>02:30</div>
          </div>
        ) : (
          <div className="text-base text-white">
            {message.text}
            
            {showButton && (
              <div className="mt-3">
                <a 
                  href={FINAL_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="message-button"
                >
                  {FINAL_BUTTON_TEXT}
                </a>
              </div>
            )}
          </div>
        )}
        <div className="text-xs text-white/70 text-right mt-1">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      {!isBot && (
        <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white font-bold text-xs ml-2 flex-shrink-0 self-end mb-1">
          Я
        </div>
      )}
    </div>
  );
};

export default Message; 
import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useLocale } from '../hooks/useLocale';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

// Звук отправки сообщения (короткая версия base64)
const sendSoundEffect = () => {
  try {
    const audio = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI2LjEwMQAAAAAAAAAAAAAA//tQwAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAABEAABwpgAICwsOEBIVFRgaHR0gIiUlKCosLzEzNjY5Oz5AQ0VISEtNUFJVV1pcXWBiZWdqbG9xcnV4e31/goSHiYyOkZOWmJqdoKKlp6qsrrG0trm7vcDCxcfKzM/R09bY293g4uXn6u3v8fT29/r9//8AAAAATGF2YzU4LjQ2AAAAAAAAAAAAAAAAJAUhAAAAAAAAcKbrO5NEAAAAAAD/+7DEAAAJCAFN9AAAIUGIK38zsgAgAAGYlAAAAIAmJb/MCIAA');
    audio.volume = 0.3; // Уменьшим громкость звука
    audio.play();
  } catch (error) {
    console.error('Не удалось воспроизвести звук:', error);
  }
};

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const { t } = useLocale();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      sendSoundEffect();
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full relative">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={t('messagePlaceholder')}
        className="
          w-full 
          bg-white/10 
          border 
          border-white/20 
          rounded-full 
          py-3 
          px-5 
          pr-16 
          text-white 
          placeholder-white/50 
          focus:outline-none 
          focus:ring-2 
          focus:ring-[#ff3366]/50 
          focus:border-transparent
          backdrop-blur-md
          transition-all
          duration-200
        "
        disabled={disabled}
        autoFocus
      />
      <button
        type="submit"
        disabled={!message.trim() || disabled}
        className={`
          absolute 
          right-1 
          bg-gradient-to-r 
          from-[#ff3366] 
          to-[#ff4d79] 
          text-white 
          p-2.5 
          rounded-full 
          hover:shadow-lg 
          hover:scale-105 
          active:scale-95 
          transition-all 
          duration-200
          ${!message.trim() || disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </form>
  );
};

export default MessageInput;
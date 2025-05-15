import React from 'react';
import { useLocale } from '../hooks/useLocale';

const TypingIndicator: React.FC = () => {
  const { t } = useLocale();
  
  return (
    <div className="flex items-center bubble-bot my-2 animate-fade-in inline-flex p-2">
      <div className="mr-2 text-sm opacity-80">{t('typingIndicator')}</div>
      <div className="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default TypingIndicator;

 
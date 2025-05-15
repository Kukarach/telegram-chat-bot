import React, { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import './index.css';
import Chat from './components/Chat';
import { useChat } from './hooks/useChat';
import analytics from './services/analytics';
import { BOT_PERSONALITIES } from './constants';

// Объявление интерфейса для Telegram WebApp
declare global {
  interface Window {
    Telegram?: {
      WebApp?: any;
    };
  }
}

// Расширяем типы для WebApp
declare module '@twa-dev/sdk' {
  interface WebApp {
    setViewportHeight?: (height: string) => void;
  }
}

function App() {
  // Берём дефолтную личность (например, игривая)
  const defaultPersonality = BOT_PERSONALITIES[0];
  const { state, personality, initChat, sendMessage, resetChat } = useChat();
  const [isReady, setIsReady] = useState(false);
  const [initialized, setInitialized] = useState(false);
  
  // Обработка ошибок для предотвращения белого экрана
  const handleError = (err: unknown) => {
    console.error('Ошибка приложения:', err);
    setIsReady(true);
  };

  useEffect(() => {
    try {
      // Проверяем, что приложение загружено в Telegram или отладочном режиме
      if (window.Telegram?.WebApp) {
        WebApp.ready();
        WebApp.expand();
        WebApp.BackButton.hide();
        
        // Пытаемся скрыть верхнюю панель Telegram
        if (WebApp.isExpanded) {
          try {
            // Устанавливаем режим отображения без верхней панели
            WebApp.setHeaderColor('#ff3366'); // Цвет фона шапки
            WebApp.setBackgroundColor('#41046F'); // Цвет фона приложения
            
            // Для WebApp 6.0+
            if (typeof (WebApp as any).setViewportHeight === 'function') {
              (WebApp as any).setViewportHeight('100vh');
            }
            
            console.log('WebApp header settings applied');
          } catch (headerError) {
            console.warn('Error setting WebApp header:', headerError);
          }
        }
      }
      
      // Инициализируем аналитику, если она доступна
      try {
        analytics.initAnalytics();
        analytics.logEvent('app_opened');
      } catch (analyticError) {
        console.warn('Ошибка инициализации аналитики:', analyticError);
      }
      
      setIsReady(true);
    } catch (error) {
      handleError(error);
    }
  }, []);

  // Инициализация чата с дефолтной личностью один раз
  useEffect(() => {
    if (isReady && !initialized) {
      try {
        initChat(defaultPersonality);
        setInitialized(true);
      } catch (error) {
        handleError(error);
      }
    }
  }, [isReady, initialized, initChat, defaultPersonality]);

  // Показываем экран загрузки, пока приложение не готово
  if (!isReady || !personality) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-[#ff6699] via-[#ff3366] to-[#ff4d79] flex items-center justify-center">
        <div className="animate-pulse text-white text-lg">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <Chat
        messages={state.messages}
        onSendMessage={(text: string) => {
          try {
            sendMessage(text);
            analytics.logEvent('message_sent', { messageCount: state.messageCount + 1 });
          } catch (err) {
            console.error('Ошибка отправки сообщения:', err);
          }
        }}
        isTyping={state.isTyping}
        messageCount={state.messageCount}
        finished={state.finished}
        onRestart={() => {
          try {
            resetChat();
            analytics.logEvent('chat_reset');
            // После сброса — снова инициализируем чат с дефолтной личностью
            setTimeout(() => initChat(defaultPersonality), 100);
          } catch (err) {
            console.error('Ошибка сброса чата:', err);
          }
        }}
      />
    </div>
  );
}

export default App;

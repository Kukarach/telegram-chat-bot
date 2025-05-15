import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getBotResponse } from '../services/api';
import { BOT_PERSONALITIES, FINAL_MESSAGE_TEMPLATE, MAX_MESSAGES } from '../constants';
import type { Message, ChatState, BotPersonality } from '../types';

/**
 * Хук для управления состоянием чата
 */
export const useChat = () => {
  const [personality, setPersonality] = useState<BotPersonality | null>(null);
  const [state, setState] = useState<ChatState>({
    messages: [],
    isTyping: false,
    messageCount: 0,
    finished: false
  });

  // Инициализация чата с выбранной личностью
  const initChat = useCallback((selectedPersonality: BotPersonality) => {
    setPersonality(selectedPersonality);
    
    // Добавляем начальное сообщение от бота
    const initialMessage: Message = {
      id: uuidv4(),
      text: selectedPersonality.initialMessage,
      sender: 'bot',
      timestamp: Date.now()
    };

    setState({
      messages: [initialMessage],
      isTyping: false,
      messageCount: 1,
      finished: false
    });
  }, []);

  // Отправка сообщения
  const sendMessage = useCallback(async (text: string) => {
    if (!personality || state.finished) return;
    
    // Если достигнут лимит сообщений, ничего не делаем
    if (state.messageCount >= MAX_MESSAGES * 2 - 1) {
      return;
    }
    
    // Создаем сообщение пользователя
    const userMessage: Message = {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: Date.now()
    };
    
    // Обновляем состояние: добавляем сообщение пользователя и устанавливаем isTyping=true
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true,
      messageCount: prev.messageCount + 1
    }));

    try {
      // Проверяем, не последнее ли это сообщение
      const isLastMessage = state.messageCount >= MAX_MESSAGES * 2 - 3;
      
      let botResponse: string;
      
      if (isLastMessage) {
        // Для последнего сообщения используем специальный шаблон
        botResponse = FINAL_MESSAGE_TEMPLATE;
      } else {
        // Получаем ответ от ИИ
        botResponse = await getBotResponse([...state.messages, userMessage], personality.id);
      }

      // Создаем сообщение от бота
      const botMessage: Message = {
        id: uuidv4(),
        text: botResponse,
        sender: 'bot',
        timestamp: Date.now()
      };

      // Обновляем состояние: добавляем ответ бота, снимаем флаг isTyping
      // и проверяем, закончен ли диалог
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isTyping: false,
        messageCount: prev.messageCount + 1,
        finished: isLastMessage || prev.messageCount >= MAX_MESSAGES * 2 - 2
      }));
    } catch (error) {
      // В случае ошибки снимаем флаг isTyping
      setState(prev => ({
        ...prev,
        isTyping: false
      }));
      console.error('Error in sendMessage:', error);
    }
  }, [personality, state]);

  // Сброс чата
  const resetChat = useCallback(() => {
    setState({
      messages: [],
      isTyping: false,
      messageCount: 0,
      finished: false
    });
    setPersonality(null);
  }, []);

  return {
    state,
    personality,
    personalities: BOT_PERSONALITIES,
    initChat,
    sendMessage,
    resetChat
  };
}; 
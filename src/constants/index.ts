import type { BotPersonality } from '../types';

export const MODEL_NAME = 'gpt-4o-mini';
export const MAX_MESSAGES = 999;
export const MAX_MESSAGES = 6;
export const WELCOME_MESSAGE = 'Привет! Я Алиса, твой виртуальный собеседник. Рада познакомиться! 👋';

export const BOT_PERSONALITIES: BotPersonality[] = [
  {
    id: 'playful',
    name: 'Игривая',
    description: 'Любит флиртовать и подшучивать',
    initialMessage: 'Привет! Как твой день? 😊'
  },
  {
    id: 'mysterious',
    name: 'Загадочная',
    description: 'Говорит намеками и любит интриговать',
    initialMessage: 'Привет... Знаешь, я как раз думала о ком-то вроде тебя. Интересное совпадение, не находишь? 🌙'
  },
  {
    id: 'dominant',
    name: 'Доминирующая',
    description: 'Уверенная в себе и решительная',
    initialMessage: 'Привет! Рада, что ты нашел время написать мне. Расскажи о себе, я хочу узнать тебя поближе... 💋'
  },
];

export const FINAL_MESSAGE_TEMPLATE = 'Мне нравится наше общение! Хочешь продолжить приватную беседу?';
export const FINAL_BUTTON_TEXT = 'Продолжить в привате';
export const FINAL_URL = 'https://t.me/your_bot_username';

export const LOCALES = {
  ru: {
    selectPersonality: 'Выберите характер Алисы',
    sendButton: 'Отправить',
    typingIndicator: 'печатает...',
    newChatButton: 'Новый чат',
    messagePlaceholder: 'Напишите сообщение...',
    limitReached: 'Лимит сообщений достигнут',
    errorMessage: 'Произошла ошибка при отправке сообщения. Попробуйте еще раз.',
    chatTitle: 'Алиса',
    online: 'В сети',
    newChat: 'Новый чат'
  },
  en: {
    selectPersonality: 'Choose Alice\'s personality',
    sendButton: 'Send',
    typingIndicator: 'typing...',
    newChatButton: 'New chat',
    messagePlaceholder: 'Type a message...',
    limitReached: 'Message limit reached',
    errorMessage: 'An error occurred while sending the message. Please try again.',
    chatTitle: 'Alice',
    online: 'Online',
    newChat: 'New chat'
  }
}; 
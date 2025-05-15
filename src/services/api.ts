import axios from 'axios';
import { MODEL_NAME } from '../constants';
import type { Message, ApiResponse } from '../types';

// URL для проксирования через Cloudflare Worker
const PROXY_API_URL = '/api/v1/chat/completions';

// API ключ (если указан в env)
const API_KEY = import.meta.env.VITE_API_KEY || 'c331113151e2481e9b88c2822eaae562';

/**
 * Получает ответ от нейросети
 */
export const getBotResponse = async (messages: Message[], personality: string): Promise<string> => {
  try {
    const history = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));

    // Добавляем инструкцию системного промпта
    const systemPrompt = {
      role: 'system',
      content: `Ты - AI-девушка с ${personality} характером, ведущая легкий, игривый и слегка развратный диалог. 
      Твои ответы должны быть краткими (1-2 предложения максимум), с намеками, двусмысленностями и легким флиртом. 
      Избегай откровенного сексуального контента, но создавай интимную атмосферу через намеки. 
      Используй эмоджи. Не используй #хэштеги. Отвечай на русском языке.`
    };

    // ВСЕГДА используем только реальный API запрос
    console.log('Sending API request to real API endpoint');
    
    // Заголовки запроса
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    };
    
    console.log('Using API key for authentication:', API_KEY.substring(0, 4) + '...');
    
    try {
      const response = await axios.post<ApiResponse>(
        PROXY_API_URL,
        {
          model: MODEL_NAME,
          messages: [systemPrompt, ...history],
          temperature: 0.7,
          max_tokens: 150
        },
        {
          headers,
          timeout: 15000 // Увеличиваем таймаут до 15 секунд
        }
      );

      console.log('Successful API response received');
      return response.data.choices[0].message.content.trim();
    } catch (apiError) {
      console.error('Error with API call:', apiError);
      // Если API не ответил, возвращаем запасной ответ
      return "Прости, я отвлеклась... Что ты говорил? Моя связь с API была потеряна 😳";
    }
  } catch (error) {
    console.error('Error in getBotResponse:', error);
    return "Кажется, что-то пошло не так с API соединением, но мне всё равно интересно продолжить наш разговор... 💫";
  }
}; 
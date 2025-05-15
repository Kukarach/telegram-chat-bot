/**
 * Telegram Mini App - AI Chat Worker
 * 
 * Worker для обслуживания статических файлов приложения
 * и прокси запросов к AI API.
 */

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

/**
 * Обработчик запросов
 */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Обработка OPTIONS запросов для CORS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    // Обработка запросов к API
    if (path.startsWith('/api/')) {
      try {
        // Убираем "/api" из пути и перенаправляем на API сервер
        const targetUrl = 'https://api.aimlapi.com' + path.replace('/api', '');
        
        // Клонируем запрос с новым URL
        const apiRequest = new Request(targetUrl, {
          method: request.method,
          headers: request.headers,
          body: request.body
        });
        
        // Добавляем API ключ если нужно
        apiRequest.headers.set('Authorization', 'Bearer c331113151e2481e9b88c2822eaae562');
        
        // Делаем запрос к API
        const apiResponse = await fetch(apiRequest);
        
        // Создаем ответ с правильными CORS заголовками
        const response = new Response(apiResponse.body, apiResponse);
        
        // Добавляем CORS заголовки
        Object.keys(corsHeaders).forEach(key => {
          response.headers.set(key, corsHeaders[key]);
        });
        
        return response;
      } catch (error) {
        console.error('Error proxying API request:', error);
        return new Response(JSON.stringify({ error: 'Failed to proxy API request' }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        });
      }
    }

    // Для всех остальных запросов обслуживаем статические файлы
    try {
      // При использовании [site] в wrangler.toml, env.__STATIC_CONTENT становится доступным
      // Пытаемся получить запрошенный файл
      const response = await env.__STATIC_CONTENT.fetch(request);
      
      // Если файл найден, возвращаем его
      if (response.status < 400) {
        return response;
      }
      
      // Если файл не найден (404), возвращаем index.html для SPA-роутинга
      const indexRequest = new Request(`${url.origin}/index.html`, request);
      return await env.__STATIC_CONTENT.fetch(indexRequest);
      
    } catch (error) {
      console.error('Error serving static content:', error);
      
      // В случае ошибки возвращаем index.html
      try {
        const indexRequest = new Request(`${url.origin}/index.html`, request);
        return await env.__STATIC_CONTENT.fetch(indexRequest);
      } catch (finalError) {
        // Если вообще ничего не работает, возвращаем базовую HTML страницу
        return new Response(
          `<!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Алиса - ИИ чат-бот</title>
              <style>
                body { 
                  font-family: sans-serif; 
                  text-align: center; 
                  background: linear-gradient(135deg, #ff6699, #ff3366, #ff4d79);
                  color: white;
                  height: 100vh;
                  margin: 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                .container { padding: 20px; }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Алиса - ИИ чат-бот</h1>
                <p>Произошла ошибка при загрузке приложения</p>
              </div>
            </body>
          </html>`,
          {
            headers: {
              'Content-Type': 'text/html;charset=UTF-8',
            },
            status: 500,
          }
        );
      }
    }
  },
};
/**
 * Заглушка для Firebase Analytics
 * В будущем здесь будет реализована интеграция с Firebase Analytics
 */

/**
 * Логирует событие в аналитику
 */
export const logEvent = (eventName: string, eventParams?: Record<string, any>): void => {
  // В продакшн-версии здесь будет вызов Firebase Analytics
  console.log(`[Analytics Event]: ${eventName}`, eventParams || {});
};

/**
 * Устанавливает свойства пользователя
 */
export const setUserProperties = (properties: Record<string, any>): void => {
  // В продакшн-версии здесь будет вызов Firebase Analytics
  console.log('[Analytics User Properties]:', properties);
};

/**
 * Инициализирует аналитику
 */
export const initAnalytics = (): void => {
  console.log('[Analytics] Initialized (stub)');
};

// Экспортируем аналитику как объект сервиса
export default {
  logEvent,
  setUserProperties,
  initAnalytics
}; 
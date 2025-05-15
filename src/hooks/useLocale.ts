import { useEffect, useState } from 'react';
import { LOCALES } from '../constants';

type LocaleKeys = keyof typeof LOCALES.ru;
type LocaleLanguage = 'ru' | 'en';

/**
 * Хук для получения текстов на выбранном языке
 */
export const useLocale = () => {
  const [language, setLanguage] = useState<LocaleLanguage>('ru');
  
  useEffect(() => {
    // Определение языка браузера
    try {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'en') {
        setLanguage('en');
      }
      // По умолчанию используется русский
    } catch (error) {
      console.error('Ошибка определения языка:', error);
    }
  }, []);

  const t = (key: LocaleKeys): string => {
    try {
      return LOCALES[language]?.[key] || LOCALES.ru[key] || key;
    } catch (error) {
      console.error('Ошибка локализации:', error);
      return key;
    }
  };

  return { t, setLanguage, language };
}; 
import React, { useState } from 'react';
import type { BotPersonality } from '../types';
import { useLocale } from '../hooks/useLocale';

const icons: Record<string, JSX.Element> = {
  playful: (
    <svg className="personality-icon" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="#FF2D75" opacity="0.15"/><path d="M20 30c4.418 0 8-2.239 8-5" stroke="#FF2D75" strokeWidth="2" strokeLinecap="round"/><ellipse cx="14.5" cy="18" rx="2.5" ry="3" fill="#FF2D75"/><ellipse cx="25.5" cy="18" rx="2.5" ry="3" fill="#FF2D75"/><path d="M16 24c1.5 1.5 6.5 1.5 8 0" stroke="#FF2D75" strokeWidth="1.5" strokeLinecap="round"/><circle cx="28" cy="14" r="1" fill="#FF2D75"/><circle cx="12" cy="14" r="1" fill="#FF2D75"/></svg>
  ),
  mysterious: (
    <svg className="personality-icon" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="#FF2D75" opacity="0.10"/><path d="M28 28c-6 2-12-2-12-8 0-4.418 3.582-8 8-8 3.866 0 7 3.134 7 7 0 2.761-2.239 5-5 5z" fill="#FF2D75"/><path d="M18 18c0-2.209 1.791-4 4-4" stroke="#FF2D75" strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
  dominant: (
    <svg className="personality-icon" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="#FF2D75" opacity="0.10"/><path d="M12 28l8-16 8 16H12z" fill="#FF2D75"/><path d="M20 12v8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
};

interface PersonalitySelectorProps {
  personalities: BotPersonality[];
  onSelect: (personality: BotPersonality) => void;
}

const PersonalitySelector: React.FC<PersonalitySelectorProps> = ({ personalities, onSelect }) => {
  const { t } = useLocale();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex items-center justify-center h-full w-full bg-tg-gradient">
      <div className="w-full max-w-md px-2">
        <div className="text-center mb-8 mt-8">
          <h2 className="text-2xl font-montserrat font-bold mb-2 text-tg-text-main drop-shadow">{t('selectPersonality')}</h2>
          <p className="text-tg-text-secondary text-base opacity-80">Выберите характер вашей виртуальной собеседницы</p>
        </div>
        <div className="flex flex-col gap-6 mb-8">
          {personalities.map((personality) => (
            <button
              key={personality.id}
              className={`glass-card flex flex-col items-center py-6 px-4 cursor-pointer border transition-all duration-200 ${selected === personality.id ? 'ring-2 ring-tg-accent scale-105' : ''}`}
              onClick={() => setSelected(personality.id)}
              type="button"
            >
              {icons[personality.id]}
              <span className="font-montserrat text-lg font-bold mb-1 text-tg-text-main drop-shadow">{personality.name}</span>
              <span className="text-tg-text-secondary text-sm opacity-80 text-center">{personality.description}</span>
            </button>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            className="neon-btn w-full max-w-xs"
            disabled={!selected}
            onClick={() => {
              if (selected) {
                const p = personalities.find(p => p.id === selected);
                if (p) onSelect(p);
              }
            }}
          >
            Начать
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalitySelector; 
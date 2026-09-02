import React from 'react';
import { Volume2 } from 'lucide-react';
import { speechService } from '../../services/speechService';

interface OlChikiTextProps {
  text: string;
  romanized?: string;
  fontSize?: 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  showPronunciation?: boolean;
  enableAudio?: boolean;
  className?: string;
  onAudioPlay?: () => void;
}

export const OlChikiText: React.FC<OlChikiTextProps> = ({
  text,
  romanized,
  fontSize = 'xl',
  showPronunciation = true,
  enableAudio = true,
  className = '',
  onAudioPlay
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) return;
    setIsPlaying(true);
    onAudioPlay?.();
    try {
      await speechService.speak(text, romanized, 'sat_Olck');
    } finally {
      setIsPlaying(false);
    }
  };

  const fontClasses = {
    base: 'text-base font-medium',
    lg: 'text-lg font-semibold',
    xl: 'text-xl font-bold',
    '2xl': 'text-2xl font-bold leading-relaxed',
    '3xl': 'text-3xl font-extrabold leading-relaxed'
  };

  return (
    <div className={`inline-flex flex-col gap-0.5 ${className}`}>
      <div className="flex items-center gap-2">
        <span
          className={`font-olchiki text-gov-navy tracking-wide select-all ${fontClasses[fontSize]}`}
          lang="sat"
        >
          {text}
        </span>
        {enableAudio && (
          <button
            type="button"
            onClick={handlePlay}
            disabled={isPlaying}
            aria-label={`Listen to Santali pronunciation for ${romanized || text}`}
            title="Listen to Santali pronunciation"
            className={`p-1 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gov-navy ${
              isPlaying
                ? 'bg-gov-green-subtle text-gov-green animate-pulse'
                : 'text-gov-slate-muted hover:text-gov-navy hover:bg-gov-navy-subtle'
            }`}
          >
            <Volume2 className={fontSize === '2xl' || fontSize === '3xl' ? 'w-5 h-5' : 'w-4 h-4'} />
          </button>
        )}
      </div>
      {showPronunciation && romanized && (
        <span className="text-xs text-gov-slate-muted italic tracking-normal font-sans">
          Phonetic: &ldquo;{romanized}&rdquo;
        </span>
      )}
    </div>
  );
};

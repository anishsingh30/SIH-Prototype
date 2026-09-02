import React, { useState } from 'react';
import { VocabularyItem } from '../../types/curriculum';
import { Volume2, ChevronLeft, ChevronRight, Shuffle, Eye, EyeOff } from 'lucide-react';
import { speechService } from '../../services/speechService';

interface FlashcardDeckProps {
  vocabulary: VocabularyItem[];
  unitTitle: string;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ vocabulary, unitTitle }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [studyMode, setStudyMode] = useState<'santali_to_hindi' | 'hindi_to_santali'>('santali_to_hindi');

  if (vocabulary.length === 0) {
    return (
      <div className="bg-white border rounded-lg p-6 text-center text-gov-slate-muted">
        No vocabulary cards available for this unit.
      </div>
    );
  }

  const currentCard = vocabulary[currentIndex];

  const handleNext = () => {
    setIsRevealed(false);
    setCurrentIndex((prev) => (prev + 1) % vocabulary.length);
  };

  const handlePrev = () => {
    setIsRevealed(false);
    setCurrentIndex((prev) => (prev - 1 + vocabulary.length) % vocabulary.length);
  };

  const handleShuffle = () => {
    setIsRevealed(false);
    setCurrentIndex(Math.floor(Math.random() * vocabulary.length));
  };

  const handleToggleMode = () => {
    setIsRevealed(false);
    setStudyMode((prev) => (prev === 'santali_to_hindi' ? 'hindi_to_santali' : 'santali_to_hindi'));
  };

  const handlePlaySantaliAudio = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    try {
      await speechService.speak(
        currentCard.santaliOlChiki,
        currentCard.romanizedPronunciation,
        'sat_Olck'
      );
    } finally {
      setIsPlaying(false);
    }
  };

  const handlePlayHindiAudio = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    try {
      await speechService.speak(
        currentCard.hindiWord,
        currentCard.hindiWord,
        'hin_Deva'
      );
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <div className="bg-white border border-gov-slate-border/80 rounded-lg p-4 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gov-slate-border/60 pb-3 w-full">
        <div>
          <h2 className="text-sm font-bold text-gov-navy uppercase tracking-wider">
            FLN Classroom Flashcards ({currentIndex + 1} of {vocabulary.length})
          </h2>
          <p className="text-xs text-gov-slate-muted">Unit Vocabulary: {unitTitle}</p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Vice-Versa Mode Toggle */}
          <button
            type="button"
            onClick={handleToggleMode}
            aria-label={`Toggle flashcard study mode. Current mode: ${studyMode === 'santali_to_hindi' ? 'Santali to Hindi' : 'Hindi to Santali'}`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-md border transition-all bg-gov-saffron-light/20 text-gov-navy border-gov-saffron/40 hover:bg-gov-saffron-light/40 shadow-xs focus:ring-2 focus:ring-amber-400"
            title="Toggle card front and reveal direction (Vice-Versa)"
          >
            <span className="text-gov-saffron-dark font-black">⇄ Mode:</span>
            <span className="truncate">
              {studyMode === 'santali_to_hindi'
                ? 'Santali ➔ Hindi'
                : 'Hindi ➔ Santali'}
            </span>
          </button>

          <button
            type="button"
            onClick={handleShuffle}
            aria-label="Shuffle flashcards randomly"
            className="inline-flex items-center justify-center gap-1 text-xs text-gov-slate-muted hover:text-gov-navy px-2.5 py-1.5 rounded border border-gov-slate-border hover:bg-gov-slate-bg focus:ring-2 focus:ring-gov-navy"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Shuffle</span>
          </button>
        </div>
      </div>

      {/* The Flashcard */}
      <div className="max-w-md mx-auto">
        <div className="border-2 border-gov-navy/20 rounded-xl p-6 bg-gradient-to-b from-white to-gov-slate-bg shadow-sm text-center space-y-4">
          <div className="flex items-center justify-between text-xs text-gov-slate-muted">
            <span className="font-semibold uppercase tracking-wider bg-gov-navy-subtle text-gov-navy px-2 py-0.5 rounded text-[10px]">
              {currentCard.category}
            </span>
            <span className="text-[10px] font-bold text-gov-slate-muted uppercase">
              {studyMode === 'santali_to_hindi' ? 'Card Front: Ol Chiki' : 'Card Front: Hindi (Vice-Versa)'}
            </span>
            <span>Card #{currentIndex + 1}</span>
          </div>

          {/* Card Front Content */}
          {studyMode === 'santali_to_hindi' ? (
            /* Front: Santali Ol Chiki */
            <div className="space-y-3 py-2">
              <div>
                <div className="font-olchiki text-3xl font-bold text-gov-navy tracking-wide mb-1">
                  {currentCard.santaliOlChiki}
                </div>
                <div className="text-xs text-gov-slate-muted italic font-sans">
                  Phonetic: &ldquo;{currentCard.romanizedPronunciation}&rdquo;
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handlePlaySantaliAudio}
                  disabled={isPlaying}
                  aria-label={`Play Santali pronunciation for ${currentCard.romanizedPronunciation}`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all focus:ring-2 focus:ring-gov-navy ${
                    isPlaying
                      ? 'bg-gov-green text-white animate-pulse'
                      : 'bg-gov-navy-subtle text-gov-navy hover:bg-gov-navy hover:text-white'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isPlaying ? 'Playing...' : 'Pronounce in Santali'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Front: Hindi (Vice-Versa) */
            <div className="space-y-3 py-2">
              <div>
                <div className="text-2xl font-bold text-gov-navy mb-1">
                  {currentCard.hindiWord}
                </div>
                <div className="text-xs text-gov-slate-muted">
                  Meaning: {currentCard.englishMeaning}
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handlePlayHindiAudio}
                  disabled={isPlaying}
                  aria-label={`Listen to Hindi pronunciation for ${currentCard.hindiWord}`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all focus:ring-2 focus:ring-gov-navy ${
                    isPlaying
                      ? 'bg-gov-green text-white animate-pulse'
                      : 'bg-gov-saffron-light/30 text-gov-navy hover:bg-gov-navy hover:text-white'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isPlaying ? 'Playing...' : 'Listen in Hindi'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Reveal Meaning Section (Back of Card) */}
          <div className="pt-3 border-t border-gov-slate-border/50">
            {isRevealed ? (
              <div className="space-y-2 animate-fadeIn">
                {studyMode === 'santali_to_hindi' ? (
                  /* Back: Hindi Meaning & Usage */
                  <>
                    <div className="text-lg font-bold text-gov-navy">
                      {currentCard.hindiWord}
                    </div>
                    <div className="text-xs text-gov-slate-muted">
                      English Meaning: {currentCard.englishMeaning}
                    </div>
                    {currentCard.exampleSentenceHindi && (
                      <div className="text-xs text-gov-slate bg-gov-slate-bg p-2 rounded mt-2 text-left">
                        <div className="font-semibold text-gov-slate-muted text-[10px] uppercase">
                          Classroom Usage:
                        </div>
                        <div>{currentCard.exampleSentenceHindi}</div>
                        <div className="font-olchiki text-gov-navy font-medium mt-0.5">
                          {currentCard.exampleSentenceSantali}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  /* Back: Santali Ol Chiki & Audio (Vice-Versa) */
                  <>
                    <div className="font-olchiki text-2xl font-bold text-gov-navy">
                      {currentCard.santaliOlChiki}
                    </div>
                    <div className="text-xs text-gov-slate-muted italic font-sans">
                      Phonetic: &ldquo;{currentCard.romanizedPronunciation}&rdquo;
                    </div>
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={handlePlaySantaliAudio}
                        disabled={isPlaying}
                        aria-label={`Play Santali pronunciation for ${currentCard.romanizedPronunciation}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-gov-navy text-white text-[11px] font-bold focus:ring-2 focus:ring-gov-navy"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Hear Santali Audio</span>
                      </button>
                    </div>
                    {currentCard.exampleSentenceSantali && (
                      <div className="text-xs text-gov-slate bg-gov-slate-bg p-2 rounded mt-2 text-left">
                        <div className="font-semibold text-gov-slate-muted text-[10px] uppercase">
                          Santali Sentence:
                        </div>
                        <div className="font-olchiki text-gov-navy font-bold">
                          {currentCard.exampleSentenceSantali}
                        </div>
                        <div className="text-gov-slate-muted mt-0.5">
                          {currentCard.exampleSentenceHindi}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsRevealed(true)}
                aria-label="Reveal the back of this flashcard"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gov-slate-muted hover:text-gov-navy py-1 focus:ring-2 focus:ring-gov-navy rounded"
              >
                <Eye className="w-4 h-4 text-gov-saffron" />
                <span>
                  {studyMode === 'santali_to_hindi'
                    ? 'Tap to reveal Hindi meaning & example'
                    : 'Tap to reveal Santali (Ol Chiki) script & audio'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-4">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Go to previous flashcard"
            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded border border-gov-slate-border text-gov-slate hover:bg-gov-slate-bg focus:ring-2 focus:ring-gov-navy"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={() => setIsRevealed(!isRevealed)}
            aria-label={isRevealed ? 'Hide back of card' : 'Reveal back of card'}
            className="text-xs text-gov-slate-muted hover:text-gov-slate flex items-center gap-1 font-semibold focus:ring-2 focus:ring-gov-navy rounded px-2 py-1"
          >
            {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{isRevealed ? 'Hide Back' : 'Reveal Back'}</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Go to next flashcard"
            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded bg-gov-navy text-white hover:bg-gov-navy-light focus:ring-2 focus:ring-gov-navy"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

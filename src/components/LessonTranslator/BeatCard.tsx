import React from 'react';
import { TeachingBeat } from '../../types/curriculum';
import { NipunBadge } from '../Common/NipunBadge';
import { OlChikiText } from '../Common/OlChikiText';
import { Flag, Play, HelpCircle, CheckCircle2, BookOpen, Lightbulb } from 'lucide-react';
import { speechService } from '../../services/speechService';

interface BeatCardProps {
  beat: TeachingBeat;
  onFlagCorrection: (beat: TeachingBeat) => void;
  isActive?: boolean;
}

export const BeatCard: React.FC<BeatCardProps> = ({
  beat,
  onFlagCorrection,
  isActive = false
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = React.useState(false);

  const getBeatBadge = (type: TeachingBeat['beatType']) => {
    switch (type) {
      case 'instruction':
        return {
          label: 'निर्देश (Instruction)',
          color: 'bg-blue-50 text-blue-800 border-blue-200',
          icon: <BookOpen className="w-3.5 h-3.5" />
        };
      case 'example':
        return {
          label: 'उदाहरण (Example)',
          color: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: <Lightbulb className="w-3.5 h-3.5" />
        };
      case 'question':
        return {
          label: 'शिक्षक प्रश्न (Question Prompt)',
          color: 'bg-purple-50 text-purple-800 border-purple-200',
          icon: <HelpCircle className="w-3.5 h-3.5" />
        };
      case 'expected_response':
        return {
          label: 'छात्र उत्तर (Expected Response)',
          color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          icon: <CheckCircle2 className="w-3.5 h-3.5" />
        };
    }
  };

  const badge = getBeatBadge(beat.beatType);

  const handlePlayAudio = async () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    try {
      await speechService.speak(beat.santaliOlChiki, beat.romanizedPronunciation, 'sat_Olck');
    } finally {
      setIsPlayingAudio(false);
    }
  };

  return (
    <div
      className={`bg-white border rounded-lg transition-all shadow-sm ${
        isActive
          ? 'border-gov-navy shadow-md ring-1 ring-gov-navy/20'
          : 'border-gov-slate-border/80 hover:border-gov-slate-muted'
      }`}
    >
      {/* Beat Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-gov-slate-bg/80 border-b border-gov-slate-border/60 rounded-t-lg text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gov-slate bg-white px-2 py-0.5 rounded border border-gov-slate-border text-[11px]">
            Beat #{beat.beatIndex}
          </span>
          <span
            className={`inline-flex items-center gap-1 font-semibold px-2.5 py-0.5 rounded border ${badge.color}`}
          >
            {badge.icon}
            {badge.label}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <NipunBadge code={beat.nipunOutcomeCode} description={beat.nipunOutcomeDescription} />
          <button
            type="button"
            onClick={() => onFlagCorrection(beat)}
            aria-label={`Flag translation or suggest correction for Beat ${beat.beatIndex}`}
            title="Flag translation or suggest local dialect variant"
            className="flex items-center gap-1 text-[11px] font-medium text-gov-slate-muted hover:text-gov-maroon px-2 py-0.5 rounded hover:bg-gov-maroon-subtle/50 transition-colors focus:outline-none focus:ring-1 focus:ring-gov-maroon"
          >
            <Flag className="w-3 h-3" />
            <span className="hidden sm:inline">Flag / Correct</span>
          </button>
        </div>
      </div>

      {/* Main Beat Content Body */}
      <div className="p-4 space-y-3.5">
        {/* Source Hindi */}
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-gov-slate-muted mb-0.5">
            Hindi Source (शिक्षक निर्देश)
          </div>
          <div className="text-base font-medium text-gov-navy leading-relaxed font-sans">
            {beat.hindiText}
          </div>
        </div>

        {/* Beat Translation Error Alert */}
        {beat.status === 'failed' && (
          <div className="bg-red-50 border border-red-300 rounded p-2 text-xs text-red-900 flex items-center justify-between">
            <span className="font-semibold">⚠ {beat.translationError || 'Translation requires teacher review'}</span>
            <button
              type="button"
              onClick={() => onFlagCorrection(beat)}
              className="text-red-800 underline font-bold hover:text-red-950"
            >
              Provide Translation
            </button>
          </div>
        )}

        {/* Translated Santali (Ol Chiki) */}
        <div className="bg-gov-navy-subtle/30 p-3 rounded-md border border-gov-navy/10">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gov-navy-light">
              Santali (Ol Chiki Script • ᱥᱟᱱᱛᱟᱲᱤ)
            </span>
            <button
              type="button"
              onClick={handlePlayAudio}
              disabled={isPlayingAudio}
              aria-label={`Play audio pronunciation for Beat ${beat.beatIndex}`}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gov-navy ${
                isPlayingAudio
                  ? 'bg-gov-green text-white animate-pulse'
                  : 'bg-gov-navy text-white hover:bg-gov-navy-light shadow-xs'
              }`}
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{isPlayingAudio ? 'Playing...' : 'Play Beat Audio'}</span>
            </button>
          </div>

          <OlChikiText
            text={beat.santaliOlChiki}
            romanized={beat.romanizedPronunciation}
            fontSize="xl"
            showPronunciation={true}
            enableAudio={false}
          />
        </div>

        {/* Pedagogical Instruction Note */}
        {beat.pedagogicalNote && (
          <div className="flex items-start gap-2 bg-amber-50/70 border border-amber-200/60 rounded px-3 py-2 text-xs text-amber-900">
            <span className="font-bold shrink-0">💡 कक्षा निर्देश (Pedagogy Tip):</span>
            <span>{beat.pedagogicalNote}</span>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { FLNUnit, TeachingBeat } from '../../types/curriculum';
import { LessonSelector } from './LessonSelector';
import { BeatCard } from './BeatCard';
import { PlayCircle, Target, Info, CheckSquare } from 'lucide-react';
import { speechService } from '../../services/speechService';

interface LessonTranslatorViewProps {
  units: FLNUnit[];
  activeUnit: FLNUnit;
  onSelectUnit: (unit: FLNUnit) => void;
  onFlagCorrection: (beat: TeachingBeat) => void;
  onOpenUpload?: () => void;
  onPromoteUnit?: (unitId: string) => void;
}

export const LessonTranslatorView: React.FC<LessonTranslatorViewProps> = ({
  units,
  activeUnit,
  onSelectUnit,
  onFlagCorrection,
  onOpenUpload,
  onPromoteUnit
}) => {
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [activeBeatIndex, setActiveBeatIndex] = useState<number | null>(null);

  const handlePlayFullLessonFlow = async () => {
    if (isPlayingAll) return;
    setIsPlayingAll(true);

    for (let i = 0; i < activeUnit.beats.length; i++) {
      const beat = activeUnit.beats[i];
      setActiveBeatIndex(beat.beatIndex);
      await speechService.speak(beat.santaliOlChiki, beat.romanizedPronunciation, 'sat_Olck');
      await new Promise((r) => setTimeout(r, 800)); // Classroom pause between beats
    }

    setActiveBeatIndex(null);
    setIsPlayingAll(false);
  };

  return (
    <div className="space-y-4">
      {/* Unit Selection Header */}
      <LessonSelector
        units={units}
        selectedUnitId={activeUnit.id}
        onSelectUnit={onSelectUnit}
        onOpenUpload={onOpenUpload}
      />

      {/* Draft Status Review Notice Banner */}
      {activeUnit.status === 'draft' ? (
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-3.5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-900">
          <div className="flex items-start gap-2.5">
            <span className="text-base leading-none text-amber-600 font-bold mt-0.5">⚠</span>
            <div>
              <div className="font-bold text-amber-950">
                Unreviewed Auto-Generated Module (Draft State)
              </div>
              <p className="text-amber-800 text-[11px] mt-0.5">
                This unit was generated from an uploaded workbook. Please inspect the Ol Chiki translations below. Once verified, promote it to classroom-ready.
              </p>
            </div>
          </div>

          {onPromoteUnit && (
            <button
              type="button"
              onClick={() => onPromoteUnit(activeUnit.id)}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-700 text-white font-bold hover:bg-emerald-800 transition-all shadow-xs text-xs"
            >
              <span>✓ Mark as Reviewed & Verified</span>
            </button>
          )}
        </div>
      ) : (
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg px-3.5 py-1.5 flex items-center justify-between text-[11px] text-emerald-900">
          <span className="flex items-center gap-1.5 font-semibold">
            <span className="text-emerald-700 font-bold">✓</span>
            <span>Classroom-Ready Module • Aligned with PALASH FLN Standards</span>
          </span>
          <span className="text-emerald-700 font-medium">
            {activeUnit.reviewedAt ? `Promoted on ${new Date(activeUnit.reviewedAt).toLocaleDateString()}` : 'Curated Dataset'}
          </span>
        </div>
      )}

      {/* Active Unit Meta Banner */}
      <div className="bg-white border border-gov-slate-border/80 rounded-lg p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-gov-slate-border/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-gov-navy text-white text-xs font-bold px-2 py-0.5 rounded">
                Unit {activeUnit.unitNumber}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gov-saffron-subtle text-gov-saffron-dark border border-gov-saffron/30">
                {activeUnit.domain}
              </span>
              <span className="text-xs text-gov-slate-muted">{activeUnit.gradeLevel}</span>
              {activeUnit.status === 'draft' ? (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  ⚠ Draft
                </span>
              ) : (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                  ✓ Verified
                </span>
              )}
            </div>
            <h1 className="text-lg font-bold text-gov-navy">
              {activeUnit.titleHindi} <span className="text-gov-slate-muted font-normal">|</span>{' '}
              <span className="font-olchiki text-gov-slate font-semibold">{activeUnit.titleSantali}</span>
            </h1>
            <p className="text-xs text-gov-slate-muted mt-0.5">{activeUnit.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePlayFullLessonFlow}
              disabled={isPlayingAll}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-bold transition-all ${
                isPlayingAll
                  ? 'bg-gov-green text-white animate-pulse'
                  : 'bg-gov-navy text-white hover:bg-gov-navy-light shadow-sm'
              }`}
            >
              <PlayCircle className="w-4 h-4" />
              <span>{isPlayingAll ? 'Playing Lesson Beats...' : 'Play Complete Lesson Flow'}</span>
            </button>
          </div>
        </div>

        {/* NIPUN Bharat Targeted Competencies Strip */}
        <div className="pt-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gov-slate mb-2">
            <Target className="w-3.5 h-3.5 text-gov-saffron" />
            <span>NIPUN Bharat Target Competencies for this Unit:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {activeUnit.targetNipunCompetencies.map((comp) => (
              <div
                key={comp.code}
                className="bg-gov-slate-bg p-2.5 rounded border border-gov-slate-border/60 text-xs"
              >
                <div className="font-bold text-gov-saffron-dark flex items-center gap-1 mb-1">
                  <CheckSquare className="w-3.5 h-3.5" />
                  {comp.code}
                </div>
                <div className="text-gov-slate text-[11px] leading-snug">{comp.descriptionHindi}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Beats Feed Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-gov-navy uppercase tracking-wider">
            Structured Teaching Beats ({activeUnit.beats.length} Steps)
          </h2>
          <span className="text-xs text-gov-slate-muted hidden sm:inline">
            (Instruction ➔ Example ➔ Prompt ➔ Student Response)
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gov-slate-muted">
          <Info className="w-3.5 h-3.5" />
          <span>Tap audio to pronounce in classroom</span>
        </div>
      </div>

      {/* Beats List */}
      <div className="space-y-3">
        {activeUnit.beats.map((beat) => (
          <BeatCard
            key={beat.id}
            beat={beat}
            isActive={activeBeatIndex === beat.beatIndex}
            onFlagCorrection={onFlagCorrection}
          />
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { FLNUnit } from '../../types/curriculum';
import { BookOpen, Hash, MessageSquare, Sparkles, Upload } from 'lucide-react';

interface LessonSelectorProps {
  units: FLNUnit[];
  selectedUnitId: string;
  onSelectUnit: (unit: FLNUnit) => void;
  onOpenUpload?: () => void;
}

export const LessonSelector: React.FC<LessonSelectorProps> = ({
  units,
  selectedUnitId,
  onSelectUnit,
  onOpenUpload
}) => {
  const getDomainIcon = (domain: string) => {
    switch (domain) {
      case 'Numeracy':
        return <Hash className="w-4 h-4" />;
      case 'Classroom Routine':
        return <BookOpen className="w-4 h-4" />;
      case 'Literacy':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white border border-gov-slate-border/80 rounded-lg p-3 sm:p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gov-slate-muted">
            PALASH FLN Curriculum Modules (Grade 1–2)
          </h2>
          <p className="text-xs text-gov-slate">Select a foundational unit to load classroom pedagogy flow</p>
        </div>

        <div className="flex items-center gap-2">
          {onOpenUpload && (
            <button
              type="button"
              onClick={onOpenUpload}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-gov-navy text-white text-xs font-bold hover:bg-gov-navy-light transition-all shadow-xs"
            >
              <Upload className="w-3.5 h-3.5 text-gov-saffron-light" />
              <span>Upload / Import Workbook PDF</span>
            </button>
          )}

          <span className="text-xs font-medium px-2 py-1 rounded bg-gov-navy-subtle text-gov-navy border border-gov-navy/20">
            {units.length} Units Available
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5">
        {units.map((unit) => {
          const isSelected = unit.id === selectedUnitId;
          return (
            <button
              key={unit.id}
              type="button"
              onClick={() => onSelectUnit(unit)}
              className={`text-left p-3 rounded-md border transition-all relative ${
                isSelected
                  ? 'border-gov-navy bg-gov-navy-subtle/50 ring-2 ring-gov-navy/20 shadow-sm'
                  : 'border-gov-slate-border hover:border-gov-slate-muted hover:bg-gov-slate-bg'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-gov-slate-muted mb-1.5">
                <span className="flex items-center gap-1 font-medium">
                  {getDomainIcon(unit.domain)}
                  {unit.domain}
                </span>
                <span className="bg-white px-1.5 py-0.5 rounded border text-[10px] font-semibold text-gov-slate">
                  {unit.gradeLevel}
                </span>
              </div>

              <div className="font-semibold text-sm text-gov-navy line-clamp-1 mb-0.5">
                Unit {unit.unitNumber}: {unit.titleHindi}
              </div>

              <div className="font-olchiki text-xs text-gov-slate-muted line-clamp-1 mb-1.5">
                {unit.titleSantali}
              </div>

              {/* Status Badge */}
              <div className="mb-2">
                {unit.status === 'draft' ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                    <span className="text-amber-600 font-black">⚠</span> Draft / Unreviewed
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <span className="text-emerald-600 font-bold">✓</span> Verified PALASH
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] text-gov-slate-muted pt-1.5 border-t border-gov-slate-border/50">
                <span>{unit.beats.length} Teaching Beats</span>
                <span className="text-gov-saffron-dark font-medium">{unit.targetNipunCompetencies[0]?.code}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

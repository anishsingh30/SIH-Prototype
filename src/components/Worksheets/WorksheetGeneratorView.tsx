import { useState } from 'react';
import { FLNUnit } from '../../types/curriculum';
import { MASTER_VOCABULARY } from '../../data/vocabData';
import { WorksheetView } from './WorksheetView';
import { FlashcardDeck } from './FlashcardDeck';
import { FileText, Layers } from 'lucide-react';

interface WorksheetGeneratorViewProps {
  activeUnit: FLNUnit;
  units: FLNUnit[];
  onSelectUnit: (unit: FLNUnit) => void;
}

export const WorksheetGeneratorView: React.FC<WorksheetGeneratorViewProps> = ({
  activeUnit,
  units,
  onSelectUnit
}) => {
  const [activeTab, setActiveTab] = useState<'worksheet' | 'flashcards'>('worksheet');

  // Filter master vocabulary for this unit or fallback to active unit vocabulary
  const unitVocab = activeUnit.keyVocabulary.length > 0
    ? activeUnit.keyVocabulary
    : MASTER_VOCABULARY.slice(0, 6);

  return (
    <div className="space-y-4">
      {/* View Switcher & Unit Header */}
      <div className="bg-white border border-gov-slate-border/80 rounded-lg p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full overflow-hidden">
        <div className="w-full sm:w-auto min-w-0">
          <h1 className="text-sm sm:text-base font-bold text-gov-navy">
            Classroom Pedagogy Resources Generator
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 mt-2 w-full">
            <span className="text-xs text-gov-slate-muted shrink-0 font-medium">Selected FLN Unit:</span>
            <div className="flex items-center gap-2 w-full sm:w-auto min-w-0">
              <select
                value={activeUnit.id}
                onChange={(e) => {
                  const found = units.find((u) => u.id === e.target.value);
                  if (found) onSelectUnit(found);
                }}
                className="bg-gov-navy-subtle text-gov-navy border border-gov-navy/20 rounded px-2.5 py-1.5 text-xs font-semibold focus:ring-1 focus:ring-gov-navy w-full sm:w-auto max-w-full truncate"
              >
                {units.map((u) => (
                  <option key={u.id} value={u.id}>
                    Unit {u.unitNumber}: {u.titleHindi} ({u.domain}) {u.status === 'draft' ? '— ⚠ Draft' : ''}
                  </option>
                ))}
              </select>
              {activeUnit.status === 'draft' && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 shrink-0">
                  ⚠ Draft
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-gov-slate-bg p-1 rounded-md border border-gov-slate-border w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab('worksheet')}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-bold transition-all ${
              activeTab === 'worksheet'
                ? 'bg-gov-navy text-white shadow-xs'
                : 'text-gov-slate-muted hover:text-gov-navy'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Printable Worksheet</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('flashcards')}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-bold transition-all ${
              activeTab === 'flashcards'
                ? 'bg-gov-navy text-white shadow-xs'
                : 'text-gov-slate-muted hover:text-gov-navy'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Flashcard Deck</span>
          </button>
        </div>
      </div>

      {/* Content Rendering */}
      {activeTab === 'worksheet' ? (
        <WorksheetView unit={activeUnit} />
      ) : (
        <FlashcardDeck
          vocabulary={unitVocab}
          unitTitle={`Unit ${activeUnit.unitNumber}: ${activeUnit.titleHindi}`}
        />
      )}
    </div>
  );
};

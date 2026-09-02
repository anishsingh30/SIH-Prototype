import React, { useState } from 'react';
import { TeacherCorrection } from '../../types/correction';
import { offlineSyncService } from '../../services/offlineSyncService';
import { X, Flag, CheckCircle2 } from 'lucide-react';

interface CorrectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceTextHindi: string;
  originalSantaliTranslation: string;
  unitId?: string;
  onCorrectionSaved: () => void;
}

export const CorrectionModal: React.FC<CorrectionModalProps> = ({
  isOpen,
  onClose,
  sourceTextHindi,
  originalSantaliTranslation,
  unitId,
  onCorrectionSaved
}) => {
  const [suggestedSantali, setSuggestedSantali] = useState(originalSantaliTranslation);
  const [suggestedRomanized, setSuggestedRomanized] = useState('');
  const [category, setCategory] = useState<TeacherCorrection['correctionCategory']>('dialect_variation');
  const [notes, setNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    offlineSyncService.addCorrection({
      sourceTextHindi,
      originalSantaliTranslation,
      suggestedSantaliTranslation: suggestedSantali,
      suggestedRomanized: suggestedRomanized || undefined,
      correctionCategory: category,
      teacherNotes: notes,
      unitId,
      schoolUdiseCode: '20040105602',
      districtCluster: 'Dumka-East CRC'
    });

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onCorrectionSaved();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-gov-navy-dark/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-lg w-full border border-gov-slate-border shadow-xl overflow-hidden animate-fadeIn">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gov-slate-bg border-b border-gov-slate-border">
          <div className="flex items-center gap-2">
            <Flag className="w-4 h-4 text-gov-maroon" />
            <h2 className="text-sm font-bold text-gov-navy">
              Flag Translation & Suggest Local Dialect
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gov-slate-muted hover:text-gov-navy p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        {isSaved ? (
          <div className="p-8 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-gov-green mx-auto" />
            <h3 className="text-base font-bold text-gov-navy">Correction Queued for CRC Sync</h3>
            <p className="text-xs text-gov-slate-muted">
              Stored in local offline queue. Will sync to Block Resource Centre when connectivity is available.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
            {/* Source Text Box */}
            <div className="space-y-1">
              <label className="font-bold text-gov-slate-muted uppercase text-[10px]">
                Source Hindi Classroom Prompt:
              </label>
              <div className="p-2.5 bg-gov-slate-bg rounded border text-gov-navy font-medium">
                {sourceTextHindi}
              </div>
            </div>

            {/* Original Santali Translation */}
            <div className="space-y-1">
              <label className="font-bold text-gov-slate-muted uppercase text-[10px]">
                Current Translation (Ol Chiki):
              </label>
              <div className="p-2.5 bg-gov-slate-bg rounded border font-olchiki text-base text-gov-navy">
                {originalSantaliTranslation}
              </div>
            </div>

            {/* Category Dropdown */}
            <div className="space-y-1">
              <label className="font-bold text-gov-slate-muted uppercase text-[10px]">
                Reason for Flag / Correction:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2 border border-gov-slate-border rounded bg-white text-gov-navy focus:ring-1 focus:ring-gov-navy"
              >
                <option value="dialect_variation">Local Regional / Dialect Variation (क्षेत्रीय भिन्नता)</option>
                <option value="grammar_error">Grammar / Particle Suffix Error (व्याकरण त्रुटि)</option>
                <option value="inappropriate_pedagogy">Not Pedagogy-Appropriate for Grade 1 (कक्षा स्तर हेतु उपयुक्त नहीं)</option>
                <option value="spelling_olchiki">Ol Chiki Script / Spelling Issue (वर्तनी सुधार)</option>
              </select>
            </div>

            {/* Suggested Santali Ol Chiki */}
            <div className="space-y-1">
              <label className="font-bold text-gov-slate-muted uppercase text-[10px]">
                Teacher Suggested Santali Text (Ol Chiki or Romanized):
              </label>
              <input
                type="text"
                value={suggestedSantali}
                onChange={(e) => setSuggestedSantali(e.target.value)}
                placeholder="Enter corrected Santali phrase..."
                required
                className="w-full p-2 border border-gov-slate-border rounded text-gov-navy font-olchiki text-sm focus:ring-1 focus:ring-gov-navy"
              />
            </div>

            {/* Suggested Romanized */}
            <div className="space-y-1">
              <label className="font-bold text-gov-slate-muted uppercase text-[10px]">
                Phonetic Guide / Transliteration (Optional):
              </label>
              <input
                type="text"
                value={suggestedRomanized}
                onChange={(e) => setSuggestedRomanized(e.target.value)}
                placeholder="e.g. Apnarag machi re durub pe"
                className="w-full p-2 border border-gov-slate-border rounded text-gov-navy focus:ring-1 focus:ring-gov-navy"
              />
            </div>

            {/* Teacher Notes */}
            <div className="space-y-1">
              <label className="font-bold text-gov-slate-muted uppercase text-[10px]">
                Pedagogical Reason / Classroom Context Note:
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Why is this change necessary for students in your cluster?"
                className="w-full p-2 border border-gov-slate-border rounded text-gov-navy focus:ring-1 focus:ring-gov-navy"
              />
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-gov-slate-border">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded border border-gov-slate-border text-gov-slate hover:bg-gov-slate-bg font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-gov-navy text-white hover:bg-gov-navy-light font-semibold shadow-xs"
              >
                Queue Correction for CRC
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

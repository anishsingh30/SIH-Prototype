import React, { useState, useRef } from 'react';
import { FLNUnit } from '../../types/curriculum';
import { workbookParserService } from '../../services/workbookParserService';
import { X, Upload, FileText, CheckCircle2, Sparkles, AlertCircle, Loader2, BookOpen } from 'lucide-react';

interface UploadWorkbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnitCreated: (newUnit: FLNUnit) => void;
}

const SAMPLE_TEXTBOOK_CHAPTERS = [
  {
    title: 'PALASH Grade 1: गणित पाठ ३ (संख्या व वस्तुएँ)',
    grade: 'Grade 1' as const,
    domain: 'Numeracy' as const,
    sourceLang: 'hin_Deva' as const,
    text: `पाठ ३: वस्तुओं की गिनती
आज हम एक से पाँच तक वस्तुएं गिनना सीखेंगे।
देखो, मेज पर तीन पेंसिल रखी हैं: एक, दो, तीन।
इस डब्बे में कितने पत्ते हैं? गिनकर बताओ।
यहाँ चार पत्ते हैं।
सब बच्चे अपनी स्लेट पर संख्या लिखो।`
  },
  {
    title: 'PALASH Grade 1: वर्ग निर्देश एवं दिनचर्या',
    grade: 'Grade 1' as const,
    domain: 'Classroom Routine' as const,
    sourceLang: 'hin_Deva' as const,
    text: `कक्षा संचालन: प्रातः कालीन निर्देश
सब बच्चे सीधी कतार में खड़े हो जाओ।
अपनी गणित की किताब का पृष्ठ संख्या ४ खोलो।
सब लोग शांत हो जाओ और मेरी बात ध्यान से सुनो।
क्या सभी बच्चों के पास स्लेट और चॉक है?
हाँ शिक्षक जी, हमारे पास है।`
  },
  {
    title: 'PALASH Santali: ᱥᱮᱪᱮᱫ ᱯᱟᱲᱦᱟᱣ (Santali ➔ Hindi Vice-Versa)',
    grade: 'Grade 1' as const,
    domain: 'Literacy' as const,
    sourceLang: 'sat_Olck' as const,
    text: `ᱯᱟᱲᱦᱟᱣ: ᱟᱵᱚᱣᱟᱜ ᱤᱥᱠᱩᱞ
ᱡᱚᱛᱚ ᱜᱤᱫᱽᱨᱟᱹ ᱡᱚᱦᱟᱨ ᱢᱮᱛᱟᱠᱚ ᱢᱮ᱾
ᱟᱯᱱᱟᱨᱟᱜ ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡᱽ ᱯᱮ᱾
ᱱᱚᱸᱰᱮ ᱯᱮᱭᱟ ᱯᱮᱱᱥᱤᱞ ᱢᱮᱱᱟᱜ-ᱟ᱾
ᱟᱵᱚ ᱢᱮᱫ ᱛᱮᱵᱚᱱ ᱧᱮᱞᱟ᱾`
  }
];

export const UploadWorkbookModal: React.FC<UploadWorkbookModalProps> = ({
  isOpen,
  onClose,
  onUnitCreated
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [customText, setCustomText] = useState('');
  const [unitTitle, setUnitTitle] = useState('');
  const [sourceLang, setSourceLang] = useState<'hin_Deva' | 'sat_Olck'>('hin_Deva');
  const [selectedDomain, setSelectedDomain] = useState<'Numeracy' | 'Literacy' | 'Classroom Routine' | 'Storytelling'>('Numeracy');
  const [selectedGrade, setSelectedGrade] = useState<'Grade 1' | 'Grade 2' | 'Balvatika (Pre-primary)'>('Grade 1');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressStep, setProgressStep] = useState('');
  const [progressPercent, setProgressPercent] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setUnitTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      setError(null);
    }
  };

  const handleSelectSample = (sample: typeof SAMPLE_TEXTBOOK_CHAPTERS[0]) => {
    setCustomText(sample.text);
    setUnitTitle(sample.title);
    setSelectedDomain(sample.domain);
    setSelectedGrade(sample.grade);
    setSourceLang(sample.sourceLang);
    setSelectedFile(null);
    setError(null);
  };

  const handleProcessWorkbook = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    let textToParse = customText;

    if (selectedFile) {
      try {
        setIsProcessing(true);
        setProgressStep('Reading workbook file...');
        setProgressPercent(10);
        textToParse = await workbookParserService.extractTextFromFile(selectedFile);
      } catch (err: any) {
        setIsProcessing(false);
        setError(`Failed to read file: ${err?.message || 'Unknown error'}`);
        return;
      }
    }

    if (!textToParse.trim()) {
      setError('Please upload a PDF/text file or select a sample chapter.');
      setIsProcessing(false);
      return;
    }

    try {
      setIsProcessing(true);
      const parsedUnit = await workbookParserService.parseTextIntoUnit(
        textToParse,
        {
          titleHindi: unitTitle || 'अपलोड किया गया पाठ',
          titleEnglish: unitTitle || 'Imported Lesson Unit',
          gradeLevel: selectedGrade,
          domain: selectedDomain,
          sourceLang
        },
        (step, percent) => {
          setProgressStep(step);
          setProgressPercent(percent);
        }
      );

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsProcessing(false);
        onUnitCreated(parsedUnit);
        onClose();
      }, 1000);
    } catch (err: any) {
      setIsProcessing(false);
      setError(`Processing failed: ${err?.message || 'Could not parse workbook'}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-gov-navy-dark/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-xl w-full border border-gov-slate-border shadow-2xl overflow-hidden animate-fadeIn max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gov-navy text-white border-b border-gov-navy-dark">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-gov-saffron-light" />
            <div>
              <h2 className="text-sm font-bold">
                Import & Digitize Workbook / Textbook PDF
              </h2>
              <p className="text-[11px] text-slate-300">
                Upload Hindi chapters to auto-generate bilingual beats, worksheets & flashcards
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close workbook upload modal"
            className="text-white/80 hover:text-white p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {isSuccess ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-gov-green mx-auto animate-bounce" />
              <h3 className="text-base font-bold text-gov-navy">Workbook Successfully Processed!</h3>
              <p className="text-xs text-gov-slate-muted">
                Bilingual teaching beats, worksheets, and flashcards have been created and added to your active lesson curriculum.
              </p>
            </div>
          ) : (
            <form onSubmit={handleProcessWorkbook} className="space-y-4">
              {/* Error Alert */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-2.5 rounded-md flex items-center gap-2 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* Sample Chapters Preset Selector */}
              <div>
                <label className="font-bold text-gov-slate uppercase tracking-wider text-[10px] block mb-1.5">
                  1. Or Choose a Sample State Textbook Chapter (PALASH Model):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {SAMPLE_TEXTBOOK_CHAPTERS.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectSample(sample)}
                      className="p-2.5 rounded border border-gov-slate-border text-left hover:border-gov-navy hover:bg-gov-navy-subtle/50 transition-all text-xs"
                    >
                      <div className="font-bold text-gov-navy line-clamp-1">{sample.title.split(':')[1] || sample.title}</div>
                      <div className="text-[10px] text-gov-slate-muted mt-0.5">{sample.grade} • {sample.domain}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* File Upload Dropzone */}
              <div>
                <label className="font-bold text-gov-slate uppercase tracking-wider text-[10px] block mb-1.5">
                  2. Upload PDF or Text File (.pdf, .txt, .csv, .md):
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-all ${
                    selectedFile
                      ? 'border-gov-green bg-gov-green-subtle/30'
                      : 'border-gov-slate-border hover:border-gov-navy bg-gov-slate-bg'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.txt,.csv,.md"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    {selectedFile ? (
                      <>
                        <FileText className="w-7 h-7 text-gov-green" />
                        <span className="font-bold text-gov-navy text-xs">{selectedFile.name}</span>
                        <span className="text-[10px] text-gov-slate-muted">
                          {(selectedFile.size / 1024).toFixed(1)} KB • Click to replace
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-gov-slate-muted" />
                        <span className="font-bold text-gov-slate text-xs">
                          Click to browse or drop textbook PDF here
                        </span>
                        <span className="text-[10px] text-gov-slate-muted">
                          Supports Grade 1–2 SCERT/PALASH textbook PDFs & lesson worksheets
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Direction Selector (Vice-Versa) */}
              <div className="bg-gov-slate-bg p-2.5 rounded border border-gov-slate-border flex items-center justify-between">
                <span className="font-bold text-gov-slate text-xs">
                  Document Language Direction (Vice-Versa):
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSourceLang('hin_Deva')}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                      sourceLang === 'hin_Deva'
                        ? 'bg-gov-navy text-white shadow-xs'
                        : 'bg-white text-gov-slate border border-gov-slate-border hover:bg-slate-50'
                    }`}
                  >
                    Hindi ➔ Santali (Ol Chiki)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSourceLang('sat_Olck')}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                      sourceLang === 'sat_Olck'
                        ? 'bg-gov-navy text-white shadow-xs'
                        : 'bg-white text-gov-slate border border-gov-slate-border hover:bg-slate-50'
                    }`}
                  >
                    Santali (Ol Chiki) ➔ Hindi (Vice-Versa)
                  </button>
                </div>
              </div>

              {/* Manual Text Preview / Edit Box */}
              <div>
                <label className="font-bold text-gov-slate uppercase tracking-wider text-[10px] block mb-1">
                  3. Lesson Text Content (Extracted or Pasted):
                </label>
                <textarea
                  rows={4}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder={
                    sourceLang === 'hin_Deva'
                      ? 'Paste Hindi textbook sentences or instructions here...\nउदा:\nआज हम वस्तुओं की गिनती करेंगे।\nमेज पर तीन पेंसिल रखी हैं।\nइस डब्बे में कितने पत्ते हैं?'
                      : 'ᱥᱟᱱᱛᱟᱲᱤ ᱚᱞ ᱢᱮ (Paste Santali Ol Chiki text here)...\nᱡᱚᱛᱚ ᱜᱤᱫᱽᱨᱟᱹ ᱡᱚᱦᱟᱨ ᱢᱮᱛᱟᱠᱚ ᱢᱮ᱾\nᱟᱯᱱᱟᱨᱟᱜ ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡᱽ ᱯᱮ᱾\nᱱᱚᱸᱰᱮ ᱯᱮᱭᱟ ᱯᱮᱱᱥᱤᱞ ᱢᱮᱱᱟᱜ-ᱟ᱾'
                  }
                  className="w-full p-2.5 border border-gov-slate-border rounded text-xs text-gov-navy focus:ring-2 focus:ring-gov-navy focus:outline-none"
                />
              </div>

              {/* Metadata Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-gov-slate-muted uppercase text-[10px] block mb-1">
                    Lesson Title:
                  </label>
                  <input
                    type="text"
                    value={unitTitle}
                    onChange={(e) => setUnitTitle(e.target.value)}
                    placeholder="e.g. गणित पाठ ३"
                    className="w-full p-2 border border-gov-slate-border rounded text-xs text-gov-navy focus:ring-1 focus:ring-gov-navy"
                  />
                </div>

                <div>
                  <label className="font-bold text-gov-slate-muted uppercase text-[10px] block mb-1">
                    FLN Domain:
                  </label>
                  <select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value as any)}
                    className="w-full p-2 border border-gov-slate-border rounded text-xs text-gov-navy bg-white"
                  >
                    <option value="Numeracy">Numeracy (गणित)</option>
                    <option value="Literacy">Literacy (भाषा)</option>
                    <option value="Classroom Routine">Classroom Routine (वर्ग संचालन)</option>
                    <option value="Storytelling">Storytelling (कथा पठन)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gov-slate-muted uppercase text-[10px] block mb-1">
                    Grade Level:
                  </label>
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value as any)}
                    className="w-full p-2 border border-gov-slate-border rounded text-xs text-gov-navy bg-white"
                  >
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 2">Grade 2</option>
                    <option value="Balvatika (Pre-primary)">Balvatika</option>
                  </select>
                </div>
              </div>

              {/* Processing Progress Bar */}
              {isProcessing && (
                <div className="bg-gov-slate-bg p-3 rounded border border-gov-slate-border space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-gov-navy">
                    <span className="flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-gov-saffron" />
                      {progressStep}
                    </span>
                    <span>{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gov-navy h-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gov-slate-border">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isProcessing}
                  className="px-3.5 py-2 rounded border border-gov-slate-border text-gov-slate hover:bg-gov-slate-bg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-gov-navy text-white hover:bg-gov-navy-light font-bold shadow-sm disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gov-saffron-light" />
                  <span>{isProcessing ? 'Processing...' : 'Digitize & Add to Classroom'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

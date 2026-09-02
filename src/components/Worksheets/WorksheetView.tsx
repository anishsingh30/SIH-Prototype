import React, { useRef, useState } from 'react';
import { FLNUnit } from '../../types/curriculum';
import { Printer, Download, Award, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface WorksheetViewProps {
  unit: FLNUnit;
}

export const WorksheetView: React.FC<WorksheetViewProps> = ({ unit }) => {
  const printableRef = useRef<HTMLDivElement>(null);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [worksheetMode, setWorksheetMode] = useState<'hindi_to_santali' | 'santali_to_hindi'>('hindi_to_santali');

  const handlePrint = () => {
    window.print();
  };

  const handleToggleMode = () => {
    setWorksheetMode((prev) => (prev === 'hindi_to_santali' ? 'santali_to_hindi' : 'hindi_to_santali'));
  };

  const handleDownloadPdf = async () => {
    if (!printableRef.current || isExportingPdf) return;
    setIsExportingPdf(true);

    try {
      const element = printableRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`SAMVAAD_FLN_Worksheet_Unit${unit.unitNumber}_${worksheetMode}_${unit.titleEnglish.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Generate match items from unit vocabulary
  const vocabItems = unit.keyVocabulary.slice(0, 4);

  return (
    <div className="space-y-4">
      {/* Worksheet Control Bar (Hidden on print) */}
      <div className="bg-white border border-gov-slate-border/80 rounded-lg p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 print:hidden">
        <div>
          <h2 className="text-sm font-bold text-gov-navy uppercase tracking-wider">
            Auto-Generated Bilingual Classroom Worksheet
          </h2>
          <p className="text-xs text-gov-slate-muted">
            Ready to print or download for student desk work • Aligned with {unit.targetNipunCompetencies[0]?.code}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Vice-Versa Worksheet Mode Switch */}
          <button
            type="button"
            onClick={handleToggleMode}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border text-xs font-bold transition-all bg-gov-saffron-light/20 text-gov-navy border-gov-saffron/40 hover:bg-gov-saffron-light/40 shadow-xs"
            title="Switch worksheet focus between Hindi-first and Santali-first (Vice-Versa)"
          >
            <span className="text-gov-saffron-dark font-black">⇄ Orientation:</span>
            <span>
              {worksheetMode === 'hindi_to_santali'
                ? 'Hindi ➔ Santali (Ol Chiki)'
                : 'Santali (Ol Chiki) ➔ Hindi (Vice-Versa)'}
            </span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-white border border-gov-slate-border text-gov-slate hover:bg-gov-slate-bg text-xs font-bold transition-all shadow-xs"
            title="Download true PDF file"
          >
            {isExportingPdf ? <Loader2 className="w-4 h-4 animate-spin text-gov-navy" /> : <Download className="w-4 h-4 text-gov-navy" />}
            <span>{isExportingPdf ? 'Generating PDF...' : 'Download PDF File'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-gov-navy text-white text-xs font-bold hover:bg-gov-navy-light transition-all shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print Worksheet</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet Canvas */}
      <div
        ref={printableRef}
        className="bg-white border-2 border-gov-slate-border rounded-lg p-3 sm:p-6 md:p-8 shadow-sm print:shadow-none print:border-none print:p-0 print:m-0 space-y-5 sm:space-y-6 text-gov-navy font-sans w-full overflow-hidden"
      >
        {/* Official Header */}
        <div className="border-b-2 border-gov-navy pb-3 sm:pb-4 text-center space-y-1">
          <div className="text-[10px] sm:text-[11px] font-bold tracking-wider text-gov-slate-muted uppercase">
            Department of School Education & Literacy • Samagra Shiksha FLN Mission
          </div>
          <h1 className="text-base sm:text-xl font-extrabold text-gov-navy">
            {worksheetMode === 'hindi_to_santali'
              ? 'FLN द्विभाषी अभ्यास पत्रक | ᱵᱟᱨ ᱯᱟᱹᱨᱥᱤ ᱟᱵᱷᱭᱟᱥ ᱥᱟᱠᱟᱢ'
              : 'ᱵᱟᱨ ᱯᱟᱹᱨᱥᱤ ᱟᱵᱷᱭᱟᱥ ᱥᱟᱠᱟᱢ | FLN द्विभाषी अभ्यास पत्रक'}
          </h1>
          <div className="text-[11px] sm:text-xs font-semibold text-gov-slate">
            Unit {unit.unitNumber}: {unit.titleHindi} ({unit.titleEnglish}) • {unit.gradeLevel}{' '}
            {unit.status === 'draft' && (
              <span className="inline-block ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                ⚠ Auto-Generated Draft
              </span>
            )}
          </div>

          <div className="flex items-center justify-center gap-1.5 pt-1 text-[10px] sm:text-[11px] text-gov-saffron-dark font-medium">
            <Award className="w-3.5 h-3.5 text-gov-saffron shrink-0" />
            <span className="truncate">Competency: {unit.targetNipunCompetencies[0]?.code}</span>
          </div>
        </div>

        {/* Student Metadata Box */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 border border-gov-slate-border rounded p-2.5 sm:p-3 text-xs bg-gov-slate-bg/50">
          <div>
            <span className="font-bold text-gov-slate-muted text-[11px]">विद्यार्थी का नाम (ᱧᱩᱛᱩᱢ):</span>
            <div className="border-b border-dotted border-gov-slate mt-2 sm:mt-4"></div>
          </div>
          <div>
            <span className="font-bold text-gov-slate-muted text-[11px]">अनुक्रमांक / Roll No:</span>
            <div className="border-b border-dotted border-gov-slate mt-2 sm:mt-4"></div>
          </div>
          <div>
            <span className="font-bold text-gov-slate-muted text-[11px]">दिनांक (Date):</span>
            <div className="border-b border-dotted border-gov-slate mt-2 sm:mt-4"></div>
          </div>
        </div>

        {/* Section 1: Matching Activity */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-gov-slate-border/80 pb-1.5">
            <h3 className="text-xs sm:text-sm font-bold text-gov-navy">
              {worksheetMode === 'hindi_to_santali'
                ? 'भाग १: सही जोड़ी मिलाओ (रेखा खींचकर मिलान करें)'
                : 'ᱦᱟᱹᱴᱤᱧ ᱑: ᱥᱚᱡᱷᱮ ᱡᱚᱲᱟᱣ ᱢᱮ (Matching)'}
            </h3>
            <span className="text-xs font-semibold bg-gov-slate-bg px-2 py-0.5 rounded border">४ अंक</span>
          </div>

          {worksheetMode === 'hindi_to_santali' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 py-1">
              {/* Column A (Hindi) */}
              <div className="space-y-2 sm:space-y-3">
                <div className="text-[11px] font-bold text-gov-slate-muted uppercase">स्तंभ क (Hindi Word)</div>
                {vocabItems.map((item, idx) => (
                  <div key={`colA-${idx}`} className="flex items-center gap-2 text-xs sm:text-sm p-2 rounded border border-gov-slate-border/50 bg-white">
                    <span className="font-bold text-gov-slate text-xs">{idx + 1}.</span>
                    <span className="font-semibold">{item.hindiWord}</span>
                    <span className="text-xs text-gov-slate-muted">({item.englishMeaning})</span>
                  </div>
                ))}
              </div>

              {/* Column B (Santali Ol Chiki - Shuffled view) */}
              <div className="space-y-2 sm:space-y-3">
                <div className="text-[11px] font-bold text-gov-slate-muted uppercase">स्तंभ ख (Santali Ol Chiki)</div>
                {[...vocabItems].reverse().map((item, idx) => (
                  <div key={`colB-${idx}`} className="flex items-center gap-2 text-xs sm:text-sm p-2 rounded border border-gov-slate-border/50 bg-white">
                    <span className="font-bold text-gov-slate text-xs">({String.fromCharCode(65 + idx)})</span>
                    <span className="font-olchiki text-sm sm:text-base font-bold text-gov-navy">{item.santaliOlChiki}</span>
                    <span className="text-[11px] text-gov-slate-muted italic font-sans">[{item.romanizedPronunciation}]</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Vice-Versa: Column A is Santali Ol Chiki, Column B is Hindi */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 py-1">
              {/* Column A (Santali Ol Chiki) */}
              <div className="space-y-2 sm:space-y-3">
                <div className="text-[11px] font-bold text-gov-navy uppercase font-olchiki">ᱛᱷᱟᱠ ᱠ (Santali Ol Chiki)</div>
                {vocabItems.map((item, idx) => (
                  <div key={`colA-sat-${idx}`} className="flex items-center gap-2 text-xs sm:text-sm p-2 rounded border border-gov-slate-border/50 bg-white">
                    <span className="font-bold text-gov-slate text-xs">{idx + 1}.</span>
                    <span className="font-olchiki text-sm sm:text-base font-bold text-gov-navy">{item.santaliOlChiki}</span>
                    <span className="text-[11px] text-gov-slate-muted italic font-sans">[{item.romanizedPronunciation}]</span>
                  </div>
                ))}
              </div>

              {/* Column B (Hindi Words - Shuffled) */}
              <div className="space-y-2 sm:space-y-3">
                <div className="text-[11px] font-bold text-gov-slate-muted uppercase">स्तंभ ख (Hindi Word)</div>
                {[...vocabItems].reverse().map((item, idx) => (
                  <div key={`colB-hin-${idx}`} className="flex items-center gap-2 text-xs sm:text-sm p-2 rounded border border-gov-slate-border/50 bg-white">
                    <span className="font-bold text-gov-slate text-xs">({String.fromCharCode(65 + idx)})</span>
                    <span className="font-semibold">{item.hindiWord}</span>
                    <span className="text-xs text-gov-slate-muted">({item.englishMeaning})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Fill-in-the-Blank */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-gov-slate-border/80 pb-1.5">
            <h3 className="text-xs sm:text-sm font-bold text-gov-navy">
              {worksheetMode === 'hindi_to_santali'
                ? 'भाग २: कोष्ठक में दिए गए सही शब्द से वाक्य पूरा करो | ᱯᱮᱨᱮᱡ ᱢᱮ'
                : 'ᱦᱟᱹᱴᱤᱧ ᱒: ᱥᱟᱹᱦᱤ ᱟᱹᱲᱟᱹ ᱛᱮ ᱯᱮᱨᱮᱡ ᱢᱮ (Fill in Blanks)'}
            </h3>
            <span className="text-xs font-semibold bg-gov-slate-bg px-2 py-0.5 rounded border">४ अंक</span>
          </div>

          {/* Word Bank Box */}
          <div className="bg-gov-slate-bg/80 border border-gov-slate-border rounded p-3 text-center">
            <div className="text-[10px] font-bold text-gov-slate-muted uppercase mb-1.5">
              शब्द मंजूषा (WORD BANK):
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {worksheetMode === 'hindi_to_santali'
                ? vocabItems.slice(0, 4).map((v, i) => (
                    <span key={i} className="font-olchiki text-sm font-bold bg-white px-2.5 py-1 rounded border shadow-xs">
                      {v.santaliOlChiki}
                    </span>
                  ))
                : vocabItems.slice(0, 4).map((v, i) => (
                    <span key={i} className="text-xs font-bold bg-white px-2.5 py-1 rounded border shadow-xs">
                      {v.hindiWord}
                    </span>
                  ))}
            </div>
          </div>

          <div className="space-y-2.5 pt-1">
            {worksheetMode === 'hindi_to_santali' ? (
              <>
                <div className="p-2.5 border rounded text-xs space-y-1 bg-white">
                  <div className="text-gov-slate">१. अपनी गणित की किताब का पृष्ठ संख्या ४ _________। (खोलना / ᱡᱷᱤᱡᱽ)</div>
                  <div className="font-olchiki text-xs sm:text-sm text-gov-navy">
                    ᱟᱯᱱᱟᱨᱟᱜ ᱮᱞᱠᱷᱟ ᱯᱩᱛᱷᱤ ᱨᱮᱱᱟᱜ ᱥᱟᱠᱟᱢ ᱔ ____________ ᱯᱮ᱾
                  </div>
                </div>

                <div className="p-2.5 border rounded text-xs space-y-1 bg-white">
                  <div className="text-gov-slate">२. मेज पर _________ पेंसिल रखी हैं। (तीन / ᱯᱮᱭᱟ)</div>
                  <div className="font-olchiki text-xs sm:text-sm text-gov-navy">
                    ᱴᱮᱵᱩᱞ ᱪᱮᱛᱟᱱ ᱨᱮ ____________ ᱯᱮᱱᱥᱤᱞ ᱫᱚᱦᱚ ᱢᱮᱱᱟᱜ-ᱟ᱾
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="p-2.5 border rounded text-xs space-y-1 bg-white">
                  <div className="font-olchiki text-xs sm:text-sm text-gov-navy">
                    ᱑. ᱟᱯᱱᱟᱨᱟᱜ ᱮᱞᱠᱷᱟ ᱯᱩᱛᱷᱤ ᱨᱮᱱᱟᱜ ᱥᱟᱠᱟᱢ ᱔ ____________ ᱯᱮ᱾
                  </div>
                  <div className="text-gov-slate text-[11px]">
                    (अपनी गणित की किताब का पृष्ठ संख्या ४ ____________।)
                  </div>
                </div>

                <div className="p-2.5 border rounded text-xs space-y-1 bg-white">
                  <div className="font-olchiki text-xs sm:text-sm text-gov-navy">
                    ᱒. ᱴᱮᱵᱩᱞ ᱪᱮᱛᱟᱱ ᱨᱮ ____________ ᱯᱮᱱᱥᱤᱞ ᱫᱚᱦᱚ ᱢᱮᱱᱟᱜ-ᱟ᱾
                  </div>
                  <div className="text-gov-slate text-[11px]">
                    (मेज पर ____________ पेंसिल रखी हैं।)
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Section 3: Teacher Evaluation Box */}
        <div className="border-t-2 border-gov-slate-border pt-3 sm:pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs">
          <div className="border border-gov-slate-border rounded p-3 space-y-1.5 bg-white">
            <div className="font-bold text-gov-slate-muted uppercase text-[10px]">शिक्षक मूल्यांकन (Teacher Assessment):</div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 pt-1">
              <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                <input type="checkbox" className="rounded text-gov-navy" /> उत्तम (A)
              </label>
              <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                <input type="checkbox" className="rounded text-gov-navy" /> संतोषजनक (B)
              </label>
              <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                <input type="checkbox" className="rounded text-gov-navy" /> पुनरभ्यास आवश्यक (C)
              </label>
            </div>
          </div>

          <div className="border border-gov-slate-border rounded p-3 flex flex-col justify-between">
            <div className="font-bold text-gov-slate-muted uppercase text-[10px]">शिक्षक हस्ताक्षर (Signature):</div>
            <div className="border-b border-gov-slate-border mt-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { BookOpen, Mic, FileText, RefreshCw, Wifi, WifiOff, School } from 'lucide-react';

interface HeaderProps {
  activeTab: 'lesson' | 'voice' | 'worksheets' | 'corrections';
  onSelectTab: (tab: 'lesson' | 'voice' | 'worksheets' | 'corrections') => void;
  isOfflineMode: boolean;
  onToggleOfflineMode: () => void;
  pendingCorrectionsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  isOfflineMode,
  onToggleOfflineMode,
  pendingCorrectionsCount
}) => {
  return (
    <header className="bg-gov-navy text-white shadow-md border-b-2 border-gov-saffron print:hidden">
      {/* Top Govt / Project Banner */}
      <div className="bg-gov-navy-dark px-3 sm:px-4 py-1.5 text-[10px] sm:text-[11px] text-gov-slate-muted border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 w-full overflow-hidden">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          <span className="font-semibold text-gov-saffron-light">
            Smart India Hackathon 2026 (SIH26042)
          </span>
          <span className="text-white/30 hidden sm:inline">•</span>
          <span className="text-slate-300">Hindi ↔ Santali (`sat_Olck`) Pedagogy</span>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-[10px] w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-white/5 pt-0.5 sm:pt-0">
          <span>UDISE: 20040105602 (Dumka)</span>
          <span className="text-white/30">•</span>
          <span>Grade 1–2 FLN</span>
        </div>
      </div>

      {/* Main Title & Action Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-2.5 w-full overflow-hidden">
        <div className="flex items-center gap-2.5">
          {/* Logo / Emblem */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gov-navy-light border border-gov-saffron/40 flex items-center justify-center shrink-0 shadow-inner">
            <School className="w-4 h-4 sm:w-5 sm:h-5 text-gov-saffron-light" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-lg sm:text-2xl font-black tracking-tight text-white">
                SAMVAAD <span className="text-gov-saffron-light font-normal text-base sm:text-xl">| संवाद</span>
              </span>
              <span className="font-olchiki text-xs sm:text-base font-semibold text-slate-300">
                ᱥᱟᱱᱛᱟᱲᱤ
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 font-medium truncate">
              Bilingual FLN Classroom Pedagogy Companion &bull; NIPUN Bharat
            </p>
          </div>
        </div>

        {/* Global Action Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Offline Mode Switch */}
          <button
            type="button"
            onClick={onToggleOfflineMode}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-bold transition-all border ${
              isOfflineMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/40 ring-1 ring-amber-400/20'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
            }`}
            title="Demonstrate offline operation on local cache vs live server API"
          >
            {isOfflineMode ? <WifiOff className="w-3.5 h-3.5 shrink-0" /> : <Wifi className="w-3.5 h-3.5 shrink-0" />}
            <span className="truncate">{isOfflineMode ? 'Offline Mode' : 'Online (IndicTrans2)'}</span>
          </button>

          {/* CRC Sync Queue Badge Button */}
          <button
            type="button"
            onClick={() => onSelectTab('corrections')}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-gov-saffron-light shrink-0" />
            <span>CRC Queue</span>
            {pendingCorrectionsCount > 0 && (
              <span className="bg-gov-saffron text-gov-navy-dark text-[10px] font-black px-1.5 py-0.2 rounded-full shrink-0">
                {pendingCorrectionsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar (Desktop / Tablet only — Mobile uses Bottom App Bar) */}
      <div className="hidden sm:block bg-gov-navy-light/95 border-t border-white/10 px-4 py-1">
        <nav
          className="max-w-7xl mx-auto grid grid-cols-2 sm:flex sm:overflow-x-auto gap-1.5 sm:gap-2 sm:space-x-1"
          aria-label="Main Navigation Tabs"
          role="tablist"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'lesson'}
            aria-label="Navigate to FLN Lesson Flow Tab"
            onClick={() => onSelectTab('lesson')}
            className={`inline-flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 p-2 sm:px-3.5 sm:py-2 text-xs font-bold rounded-md sm:rounded-t-md sm:rounded-b-none transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 ${
              activeTab === 'lesson'
                ? 'bg-gov-slate-bg text-gov-navy shadow-sm ring-1 ring-gov-saffron/50'
                : 'text-slate-300 hover:text-white bg-white/5 sm:bg-transparent hover:bg-white/10'
            }`}
          >
            <BookOpen className="w-4 h-4 text-gov-saffron shrink-0" />
            <span className="truncate">1. Lesson Flow (पाठ)</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'voice'}
            aria-label="Navigate to Live Voice Bridge Tab"
            onClick={() => onSelectTab('voice')}
            className={`inline-flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 p-2 sm:px-3.5 sm:py-2 text-xs font-bold rounded-md sm:rounded-t-md sm:rounded-b-none transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 ${
              activeTab === 'voice'
                ? 'bg-gov-slate-bg text-gov-navy shadow-sm ring-1 ring-gov-saffron/50'
                : 'text-slate-300 hover:text-white bg-white/5 sm:bg-transparent hover:bg-white/10'
            }`}
          >
            <Mic className="w-4 h-4 text-gov-saffron shrink-0" />
            <span className="truncate">2. Voice Bridge (संवाद)</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'worksheets'}
            aria-label="Navigate to Worksheets and Flashcards Tab"
            onClick={() => onSelectTab('worksheets')}
            className={`inline-flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 p-2 sm:px-3.5 sm:py-2 text-xs font-bold rounded-md sm:rounded-t-md sm:rounded-b-none transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 ${
              activeTab === 'worksheets'
                ? 'bg-gov-slate-bg text-gov-navy shadow-sm ring-1 ring-gov-saffron/50'
                : 'text-slate-300 hover:text-white bg-white/5 sm:bg-transparent hover:bg-white/10'
            }`}
          >
            <FileText className="w-4 h-4 text-gov-saffron shrink-0" />
            <span className="truncate">3. Cards & Worksheets</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'corrections'}
            aria-label="Navigate to Teacher Feedback and CRC Queue Tab"
            onClick={() => onSelectTab('corrections')}
            className={`inline-flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 p-2 sm:px-3.5 sm:py-2 text-xs font-bold rounded-md sm:rounded-t-md sm:rounded-b-none transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 ${
              activeTab === 'corrections'
                ? 'bg-gov-slate-bg text-gov-navy shadow-sm ring-1 ring-gov-saffron/50'
                : 'text-slate-300 hover:text-white bg-white/5 sm:bg-transparent hover:bg-white/10'
            }`}
          >
            <RefreshCw className="w-4 h-4 text-gov-saffron shrink-0" />
            <span className="truncate">4. CRC Queue</span>
            {pendingCorrectionsCount > 0 && (
              <span className="bg-gov-saffron text-gov-navy-dark text-[10px] font-black px-1.5 py-0.2 rounded-full shrink-0">
                {pendingCorrectionsCount}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Persistent Mobile Bottom Navigation Bar (Thumb Friendly for Teachers) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-gov-navy border-t-2 border-gov-saffron shadow-2xl flex items-center justify-around py-1.5 px-1">
        <button
          type="button"
          onClick={() => onSelectTab('lesson')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded transition-all ${
            activeTab === 'lesson'
              ? 'text-gov-saffron font-bold scale-105'
              : 'text-slate-300 opacity-75'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 font-bold">1. Lessons</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('voice')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded transition-all ${
            activeTab === 'voice'
              ? 'text-gov-saffron font-bold scale-105'
              : 'text-slate-300 opacity-75'
          }`}
        >
          <Mic className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 font-bold">2. Voice</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('worksheets')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded transition-all ${
            activeTab === 'worksheets'
              ? 'text-gov-saffron font-bold scale-105'
              : 'text-slate-300 opacity-75'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 font-bold">3. Cards/Sheet</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('corrections')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded relative transition-all ${
            activeTab === 'corrections'
              ? 'text-gov-saffron font-bold scale-105'
              : 'text-slate-300 opacity-75'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 font-bold">4. CRC Queue</span>
          {pendingCorrectionsCount > 0 && (
            <span className="absolute -top-1 right-2 bg-gov-saffron text-gov-navy text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {pendingCorrectionsCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

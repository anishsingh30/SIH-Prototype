import { useState, useEffect } from 'react';
import { FLN_CURRICULUM_UNITS } from './data/curriculumData';
import { FLNUnit, TeachingBeat } from './types/curriculum';
import { Header } from './components/Header';
import { LessonTranslatorView } from './components/LessonTranslator/LessonTranslatorView';
import { VoiceBridgeView } from './components/VoiceBridge/VoiceBridgeView';
import { WorksheetGeneratorView } from './components/Worksheets/WorksheetGeneratorView';
import { SyncQueueDrawer } from './components/Corrections/SyncQueueDrawer';
import { CorrectionModal } from './components/Corrections/CorrectionModal';
import { UploadWorkbookModal } from './components/LessonTranslator/UploadWorkbookModal';
import { translationService } from './services/translationService';
import { offlineSyncService } from './services/offlineSyncService';
import { WifiOff } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'lesson' | 'voice' | 'worksheets' | 'corrections'>('lesson');
  const [units, setUnits] = useState<FLNUnit[]>(FLN_CURRICULUM_UNITS);
  const [activeUnit, setActiveUnit] = useState<FLNUnit>(FLN_CURRICULUM_UNITS[0]);
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(true); // Default to offline mode for robust classroom reliability
  const [corrections, setCorrections] = useState(offlineSyncService.getCorrections());
  const [pendingCount, setPendingCount] = useState(offlineSyncService.getPendingCount());
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Correction Modal State
  const [correctionModalData, setCorrectionModalData] = useState<{
    isOpen: boolean;
    sourceHindi: string;
    originalSantali: string;
    unitId?: string;
  }>({
    isOpen: false,
    sourceHindi: '',
    originalSantali: '',
    unitId: undefined
  });

  const handleUnitCreated = (newUnit: FLNUnit) => {
    setUnits((prev) => [newUnit, ...prev]);
    setActiveUnit(newUnit);
  };

  const handlePromoteUnit = (unitId: string) => {
    setUnits((prev) =>
      prev.map((u) =>
        u.id === unitId
          ? {
              ...u,
              status: 'verified',
              reviewedAt: new Date().toISOString(),
              beats: u.beats.map((b) => ({ ...b, status: 'verified' }))
            }
          : u
      )
    );
    if (activeUnit.id === unitId) {
      setActiveUnit((prev) => ({
        ...prev,
        status: 'verified',
        reviewedAt: new Date().toISOString(),
        beats: prev.beats.map((b) => ({ ...b, status: 'verified' }))
      }));
    }
  };

  useEffect(() => {
    translationService.setOfflineMode(isOfflineMode);
  }, [isOfflineMode]);

  const refreshCorrections = () => {
    setCorrections(offlineSyncService.getCorrections());
    setPendingCount(offlineSyncService.getPendingCount());
  };

  const handleToggleOfflineMode = () => {
    const nextState = !isOfflineMode;
    setIsOfflineMode(nextState);
    translationService.setOfflineMode(nextState);
  };

  const handleFlagBeat = (beat: TeachingBeat) => {
    setCorrectionModalData({
      isOpen: true,
      sourceHindi: beat.hindiText,
      originalSantali: beat.santaliOlChiki,
      unitId: activeUnit.id
    });
  };

  const handleFlagUtterance = (sourceText: string, translatedText: string) => {
    setCorrectionModalData({
      isOpen: true,
      sourceHindi: sourceText,
      originalSantali: translatedText,
      unitId: activeUnit.id
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans">
      {/* Official Government App Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isOfflineMode={isOfflineMode}
        onToggleOfflineMode={handleToggleOfflineMode}
        pendingCorrectionsCount={pendingCount}
      />

      {/* Offline Status Sub-Banner */}
      {isOfflineMode && (
        <div className="bg-amber-100 border-b border-amber-200 px-4 py-1.5 text-xs text-amber-900 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            <WifiOff className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span className="font-semibold">
              Offline Demonstration Active:
            </span>
            <span className="hidden sm:inline text-amber-800">
              Running entirely on local PALASH FLN cache with simulated edge latency. Zero internet connection required.
            </span>
          </div>
        </div>
      )}

      {/* Main Workspace Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 pb-20 sm:pb-5">
        {activeTab === 'lesson' && (
          <LessonTranslatorView
            units={units}
            activeUnit={activeUnit}
            onSelectUnit={setActiveUnit}
            onFlagCorrection={handleFlagBeat}
            onOpenUpload={() => setIsUploadModalOpen(true)}
            onPromoteUnit={handlePromoteUnit}
          />
        )}

        {activeTab === 'voice' && (
          <VoiceBridgeView
            activeUnit={activeUnit}
            units={units}
            onSelectUnit={setActiveUnit}
            onFlagUtterance={handleFlagUtterance}
          />
        )}

        {activeTab === 'worksheets' && (
          <WorksheetGeneratorView
            activeUnit={activeUnit}
            units={units}
            onSelectUnit={setActiveUnit}
          />
        )}

        {activeTab === 'corrections' && (
          <SyncQueueDrawer
            corrections={corrections}
            onRefresh={refreshCorrections}
          />
        )}
      </main>

      {/* Upload / Digitize Workbook Modal */}
      <UploadWorkbookModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUnitCreated={handleUnitCreated}
      />

      {/* Teacher Correction Modal */}
      <CorrectionModal
        isOpen={correctionModalData.isOpen}
        onClose={() => setCorrectionModalData((prev) => ({ ...prev, isOpen: false }))}
        sourceTextHindi={correctionModalData.sourceHindi}
        originalSantaliTranslation={correctionModalData.originalSantali}
        unitId={correctionModalData.unitId}
        onCorrectionSaved={refreshCorrections}
      />

      {/* Footer / Official Attribution */}
      <footer className="bg-white border-t border-gov-slate-border text-xs text-gov-slate-muted py-4 px-4 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <span className="font-semibold text-gov-navy">SAMVAAD (संवाद) Prototype</span> • Smart India Hackathon 2026 (SIH26042)
          </div>
          <div className="flex items-center gap-3">
            <span>Powered by AI4Bharat IndicTrans2 & IndicConformer</span>
            <span>•</span>
            <span className="text-gov-slate">NIPUN Bharat Aligned</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { TeacherCorrection } from '../../types/correction';
import { offlineSyncService } from '../../services/offlineSyncService';
import { RefreshCw, Download, CheckCircle2, Clock, Trash2, Building, ShieldCheck } from 'lucide-react';

interface SyncQueueDrawerProps {
  corrections: TeacherCorrection[];
  onRefresh: () => void;
}

export const SyncQueueDrawer: React.FC<SyncQueueDrawerProps> = ({ corrections, onRefresh }) => {
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const pendingCount = corrections.filter((c) => c.status === 'pending_sync').length;

  const handleTriggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      const result = offlineSyncService.simulateCrcSync();
      setSyncMessage(result.message);
      setIsSyncing(false);
      onRefresh();
      setTimeout(() => setSyncMessage(null), 4000);
    }, 1200);
  };

  const handleExportJson = () => {
    const jsonStr = offlineSyncService.exportAsJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `samvaad_crc_sync_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearSynced = () => {
    offlineSyncService.clearSynced();
    onRefresh();
  };

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-white border border-gov-slate-border/80 rounded-lg p-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-gov-slate-border/60">
          <div>
            <h1 className="text-base font-bold text-gov-navy flex items-center gap-2">
              <Building className="w-4 h-4 text-gov-navy" />
              <span>CRC / BRC Teacher Correction Sync Queue</span>
            </h1>
            <p className="text-xs text-gov-slate-muted">
              Peer review feedback loop for localized Santali dialect adaptations and pedagogical refinement
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportJson}
              className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded border border-gov-slate-border text-gov-slate hover:bg-gov-slate-bg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            <button
              type="button"
              onClick={handleTriggerSync}
              disabled={isSyncing || pendingCount === 0}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-bold text-white transition-all shadow-xs ${
                pendingCount > 0
                  ? 'bg-gov-navy hover:bg-gov-navy-light'
                  : 'bg-gov-slate-muted opacity-60 cursor-not-allowed'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Connecting to CRC...' : `Sync Pending (${pendingCount})`}</span>
            </button>
          </div>
        </div>

        {/* Metadata Strip */}
        <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div className="bg-gov-slate-bg p-2 rounded border border-gov-slate-border/60">
            <span className="text-gov-slate-muted font-medium text-[11px]">School UDISE Code:</span>
            <div className="font-bold text-gov-navy font-mono">20040105602 (Govt PS Dumka)</div>
          </div>

          <div className="bg-gov-slate-bg p-2 rounded border border-gov-slate-border/60">
            <span className="text-gov-slate-muted font-medium text-[11px]">Cluster / Block:</span>
            <div className="font-bold text-gov-navy">Dumka-East CRC • Jharkhand</div>
          </div>

          <div className="bg-gov-slate-bg p-2 rounded border border-gov-slate-border/60">
            <span className="text-gov-slate-muted font-medium text-[11px]">Queue Status:</span>
            <div className="font-bold text-gov-saffron-dark">
              {pendingCount} Pending Sync • {corrections.length - pendingCount} Synced
            </div>
          </div>
        </div>
      </div>

      {/* Sync Notification Banner */}
      {syncMessage && (
        <div className="bg-gov-green-subtle text-gov-green-dark border border-gov-green/30 rounded-lg p-3 text-xs flex items-center gap-2 animate-fadeIn">
          <ShieldCheck className="w-4 h-4 text-gov-green shrink-0" />
          <span className="font-semibold">{syncMessage}</span>
        </div>
      )}

      {/* Corrections List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gov-navy">
            Logged Teacher Corrections ({corrections.length})
          </h2>
          {corrections.some((c) => c.status === 'synced_to_crc') && (
            <button
              type="button"
              onClick={handleClearSynced}
              className="text-xs text-gov-slate-muted hover:text-gov-maroon flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear Synced Records</span>
            </button>
          )}
        </div>

        {corrections.length === 0 ? (
          <div className="bg-white border rounded-lg p-8 text-center text-xs text-gov-slate-muted">
            No corrections logged yet. Use the &ldquo;Flag / Correct&rdquo; button on any teaching beat or voice exchange.
          </div>
        ) : (
          corrections.map((item) => {
            const isPending = item.status === 'pending_sync';
            return (
              <div
                key={item.id}
                className="bg-white border border-gov-slate-border rounded-lg p-4 shadow-sm space-y-2.5 text-xs"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gov-slate-border/50 pb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded text-[11px] ${
                        isPending
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-gov-green-subtle text-gov-green-dark border border-gov-green/30'
                      }`}
                    >
                      {isPending ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                      {isPending ? 'Pending CRC Sync' : 'Synced to CRC Server'}
                    </span>
                    <span className="text-gov-slate-muted text-[11px]">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <span className="text-[11px] bg-gov-slate-bg px-2 py-0.5 rounded border text-gov-slate font-medium">
                    Category: {item.correctionCategory.replace('_', ' ')}
                  </span>
                </div>

                {/* Content Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div className="bg-gov-slate-bg p-2.5 rounded border border-gov-slate-border/60">
                    <div className="font-bold text-gov-slate-muted text-[10px] uppercase mb-0.5">
                      Source Hindi ➔ Original Santali:
                    </div>
                    <div className="text-gov-slate font-medium">{item.sourceTextHindi}</div>
                    <div className="font-olchiki text-sm text-gov-slate-muted mt-1">
                      {item.originalSantaliTranslation}
                    </div>
                  </div>

                  <div className="bg-gov-green-subtle/30 p-2.5 rounded border border-gov-green/20">
                    <div className="font-bold text-gov-green-dark text-[10px] uppercase mb-0.5">
                      Teacher Suggested Local Correction:
                    </div>
                    <div className="font-olchiki text-base font-bold text-gov-navy">
                      {item.suggestedSantaliTranslation}
                    </div>
                    {item.suggestedRomanized && (
                      <div className="text-[11px] text-gov-slate-muted italic">
                        Pronunciation: &ldquo;{item.suggestedRomanized}&rdquo;
                      </div>
                    )}
                  </div>
                </div>

                {/* Teacher Pedagogical Note */}
                {item.teacherNotes && (
                  <div className="text-[11px] text-gov-slate italic bg-gov-slate-bg p-2 rounded">
                    <span className="font-semibold text-gov-slate-muted not-italic">Teacher Note: </span>
                    {item.teacherNotes}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

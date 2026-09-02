import React from 'react';
import { LatencyBreakdown } from '../../types/translation';
import { Clock, Cpu, Mic, Volume2, CheckCircle2 } from 'lucide-react';

interface LatencyMonitorProps {
  latency: LatencyBreakdown | null;
  backendName: string;
}

export const LatencyMonitor: React.FC<LatencyMonitorProps> = ({ latency, backendName }) => {
  if (!latency) {
    return (
      <div className="bg-white border border-gov-slate-border/80 rounded-lg p-2.5 sm:p-3 text-xs text-gov-slate-muted flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 shadow-sm">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gov-slate shrink-0" />
          <span className="truncate">Real-time round-trip latency telemetry ready</span>
        </div>
        <span className="text-[10px] sm:text-[11px] font-medium bg-gov-slate-bg px-2 py-0.5 rounded border self-start sm:self-auto shrink-0">
          Target: &lt; 3.0s Live Classroom Threshold
        </span>
      </div>
    );
  }

  const isSub3Seconds = latency.totalRoundTripMs < 3000;

  return (
    <div className="bg-white border border-gov-slate-border/80 rounded-lg p-3.5 shadow-sm space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gov-slate-border/60 pb-2">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gov-navy" />
          <span className="text-xs font-bold uppercase tracking-wider text-gov-navy">
            Measured Pipeline Latency Breakdown
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
              isSub3Seconds
                ? 'bg-gov-green-subtle text-gov-green-dark border-gov-green/30'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            {(latency.totalRoundTripMs / 1000).toFixed(2)}s Round-Trip ({isSub3Seconds ? 'Sub-3s Pass' : 'High Latency'})
          </span>

          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-gov-navy-subtle text-gov-navy border border-gov-navy/20">
            {backendName}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        {/* ASR Segment */}
        <div className="bg-gov-slate-bg p-2 rounded border border-gov-slate-border/60">
          <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-gov-slate-muted mb-0.5">
            <Mic className="w-3 h-3" />
            ASR (Speech Input)
          </div>
          <div className="text-sm font-bold text-gov-navy">
            {latency.asrTimeMs > 0 ? `${latency.asrTimeMs} ms` : '0 ms (Typed)'}
          </div>
          <div className="text-[10px] text-gov-slate-muted">
            {latency.asrTimeMs > 0 ? 'WebSpeech Telemetry' : 'Text Input Bypass'}
          </div>
        </div>

        {/* Translation Segment */}
        <div className="bg-gov-slate-bg p-2 rounded border border-gov-slate-border/60">
          <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-gov-slate-muted mb-0.5">
            <Cpu className="w-3 h-3" />
            MT Translation
          </div>
          <div className="text-sm font-bold text-gov-navy">{latency.translationTimeMs} ms</div>
          <div className="text-[10px] text-gov-slate-muted">
            {backendName.includes('Offline') ? '⚡ Local Cache Lookup' : '🌐 Live IndicTrans2 API'}
          </div>
        </div>

        {/* TTS Segment */}
        <div className="bg-gov-slate-bg p-2 rounded border border-gov-slate-border/60">
          <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-gov-slate-muted mb-0.5">
            <Volume2 className="w-3 h-3" />
            TTS Audio Output
          </div>
          <div className="text-sm font-bold text-gov-navy">{latency.ttsTimeMs} ms</div>
          <div className="text-[10px] text-gov-slate-muted">Phonetic Synthesis</div>
        </div>
      </div>
    </div>
  );
};

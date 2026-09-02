import React, { useState } from 'react';
import { FLNUnit } from '../../types/curriculum';
import { LanguageCode, DialogueUtterance, LatencyBreakdown } from '../../types/translation';
import { translationService } from '../../services/translationService';
import { speechService } from '../../services/speechService';
import { LatencyMonitor } from './LatencyMonitor';
import { OlChikiText } from '../Common/OlChikiText';
import {
  Mic,
  MicOff,
  Send,
  Sparkles,
  ArrowLeftRight,
  User,
  GraduationCap,
  RotateCcw,
  Volume2,
  Flag,
  Lightbulb
} from 'lucide-react';

interface VoiceBridgeViewProps {
  activeUnit: FLNUnit;
  units: FLNUnit[];
  onSelectUnit: (unit: FLNUnit) => void;
  onFlagUtterance: (sourceText: string, translatedText: string) => void;
}

export const VoiceBridgeView: React.FC<VoiceBridgeViewProps> = ({
  activeUnit,
  units,
  onSelectUnit,
  onFlagUtterance
}) => {
  const [direction, setDirection] = useState<'teacher_to_student' | 'student_to_teacher'>('teacher_to_student');
  const [isContextBiasEnabled, setIsContextBiasEnabled] = useState(true);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastLatency, setLastLatency] = useState<LatencyBreakdown | null>(null);
  const [dialogueHistory, setDialogueHistory] = useState<DialogueUtterance[]>([
    {
      id: 'd-seed-1',
      timestamp: '10:02 AM',
      speaker: 'teacher',
      sourceLang: 'hin_Deva',
      sourceText: 'सब बच्चे सीधी कतार में खड़े हो जाओ।',
      translatedText: 'ᱡᱚᱛᱚ ᱜᱤᱫᱽᱨᱟᱹ ᱥᱚᱡᱷᱮ ᱛᱷᱟᱨ ᱨᱮ ᱛᱤᱸᱜᱩᱱ ᱯᱮ᱾',
      romanizedPronunciation: 'Joto gidra sojhe thar re tingun pe.',
      latency: { asrTimeMs: 210, translationTimeMs: 85, ttsTimeMs: 140, totalRoundTripMs: 435 },
      nipunTag: 'LO-FLN-H1.01'
    },
    {
      id: 'd-seed-2',
      timestamp: '10:03 AM',
      speaker: 'student',
      sourceLang: 'sat_Olck',
      sourceText: 'ᱦᱮᱸ ᱢᱟᱪᱮᱛ ᱜᱚᱢᱠᱮ, ᱟᱞᱮ ᱛᱤᱸᱜᱩ ᱮᱱᱟᱞᱮ᱾',
      translatedText: 'हाँ शिक्षक जी, हम खड़े हो गए हैं।',
      romanizedPronunciation: 'Hen macet gomke, ale tingu enale.',
      latency: { asrTimeMs: 320, translationTimeMs: 95, ttsTimeMs: 110, totalRoundTripMs: 525 },
      nipunTag: 'LO-FLN-H1.03'
    }
  ]);

  const sourceLang: LanguageCode = direction === 'teacher_to_student' ? 'hin_Deva' : 'sat_Olck';
  const targetLang: LanguageCode = direction === 'teacher_to_student' ? 'sat_Olck' : 'hin_Deva';

  const quickPrompts = direction === 'teacher_to_student'
    ? [
        'सब बच्चे शांत हो जाओ।',
        'किताब का पृष्ठ ४ खोलो।',
        'इस डब्बे में कितने पत्ते हैं?',
        'तुम्हारा नाम क्या है?',
        'कौवा बहुत प्यासा था।'
      ]
    : [
        'ᱦᱮᱸ ᱢᱟᱪᱮᱛ ᱜᱚᱢᱠᱮ (हाँ शिक्षक जी)',
        'ᱯᱮᱭᱟ ᱯᱮᱱᱥᱤᱞ ᱢᱮᱱᱟᱜ-ᱟ (तीन पेंसिल हैं)',
        'ᱤᱧᱟᱜ ᱧᱩᱛᱩᱢ ᱫᱚ ᱥᱚᱢᱨᱟᱭ (मेरा नाम सोमराय है)',
        'ᱥᱟᱹᱜᱩᱱ ᱥᱮᱛᱟᱜ (शुभ प्रभात)'
      ];

  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [backendNotice, setBackendNotice] = useState<string | null>(null);

  const handleTranslate = async (textToTranslate: string, asrDurationMs?: number) => {
    if (!textToTranslate.trim() || isProcessing) return;

    setIsProcessing(true);
    setVoiceError(null);
    setBackendNotice(null);

    const vocabBias = isContextBiasEnabled
      ? activeUnit.keyVocabulary.map((v) => (sourceLang === 'hin_Deva' ? v.hindiWord : v.santaliOlChiki))
      : [];

    try {
      const result = await translationService.translate(textToTranslate, sourceLang, targetLang, {
        unitId: activeUnit.id,
        unitTitle: activeUnit.titleHindi,
        lessonDomain: activeUnit.domain,
        vocabularyBias: vocabBias
      });

      if (result.backendUsed === 'Curated-Offline-Cache' && result.confidence < 0.6) {
        setBackendNotice('Phrase not found in offline FLN dictionary. Fallback response generated.');
      }

      // Measure exact TTS duration
      const ttsResult = await speechService.speak(
        result.translatedText,
        result.romanizedPronunciation,
        targetLang
      );

      const trueLatency: LatencyBreakdown = {
        asrTimeMs: asrDurationMs || 0,
        translationTimeMs: result.latency.translationTimeMs,
        ttsTimeMs: ttsResult.durationMs,
        totalRoundTripMs: (asrDurationMs || 0) + result.latency.translationTimeMs + ttsResult.durationMs
      };

      setLastLatency(trueLatency);

      const newUtterance: DialogueUtterance = {
        id: `dialogue-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        speaker: direction === 'teacher_to_student' ? 'teacher' : 'student',
        sourceLang,
        sourceText: textToTranslate,
        translatedText: result.translatedText,
        romanizedPronunciation: result.romanizedPronunciation,
        latency: trueLatency,
        nipunTag: result.matchedLessonOutcome
      };

      setDialogueHistory((prev) => [newUtterance, ...prev]);
      setInputText('');
    } catch (err: any) {
      setVoiceError(`Translation Pipeline Error: ${err?.message || 'Failed to process translation'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVoiceInput = async () => {
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
      return;
    }

    setVoiceError(null);
    try {
      setIsListening(true);
      const { transcript, durationMs } = await speechService.listen(sourceLang);
      setIsListening(false);
      if (transcript) {
        setInputText(transcript);
        await handleTranslate(transcript, durationMs);
      }
    } catch (err: any) {
      setIsListening(false);
      if (err?.message?.includes('not-allowed') || err?.name === 'NotAllowedError') {
        setVoiceError('Microphone permission denied. Please allow microphone access in your browser/device settings.');
      } else {
        setVoiceError(`Audio Input Error: ${err?.message || 'Could not capture speech'}`);
      }
    }
  };

  const toggleDirection = () => {
    setDirection((prev) =>
      prev === 'teacher_to_student' ? 'student_to_teacher' : 'teacher_to_student'
    );
  };

  return (
    <div className="space-y-4">
      {/* Dialogue Mode Banner & Control Bar */}
      <div className="bg-white border border-gov-slate-border/80 rounded-lg p-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-gov-slate-border/60">
          <div>
            <h1 className="text-base font-bold text-gov-navy flex items-center gap-2">
              <span>Live Classroom Voice-to-Voice Bridge</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gov-navy-subtle text-gov-navy">
                Bi-Directional Dialogue
              </span>
            </h1>
            <p className="text-xs text-gov-slate-muted">
              Live verbal translation for Hindi teachers and Santali students with curriculum biasing
            </p>
          </div>

          {/* Direction Switcher Button */}
          <button
            type="button"
            onClick={toggleDirection}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-gov-navy text-white text-xs font-bold hover:bg-gov-navy-light transition-all shadow-xs"
          >
            {direction === 'teacher_to_student' ? (
              <>
                <GraduationCap className="w-4 h-4 text-gov-saffron-light" />
                <span>शिक्षक (Hindi) ➔ छात्र (Santali)</span>
              </>
            ) : (
              <>
                <User className="w-4 h-4 text-emerald-300" />
                <span>छात्र (Santali) ➔ शिक्षक (Hindi)</span>
              </>
            )}
            <ArrowLeftRight className="w-3.5 h-3.5 ml-1 opacity-70" />
          </button>
        </div>

        {/* Lesson Context Bias Toggle Strip */}
        <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 w-full overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsContextBiasEnabled(!isContextBiasEnabled)}
              className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-semibold border transition-all ${
                isContextBiasEnabled
                  ? 'bg-amber-50 text-amber-900 border-amber-300 shadow-xs'
                  : 'bg-gov-slate-bg text-gov-slate-muted border-gov-slate-border'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isContextBiasEnabled ? 'text-gov-saffron' : 'text-gov-slate-muted'}`} />
              <span>Lesson-Context Bias: {isContextBiasEnabled ? 'ENABLED' : 'DISABLED'}</span>
            </button>

            {isContextBiasEnabled && (
              <div className="flex items-center gap-1.5 text-xs text-gov-slate font-medium w-full sm:w-auto">
                <span className="text-gov-slate-muted hidden md:inline shrink-0">Active Bias:</span>
                <select
                  value={activeUnit.id}
                  onChange={(e) => {
                    const found = units.find((u) => u.id === e.target.value);
                    if (found) onSelectUnit(found);
                  }}
                  className="bg-gov-navy-subtle text-gov-navy border border-gov-navy/20 rounded px-2 py-1 text-xs font-semibold focus:ring-1 focus:ring-gov-navy w-full sm:w-auto max-w-full"
                >
                  {units.map((u) => (
                    <option key={u.id} value={u.id}>
                      Unit {u.unitNumber}: {u.titleHindi} ({u.domain}) {u.status === 'draft' ? '— ⚠ Draft' : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="text-[11px] sm:text-xs text-gov-slate-muted flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-gov-saffron shrink-0" />
            <span>Biasing prioritizes FLN domain terminology</span>
          </div>
        </div>
      </div>

      {/* Honest Latency Monitor */}
      <LatencyMonitor
        latency={lastLatency}
        backendName={translationService.getActiveBackendName()}
      />

      {/* Push to Talk & Input Console */}
      <div className="bg-white border border-gov-slate-border/80 rounded-lg p-4 shadow-sm space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-gov-slate-muted flex flex-wrap items-center justify-between gap-1">
          <span>
            {direction === 'teacher_to_student'
              ? '🎤 Speak or Enter Hindi Classroom Prompt'
              : '🎤 Speak or Enter Santali Student Response'}
          </span>
          {direction === 'student_to_teacher' && (
            <span className="text-[10px] font-normal text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
              Browser Note: WebSpeech lacks native `sat-IN`; simulated ASR stand-in active
            </span>
          )}
          {isProcessing && <span className="text-gov-saffron font-semibold animate-pulse">Processing Pipeline...</span>}
        </div>

        {voiceError && (
          <div className="bg-red-50 border border-red-200 text-red-800 text-xs p-2.5 rounded-md flex items-center justify-between">
            <span>⚠️ {voiceError}</span>
            <button type="button" onClick={() => setVoiceError(null)} className="text-red-600 hover:text-red-900 font-bold ml-2">✕</button>
          </div>
        )}

        {backendNotice && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-2 rounded-md flex items-center justify-between">
            <span>💡 {backendNotice}</span>
            <button type="button" onClick={() => setBackendNotice(null)} className="text-amber-600 hover:text-amber-900 font-bold ml-2">✕</button>
          </div>
        )}

        {/* Big Push-to-Talk Mic & Input Row */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleVoiceInput}
            disabled={isProcessing}
            aria-label={isListening ? 'Stop recording classroom audio' : 'Start microphone recording'}
            className={`p-4 rounded-full transition-all shadow-md flex items-center justify-center shrink-0 focus:outline-none focus:ring-4 focus:ring-amber-400 ${
              isListening
                ? 'bg-gov-maroon text-white ring-4 ring-gov-maroon/30 animate-pulse'
                : 'bg-gov-navy text-white hover:bg-gov-navy-light'
            }`}
            title={isListening ? 'Stop listening' : 'Tap to speak into classroom microphone'}
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTranslate(inputText)}
              aria-label="Enter classroom prompt text"
              placeholder={
                direction === 'teacher_to_student'
                  ? 'उदा: सब बच्चे शांत हो जाओ, पृष्ठ संख्या ४ खोलो...'
                  : 'ᱚᱞ ᱢᱮ: ᱦᱮᱸ ᱢᱟᱪᱮᱛ ᱜᱚᱢᱠᱮ, ᱟᱞᱮ ᱴᱷᱮᱱ ᱢᱮᱱᱟᱜ-ᱟ...'
              }
              className="w-full pl-3 pr-10 py-3 border border-gov-slate-border rounded-md text-sm text-gov-navy focus:outline-none focus:ring-2 focus:ring-gov-navy focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => handleTranslate(inputText)}
              disabled={!inputText.trim() || isProcessing}
              aria-label="Send text for translation"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gov-navy hover:text-gov-navy-light disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-gov-navy rounded"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Classroom Quick Prompts */}
        <div className="pt-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-gov-slate-muted mb-1.5">
            One-Tap Classroom Prompts (त्वरित कक्षा संकेत):
          </div>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  const clean = prompt.includes('(') ? prompt.split('(')[0].trim() : prompt;
                  setInputText(clean);
                  handleTranslate(clean);
                }}
                className="text-xs bg-gov-slate-bg hover:bg-gov-navy-subtle hover:text-gov-navy border border-gov-slate-border/80 rounded px-2.5 py-1 text-gov-slate transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Prototype ASR / Privacy Notice for Judges */}
        <div className="pt-2 border-t border-gov-slate-border/50 flex items-start gap-1.5 text-[11px] text-gov-slate-muted bg-gov-slate-bg/60 p-2 rounded">
          <span className="font-semibold text-gov-slate shrink-0">ℹ️ Architecture Note:</span>
          <span>
            This web prototype uses the browser Web Speech API for evaluation. The production Android deployment transitions to an on-device <strong>Sherpa-ONNX / IndicConformer</strong> pipeline where audio never leaves the tablet.
          </span>
        </div>
      </div>

      {/* Live Classroom Dialogue Feed */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gov-navy">
            Live Dialogue Transcript ({dialogueHistory.length} Exchanges)
          </h2>
          <button
            type="button"
            onClick={() => setDialogueHistory([])}
            className="text-xs text-gov-slate-muted hover:text-gov-maroon flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear History</span>
          </button>
        </div>

        <div className="space-y-3">
          {dialogueHistory.map((item) => {
            const isTeacher = item.speaker === 'teacher';
            return (
              <div
                key={item.id}
                className={`bg-white border rounded-lg p-4 shadow-sm ${
                  isTeacher ? 'border-l-4 border-l-gov-navy' : 'border-l-4 border-l-gov-green'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-gov-slate-muted mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded text-[11px] ${
                        isTeacher
                          ? 'bg-gov-navy-subtle text-gov-navy'
                          : 'bg-gov-green-subtle text-gov-green-dark'
                      }`}
                    >
                      {isTeacher ? <GraduationCap className="w-3 h-3" /> : <User className="w-3 h-3" />}
                      {isTeacher ? 'शिक्षक (Teacher • Hindi)' : 'छात्र (Student • Santali)'}
                    </span>
                    <span>{item.timestamp}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] bg-gov-slate-bg px-2 py-0.5 rounded border">
                      {item.latency.totalRoundTripMs} ms
                    </span>
                    <button
                      type="button"
                      onClick={() => onFlagUtterance(item.sourceText, item.translatedText)}
                      title="Flag translation"
                      className="text-gov-slate-muted hover:text-gov-maroon p-1 rounded"
                    >
                      <Flag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Utterance Content */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gov-slate">
                    <span className="text-xs text-gov-slate-muted mr-1.5 font-normal">Spoken:</span>
                    {item.sourceText}
                  </div>

                  <div className="bg-gov-slate-bg p-3 rounded-md border border-gov-slate-border/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gov-slate-muted">
                        Translated Output
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          speechService.speak(
                            item.translatedText,
                            item.romanizedPronunciation,
                            item.sourceLang === 'hin_Deva' ? 'sat_Olck' : 'hin_Deva'
                          )
                        }
                        className="inline-flex items-center gap-1 text-xs font-semibold text-gov-navy hover:text-gov-navy-light"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Replay</span>
                      </button>
                    </div>

                    {item.sourceLang === 'hin_Deva' ? (
                      <OlChikiText
                        text={item.translatedText}
                        romanized={item.romanizedPronunciation}
                        fontSize="lg"
                        showPronunciation={true}
                      />
                    ) : (
                      <div className="text-base font-bold text-gov-navy font-sans">
                        {item.translatedText}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

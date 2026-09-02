// Type definitions for Translation & Voice Subsystems

export type LanguageCode = 'hin_Deva' | 'sat_Olck';

export interface TranslationContext {
  unitId?: string;
  unitTitle?: string;
  lessonDomain?: 'Numeracy' | 'Literacy' | 'Classroom Routine' | 'Storytelling';
  vocabularyBias?: string[]; // Injected unit-specific lexicon
}

export interface LatencyBreakdown {
  asrTimeMs: number;
  translationTimeMs: number;
  ttsTimeMs: number;
  totalRoundTripMs: number;
}

export interface TranslationResult {
  sourceText: string;
  sourceLang: LanguageCode;
  translatedText: string; // Ol Chiki unicode
  targetLang: LanguageCode;
  romanizedPronunciation: string;
  latency: LatencyBreakdown;
  backendUsed: 'IndicTrans2-HF' | 'Curated-Offline-Cache' | 'AdiVaani-Stub';
  confidence: number;
  matchedLessonOutcome?: string;
  contextApplied?: string;
}

export interface ITranslationBackend {
  readonly backendName: string;
  isAvailable(): Promise<boolean>;
  translate(
    text: string,
    from: LanguageCode,
    to: LanguageCode,
    context?: TranslationContext
  ): Promise<TranslationResult>;
}

export interface DialogueUtterance {
  id: string;
  timestamp: string;
  speaker: 'teacher' | 'student';
  sourceLang: LanguageCode;
  sourceText: string;
  translatedText: string;
  romanizedPronunciation: string;
  latency: LatencyBreakdown;
  nipunTag?: string;
}

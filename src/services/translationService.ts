// Translation Service Architecture — SAMVAAD
// Implements Adapter Pattern with swappable backends (IndicTrans2-HF / Curated Offline / Adi Vaani stub)

import { LanguageCode, TranslationContext, TranslationResult, ITranslationBackend, LatencyBreakdown } from '../types/translation';
import { TRANSLATION_CORPUS, TranslationEntry } from '../data/translationDictionary';
import { MASTER_VOCABULARY } from '../data/vocabData';

/**
 * Curated Offline Backend
 * High-speed, zero-network deterministic translation for classroom FLN phrases.
 * Supports context-biasing with active lesson vocabulary.
 */
export class CuratedOfflineBackend implements ITranslationBackend {
  readonly backendName = 'Curated-Offline-Cache' as const;

  async isAvailable(): Promise<boolean> {
    return true; // Always available offline
  }

  async translate(
    text: string,
    from: LanguageCode,
    to: LanguageCode,
    context?: TranslationContext
  ): Promise<TranslationResult> {
    const startTime = performance.now();
    const cleanSource = text.trim().toLowerCase();

    let bestMatch: TranslationEntry | null = null;
    let highestScore = 0;

    // Search corpus with context biasing
    for (const entry of TRANSLATION_CORPUS) {
      let score = 0;

      if (from === 'hin_Deva') {
        const entryHindi = entry.hindi.toLowerCase();
        if (cleanSource === entryHindi) {
          score = 100;
        } else if (cleanSource.includes(entryHindi) || entryHindi.includes(cleanSource)) {
          score = 70;
        } else {
          // Keyword overlap
          for (const kw of entry.keywords) {
            if (cleanSource.includes(kw.toLowerCase())) {
              score += 25;
            }
          }
        }
      } else {
        // Santali to Hindi
        const entrySantali = entry.santaliOlChiki;
        const entryRoman = entry.romanized.toLowerCase();
        if (cleanSource === entrySantali || cleanSource === entryRoman) {
          score = 100;
        } else if (entrySantali.includes(cleanSource) || cleanSource.includes(entryRoman)) {
          score = 75;
        }
      }

      // Apply lesson context bias boost
      if (context?.lessonDomain && entry.domain === context.lessonDomain) {
        score += 20;
      }
      if (context?.vocabularyBias && context.vocabularyBias.length > 0) {
        for (const biasWord of context.vocabularyBias) {
          if (entry.hindi.includes(biasWord) || entry.santaliOlChiki.includes(biasWord)) {
            score += 30;
          }
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = entry;
      }
    }

    const elapsed = Math.max(1, Math.round(performance.now() - startTime));

    const latency: LatencyBreakdown = {
      asrTimeMs: 0,
      translationTimeMs: elapsed,
      ttsTimeMs: 0,
      totalRoundTripMs: elapsed
    };

    if (bestMatch && highestScore >= 25) {
      if (from === 'hin_Deva') {
        return {
          sourceText: text,
          sourceLang: from,
          translatedText: bestMatch.santaliOlChiki,
          targetLang: to,
          romanizedPronunciation: bestMatch.romanized,
          latency,
          backendUsed: 'Curated-Offline-Cache',
          confidence: Math.min(0.98, highestScore / 100),
          matchedLessonOutcome: bestMatch.nipunCode,
          contextApplied: context?.unitTitle ? `Unit: ${context.unitTitle}` : undefined
        };
      } else {
        return {
          sourceText: text,
          sourceLang: from,
          translatedText: bestMatch.hindi,
          targetLang: to,
          romanizedPronunciation: bestMatch.romanized,
          latency,
          backendUsed: 'Curated-Offline-Cache',
          confidence: Math.min(0.98, highestScore / 100),
          matchedLessonOutcome: bestMatch.nipunCode,
          contextApplied: context?.unitTitle ? `Unit: ${context.unitTitle}` : undefined
        };
      }
    }

    // Fallback: Word-by-word vocabulary synthesis if full sentence not in corpus
    const matchedVocab = MASTER_VOCABULARY.find(
      (v) => cleanSource.includes(v.hindiWord.toLowerCase()) || cleanSource.includes(v.santaliOlChiki)
    );

    if (matchedVocab) {
      return {
        sourceText: text,
        sourceLang: from,
        translatedText: from === 'hin_Deva' ? matchedVocab.santaliOlChiki : matchedVocab.hindiWord,
        targetLang: to,
        romanizedPronunciation: matchedVocab.romanizedPronunciation,
        latency,
        backendUsed: 'Curated-Offline-Cache',
        confidence: 0.85,
        contextApplied: 'Vocabulary Direct Match'
      };
    }

    // Honest fallback when text is not recognized in offline prototype
    return {
      sourceText: text,
      sourceLang: from,
      translatedText: from === 'hin_Deva' ? 'ᱟᱸᱡᱚᱢ ᱯᱮ (ᱚᱯᱷᱞᱟᱭᱤᱱ ᱠᱮᱥ)' : 'सुनिए (ऑफलाइन कोष)',
      targetLang: to,
      romanizedPronunciation: 'Anjom pe (offline fallback)',
      latency,
      backendUsed: 'Curated-Offline-Cache',
      confidence: 0.5,
      contextApplied: 'Generic Classroom Fallback'
    };
  }
}

/**
 * HuggingFace / AI4Bharat IndicTrans2 Hosted Inference Endpoint Adapter
 * Configurable with custom HF Inference API URL & Token
 */
export class IndicTrans2HFBackend implements ITranslationBackend {
  readonly backendName = 'IndicTrans2-HF' as const;
  private endpointUrl: string;
  private apiToken?: string;

  constructor(endpointUrl = 'https://api-inference.huggingface.co/models/ai4bharat/indictrans2-indic-indic-1B', apiToken?: string) {
    this.endpointUrl = endpointUrl;
    this.apiToken = apiToken;
  }

  async isAvailable(): Promise<boolean> {
    return navigator.onLine && !!this.apiToken;
  }

  async translate(
    text: string,
    from: LanguageCode,
    to: LanguageCode,
    context?: TranslationContext
  ): Promise<TranslationResult> {
    const startTime = performance.now();

    if (!navigator.onLine || !this.apiToken) {
      // Fallback automatically to curated offline backend
      const fallback = new CuratedOfflineBackend();
      const result = await fallback.translate(text, from, to, context);
      return {
        ...result,
        backendUsed: 'Curated-Offline-Cache'
      };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

      const response = await fetch(this.endpointUrl, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: text,
          parameters: {
            src_lang: from === 'hin_Deva' ? 'hin_Deva' : 'sat_Olck',
            tgt_lang: to === 'sat_Olck' ? 'sat_Olck' : 'hin_Deva'
          }
        })
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HF API HTTP ${response.status}`);
      }

      const data = await response.json();
      const translatedText = Array.isArray(data) ? data[0]?.translation_text || data[0]?.generated_text : data.translation_text;
      const elapsed = Math.round(performance.now() - startTime);

      return {
        sourceText: text,
        sourceLang: from,
        translatedText: translatedText || '...',
        targetLang: to,
        romanizedPronunciation: 'Live AI4Bharat Output',
        latency: {
          asrTimeMs: 0,
          translationTimeMs: elapsed,
          ttsTimeMs: 0,
          totalRoundTripMs: elapsed
        },
        backendUsed: 'IndicTrans2-HF',
        confidence: 0.94,
        contextApplied: context?.unitTitle ? `Biased: ${context.unitTitle}` : undefined
      };
    } catch {
      // Gracefully fall back to offline cache and record real elapsed fallback time
      const fallback = new CuratedOfflineBackend();
      const result = await fallback.translate(text, from, to, context);
      const totalElapsed = Math.round(performance.now() - startTime);
      return {
        ...result,
        latency: {
          ...result.latency,
          translationTimeMs: totalElapsed,
          totalRoundTripMs: totalElapsed
        },
        backendUsed: 'Curated-Offline-Cache'
      };
    }
  }
}

/**
 * Singleton Translation Service
 */
class TranslationService {
  private activeBackend: ITranslationBackend;
  private offlineBackend: CuratedOfflineBackend;
  private hfBackend: IndicTrans2HFBackend;
  private isForcedOffline: boolean = false;

  constructor() {
    this.offlineBackend = new CuratedOfflineBackend();
    this.hfBackend = new IndicTrans2HFBackend();
    this.activeBackend = this.offlineBackend;
  }

  public setOfflineMode(forcedOffline: boolean) {
    this.isForcedOffline = forcedOffline;
    if (forcedOffline) {
      this.activeBackend = this.offlineBackend;
    } else {
      this.activeBackend = this.hfBackend;
    }
  }

  public getIsForcedOffline(): boolean {
    return this.isForcedOffline;
  }

  public async translate(
    text: string,
    from: LanguageCode,
    to: LanguageCode,
    context?: TranslationContext
  ): Promise<TranslationResult> {
    if (this.isForcedOffline) {
      return this.offlineBackend.translate(text, from, to, context);
    }
    return this.activeBackend.translate(text, from, to, context);
  }

  public getActiveBackendName(): string {
    return this.activeBackend.backendName;
  }
}

export const translationService = new TranslationService();

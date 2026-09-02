// Type definitions for Foundational Literacy and Numeracy (FLN) Curriculum

export type TeachingBeatType = 'instruction' | 'example' | 'question' | 'expected_response';

export interface TeachingBeat {
  id: string;
  beatIndex: number;
  beatType: TeachingBeatType;
  title: string;
  hindiText: string;
  santaliOlChiki: string;
  romanizedPronunciation: string;
  pedagogicalNote?: string;
  nipunOutcomeCode: string;
  nipunOutcomeDescription: string;
  audioDurationSeconds?: number;
  status?: 'verified' | 'draft' | 'failed';
  translationError?: string;
}

export interface VocabularyItem {
  id: string;
  hindiWord: string;
  santaliOlChiki: string;
  romanizedPronunciation: string;
  englishMeaning: string;
  category: 'number' | 'object' | 'action' | 'greeting' | 'animal' | 'nature';
  iconSvgName?: string;
  exampleSentenceHindi?: string;
  exampleSentenceSantali?: string;
}

export interface FLNUnit {
  id: string;
  unitNumber: number;
  gradeLevel: 'Grade 1' | 'Grade 2' | 'Balvatika (Pre-primary)';
  domain: 'Numeracy' | 'Literacy' | 'Classroom Routine' | 'Storytelling';
  titleHindi: string;
  titleSantali: string;
  titleEnglish: string;
  description: string;
  status?: 'verified' | 'draft';
  reviewedBy?: string;
  reviewedAt?: string;
  targetNipunCompetencies: {
    code: string;
    descriptionHindi: string;
    descriptionEnglish: string;
  }[];
  beats: TeachingBeat[];
  keyVocabulary: VocabularyItem[];
}

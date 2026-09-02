// Type definitions for Teacher Correction Loop & CRC/BRC Sync Queue

export interface TeacherCorrection {
  id: string;
  timestamp: string;
  sourceTextHindi: string;
  originalSantaliTranslation: string;
  suggestedSantaliTranslation: string;
  suggestedRomanized?: string;
  correctionCategory: 'dialect_variation' | 'grammar_error' | 'inappropriate_pedagogy' | 'spelling_olchiki';
  teacherNotes: string;
  unitId?: string;
  schoolUdiseCode: string;
  districtCluster: string;
  status: 'pending_sync' | 'synced_to_crc' | 'reviewed_by_diet';
}

export interface SyncStats {
  totalPending: number;
  lastSyncAttempt?: string;
  localQueueSize: number;
}

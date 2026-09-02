import { TeacherCorrection } from '../types/correction';

const STORAGE_KEY = 'samvaad_teacher_corrections';

const SEED_CORRECTIONS: TeacherCorrection[] = [
  {
    id: 'corr-001',
    timestamp: '2026-09-02T08:45:00Z',
    sourceTextHindi: 'अपनी जगह पर बैठ जाओ।',
    originalSantaliTranslation: 'ᱟᱯᱱᱟᱨᱟᱜ ᱴᱷᱟᱶ ᱨᱮ ᱫᱩᱲᱩᱵ ᱯᱮ᱾',
    suggestedSantaliTranslation: 'ᱟᱯᱱᱟᱨᱟᱜ ᱢᱟᱹᱪᱤ ᱨᱮ ᱫᱩᱲᱩᱵ ᱯᱮ᱾',
    suggestedRomanized: 'Apnarag machi re durub pe.',
    correctionCategory: 'dialect_variation',
    teacherNotes: 'In Dumka cluster, "machi" (bench/seat) is more intuitive for Grade 1 students than "thawn" (place).',
    unitId: 'fln-unit-1-routine',
    schoolUdiseCode: '20040105602',
    districtCluster: 'Dumka-East CRC',
    status: 'pending_sync'
  },
  {
    id: 'corr-002',
    timestamp: '2026-09-02T10:15:00Z',
    sourceTextHindi: 'दो आँखें हैं।',
    originalSantaliTranslation: 'ᱵᱟᱨ ᱢᱮᱫ ᱢᱮᱱᱟᱜ-ᱟ᱾',
    suggestedSantaliTranslation: 'ᱵᱟᱨᱭᱟ ᱢᱮᱫ ᱢᱮᱱᱟᱜ-ᱟ᱾',
    suggestedRomanized: 'Barya med menag-a.',
    correctionCategory: 'grammar_error',
    teacherNotes: 'Dual classifier "-ya" (ᱵᱟᱨᱭᱟ) is grammatically required when quantifying body parts.',
    unitId: 'fln-unit-2-counting',
    schoolUdiseCode: '20040105602',
    districtCluster: 'Dumka-East CRC',
    status: 'pending_sync'
  }
];

export class OfflineSyncService {
  private corrections: TeacherCorrection[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        this.corrections = JSON.parse(data);
      } else {
        this.corrections = SEED_CORRECTIONS;
        this.saveToStorage();
      }
    } catch {
      this.corrections = SEED_CORRECTIONS;
    }
  }

  private saveToStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.corrections));
    } catch {
      // Storage quota limit fallback
    }
  }

  public getCorrections(): TeacherCorrection[] {
    return [...this.corrections];
  }

  public getPendingCount(): number {
    return this.corrections.filter((c) => c.status === 'pending_sync').length;
  }

  public addCorrection(correction: Omit<TeacherCorrection, 'id' | 'timestamp' | 'status'>): TeacherCorrection {
    const newEntry: TeacherCorrection = {
      ...correction,
      id: `corr-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'pending_sync'
    };

    this.corrections.unshift(newEntry);
    this.saveToStorage();
    return newEntry;
  }

  public simulateCrcSync(): { syncedCount: number; message: string } {
    const pending = this.corrections.filter((c) => c.status === 'pending_sync');
    const count = pending.length;

    this.corrections = this.corrections.map((c) => ({
      ...c,
      status: 'synced_to_crc' as const
    }));

    this.saveToStorage();

    return {
      syncedCount: count,
      message: `Successfully synchronized ${count} correction package(s) to CRC/BRC Education Server.`
    };
  }

  public exportAsJson(): string {
    return JSON.stringify(this.corrections, null, 2);
  }

  public clearSynced(): void {
    this.corrections = this.corrections.filter((c) => c.status === 'pending_sync');
    this.saveToStorage();
  }
}

export const offlineSyncService = new OfflineSyncService();

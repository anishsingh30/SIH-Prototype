# 🇮🇳 SAMVAAD (संवाद | ᱥᱟᱱᱛᱟᱲᱤ)
### Bilingual FLN Classroom Pedagogy Companion for Primary School Education
**Smart India Hackathon 2026** | **Problem Statement ID: SIH26042 (Smart Education)**  
**Target Region**: Dumka & Santhal Pargana, Jharkhand (`UDISE: 20040105602`)  
**Language Pair**: Hindi (`hin_Deva`) ⟷ Santali (`sat_Olck` in authentic Ol Chiki script `U+1C50`–`U+1C7F`)

---

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Expo SDK](https://img.shields.io/badge/Expo-SDK%2054-000020.svg)](https://expo.dev/)
[![NIPUN Bharat](https://img.shields.io/badge/Aligned-NIPUN%20Bharat%20FLN-green.svg)](https://www.education.gov.in/nipun-bharat)

---

## 📌 1. The Challenge & Pedagogical Mission

In tribal primary schools across Jharkhand, children enter Grade 1 speaking **Santali** (their mother tongue). In contrast, state-appointed teachers primarily communicate in **Hindi**, and standardized textbooks (such as JCERT *Palash*) are printed in Devanagari.

This linguistic gap creates an immediate barrier during the critical Grade 1–2 Foundational Literacy and Numeracy (FLN) period.

**SAMVAAD (संवाद)** bridges this divide with an offline-resilient, teacher-in-the-loop pedagogical assistant that delivers:
1. **5-Beat Lesson Flow Mapping**: Translates structured Hindi teacher prompts to authentic Santali Ol Chiki with phonetic guides.
2. **Sub-3-Second Live Voice Bridge**: Real-time bidirectional verbal communication with domain-specific curriculum biasing.
3. **Bidirectional Worksheet & Flashcard Generator**: Instant printable classroom exercises and audio flashcards in both Hindi ➔ Santali and Santali ➔ Hindi orientations.
4. **Cluster Resource Centre (CRC) Feedback Queue**: Zero-internet offline storage allowing teachers to flag translations for cluster coordinator verification and model improvement.

---

## 🌟 2. Key Modules & Capabilities

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          SAMVAAD ARCHITECTURE                           │
├───────────────────┬───────────────────┬───────────────────┬─────────────┤
│ 1. Lesson Flow    │ 2. Live Voice     │ 3. Worksheets &   │ 4. CRC Sync │
│ (5-Beat Pedagogy) │ (Bridge & ASR)    │ (Flashcards)      │ (Queue)     │
├───────────────────┼───────────────────┼───────────────────┼─────────────┤
│ • JCERT Palash    │ • Bidirectional   │ • Vice-Versa Mode │ • Offline   │
│ • Draft/Verified  │ • Context Biasing │ • True PDF Export │   Storage   │
│ • Workbook Import │ • Latency Monitor │ • Audio Cards     │ • Batch Sync│
└───────────────────┴───────────────────┴───────────────────┴─────────────┘
```

### 📖 Module 1: FLN Lesson Flow (पाठ योजना)
- **5 Standardized Pedagogical Beats**:
  1. *Attention Hook (ध्यानाकर्षण)*
  2. *Concept Introduction (अवधारणा परिचय)*
  3. *Guided Practice (निर्देशित अभ्यास)*
  4. *Independent Task (स्वतंत्र कार्य)*
  5. *Closure & Home Linkage (समापन एवं गृहकार्य)*
- **Draft vs Verified Review State**:
  - Pre-verified JCERT curriculum carries a green `✓ Verified PALASH` badge.
  - Uploaded/custom workbooks enter a `⚠ Draft` state.
  - Teachers can review beats and promote them via **`✓ Mark as Reviewed & Verified`**.
- **Workbook Ingestion**: Support for PDF and text-based workbook parsing.

### 🎙️ Module 2: Live Voice Bridge (प्रत्यक्ष संवाद)
- **Bidirectional Translation**: Teacher (Hindi) ➔ Student (Santali) and Student (Santali) ➔ Teacher (Hindi).
- **Curriculum Context Biasing**: Dynamically biases ASR and MT engines toward the active lesson's vocabulary.
- **Latency Breakdown Telemetry**: Real-time measurement across ASR, MT, and TTS stages, ensuring compliance with the `< 3.0s Live Classroom Threshold`.

### 📝 Module 3: Worksheets & Flashcard Deck (अभ्यास पत्रक)
- **Bidirectional (Vice-Versa) Modes**:
  - **Hindi ➔ Santali**: Column A Hindi, Column B Ol Chiki; fill-in-blanks with Ol Chiki word bank.
  - **Santali ➔ Hindi**: Column A Ol Chiki, Column B Hindi; fill-in-blanks with Hindi word bank.
- **True PDF Export**: One-click generation of print-ready A4 worksheets with student roll numbers, matching tasks, and Teacher Assessment checkboxes.
- **Audio Flashcards**: Interactive cards with Ol Chiki script, Romanized phonetics, and audio pronunciation.

### 🔄 Module 4: Teacher Feedback & CRC Sync Queue (सीआरसी कतार)
- **Offline Persistence**: Flags and mistranslation reports are saved locally in `localStorage` without requiring internet.
- **CRC Cluster Verification**: Coordinators review dialect variations and batch-sync verified corrections to improve central models.
- **Data Export**: Single-click export to CSV / JSON for district academic administration.

---

## 🛠️ 3. Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 18.3.1, TypeScript 5.5, Vite 6 |
| **Styling & Theme** | TailwindCSS 3.4 (Government Navy & Saffron theme, WCAG AA compliant) |
| **Icons** | `lucide-react` |
| **Document Processing** | `pdfjs-dist`, `html2pdf.js`, `jspdf`, `html2canvas` |
| **Mobile Containers** | Direct Responsive PWA / Mobile Web, Expo SDK 54 (`expo-app/`), Capacitor Android (`android/`) |
| **Linguistic Standard** | Authentic Unicode Ol Chiki (`sat_Olck`, `U+1C50`–`U+1C7F`) & Romanized IPA phonetics |

---

## 🚀 4. Quick Start & Setup

### Prerequisites
- Node.js (v18.x or v20.x recommended)
- `npm` or `yarn`

### Installation
```bash
# 1. Clone repository
git clone https://github.com/your-username/samvaad-fln-pedagogy.git
cd samvaad-fln-pedagogy

# 2. Install main dependencies
npm install

# 3. (Optional) Install companion Expo wrapper dependencies
npm install --prefix expo-app
```

### Running the Web Application
```bash
# Start Vite development server (accessible over local Wi-Fi)
npm run dev -- --host 0.0.0.0
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📱 5. Mobile Testing Workflows

### Option A: Direct Mobile Browser (Zero Setup)
1. Ensure your mobile device is on the same Wi-Fi network.
2. Open Chrome or Safari on your phone and navigate to `http://<YOUR_COMPUTER_IP>:5173`.
3. Experience the mobile bottom navigation bar and touch-friendly interface.

### Option B: Expo Go Mobile App (SDK 54)
```bash
cd expo-app
npx expo start --clear
```
Scan the QR code or enter `exp://<YOUR_COMPUTER_IP>:8081` in the **Expo Go** mobile app.

### Option C: Standalone Android APK (Capacitor)
```bash
npm run build
npx cap sync android
# Open ./android in Android Studio to build and deploy APK
```

---

## 📂 6. Repository Structure

```text
├── src/
│   ├── components/
│   │   ├── Header.tsx              # Govt header, offline toggle & mobile bottom nav
│   │   ├── LessonTranslator/       # Module 1: 5-beat lesson viewer & review state
│   │   ├── VoiceBridge/            # Module 2: Voice bridge & latency telemetry
│   │   ├── Worksheets/             # Module 3: Worksheets, PDF export & flashcards
│   │   └── Corrections/            # Module 4: CRC feedback & offline sync queue
│   ├── data/
│   │   ├── flnCurriculumData.ts    # 5 master FLN units aligned with JCERT
│   │   ├── vocabData.ts            # 34 verified Ol Chiki vocabulary entries
│   │   └── translationDictionary.ts# 40+ cached bidirectional sentence pairs
│   ├── services/
│   │   ├── translationService.ts   # IndicTrans2 API + Offline Cache router
│   │   ├── speechService.ts        # Speech recognition & audio synthesis
│   │   └── workbookParserService.ts# PDF/Text workbook ingestion parser
│   ├── types/                      # TypeScript schemas (curriculum, translation, etc.)
│   └── styles/                     # Tailwind CSS & Ol Chiki typography
├── expo-app/                       # Expo SDK 54 mobile wrapper
├── android/                        # Capacitor native Android configuration
├── HANDOFF_AND_PROJECT_GUIDE.md    # Detailed team onboarding & technical guide
├── PROTOTYPE_OVERVIEW.md           # Prototype architecture and feature guide
└── .gitignore                      # Comprehensive Git exclusion rules
```

---

## 📜 7. License & Acknowledgements
- Developed for **Smart India Hackathon 2026** (Problem Statement: **SIH26042**).
- Aligned with **Ministry of Education, Government of India (Samagra Shiksha)** & **NIPUN Bharat Guidelines**.
- Distributed under the [MIT License](LICENSE).

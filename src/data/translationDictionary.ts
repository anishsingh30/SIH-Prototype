// Verified Hindi ↔ Santali Ol Chiki Translation Corpus
// Used for offline pedagogy cache and context-biased sentence resolution

export interface TranslationEntry {
  hindi: string;
  santaliOlChiki: string;
  romanized: string;
  domain: 'Classroom Routine' | 'Numeracy' | 'Literacy' | 'Storytelling' | 'General';
  keywords: string[];
  nipunCode?: string;
}

export const TRANSLATION_CORPUS: TranslationEntry[] = [
  // Greetings & Social
  {
    hindi: 'नमस्ते',
    santaliOlChiki: 'ᱡᱚᱦᱟᱨ',
    romanized: 'Johar',
    domain: 'Literacy',
    keywords: ['नमस्ते', 'प्रणाम', 'hello', 'greeting'],
    nipunCode: 'LO-FLN-H1.06'
  },
  {
    hindi: 'शुभ प्रभात',
    santaliOlChiki: 'ᱥᱟᱹᱜᱩᱱ ᱥᱮᱛᱟᱜ',
    romanized: 'Sagun setag',
    domain: 'Literacy',
    keywords: ['शुभ प्रभात', 'सुबह', 'morning'],
    nipunCode: 'LO-FLN-H1.06'
  },
  {
    hindi: 'तुम्हारा नाम क्या है?',
    santaliOlChiki: 'ᱟᱢᱟᱜ ᱧᱩᱛᱩᱢ ᱫᱚ ᱪᱮᱫ?',
    romanized: 'Amag nyutum do ched?',
    domain: 'Literacy',
    keywords: ['नाम', 'तुम्हारा', 'name', 'who'],
    nipunCode: 'LO-FLN-H1.07'
  },
  {
    hindi: 'मेरा नाम सोमराय है।',
    santaliOlChiki: 'ᱤᱧᱟᱜ ᱧᱩᱛᱩᱢ ᱫᱚ ᱥᱚᱢᱨᱟᱭ ᱠᱟᱱᱟ᱾',
    romanized: 'Inyag nyutum do Somray kana.',
    domain: 'Literacy',
    keywords: ['मेरा नाम', 'नाम'],
    nipunCode: 'LO-FLN-H1.07'
  },
  {
    hindi: 'आप कैसे हैं?',
    santaliOlChiki: 'ᱟᱢ ᱪᱮᱫ ᱞᱮᱠᱟ ᱢᱮᱱᱟᱢᱟ?',
    romanized: 'Am ched leka menama?',
    domain: 'Literacy',
    keywords: ['कैसे', 'हाल', 'how are you'],
    nipunCode: 'LO-FLN-H1.08'
  },
  {
    hindi: 'मैं ठीक हूँ।',
    santaliOlChiki: 'ᱤᱧ ᱵᱮ Bes ᱜᱮ ᱢᱤᱱᱟᱹᱧᱟ᱾',
    romanized: 'Iny bes ge minanya.',
    domain: 'Literacy',
    keywords: ['ठीक', 'fine'],
    nipunCode: 'LO-FLN-H1.08'
  },
  {
    hindi: 'क्या तुमने खाना खाया?',
    santaliOlChiki: 'ᱪᱮᱫ ᱟᱢ ᱫᱟᱠᱟᱢ ᱡᱚᱢ ᱟᱠᱟᱫ-ᱟ?',
    romanized: 'Ched am dakam jom akad-a?',
    domain: 'Literacy',
    keywords: ['खाना', 'भोजन', 'भात', 'eat'],
    nipunCode: 'LO-FLN-H1.08'
  },
  {
    hindi: 'हाँ, मैंने खाना खा लिया।',
    santaliOlChiki: 'ᱦᱮᱸ, ᱤᱧ ᱫᱟᱠᱟᱧ ᱡᱚᱢ ᱟᱠᱟᱫ-ᱟ᱾',
    romanized: 'Hen, iny dakanj jom akad-a.',
    domain: 'Literacy',
    keywords: ['हाँ', 'खा लिया'],
    nipunCode: 'LO-FLN-H1.08'
  },

  // Classroom Instructions
  {
    hindi: 'सब बच्चे खड़े हो जाओ।',
    santaliOlChiki: 'ᱡᱚᱛᱚ ᱜᱤᱫᱽᱨᱟᱹ ᱛᱤᱸᱜᱩᱱ ᱯᱮ᱾',
    romanized: 'Joto gidra tingun pe.',
    domain: 'Classroom Routine',
    keywords: ['खड़े', 'stand'],
    nipunCode: 'LO-FLN-H1.01'
  },
  {
    hindi: 'अपनी जगह पर बैठ जाओ।',
    santaliOlChiki: 'ᱟᱯᱱᱟᱨᱟᱜ ᱴᱷᱟᱶ ᱨᱮ ᱫᱩᱲᱩᱵ ᱯᱮ᱾',
    romanized: 'Apnarag thawn re durub pe.',
    domain: 'Classroom Routine',
    keywords: ['बैठ', 'sit'],
    nipunCode: 'LO-FLN-H1.01'
  },
  {
    hindi: 'सीधी कतार में खड़े हो जाओ।',
    santaliOlChiki: 'ᱥᱚᱡᱷᱮ ᱛᱷᱟᱨ ᱨᱮ ᱛᱤᱸᱜᱩᱱ ᱯᱮ᱾',
    romanized: 'Sojhe thar re tingun pe.',
    domain: 'Classroom Routine',
    keywords: ['कतार', 'लाइन', 'line', 'queue'],
    nipunCode: 'LO-FLN-H1.01'
  },
  {
    hindi: 'किताब खोलो।',
    santaliOlChiki: 'ᱯᱩᱛᱷᱤ ᱡᱷᱤᱡᱽ ᱯᱮ᱾',
    romanized: 'Puthi jhij pe.',
    domain: 'Classroom Routine',
    keywords: ['किताब', 'खोलो', 'open', 'book'],
    nipunCode: 'LO-FLN-H1.02'
  },
  {
    hindi: 'पृष्ठ संख्या चार खोलो।',
    santaliOlChiki: 'ᱥᱟᱠᱟᱢ ᱯᱩᱱ ᱡᱷᱤᱡᱽ ᱯᱮ᱾',
    romanized: 'Sakam pun jhij pe.',
    domain: 'Classroom Routine',
    keywords: ['पृष्ठ', 'चार', 'page'],
    nipunCode: 'LO-FLN-H1.02'
  },
  {
    hindi: 'शांत रहो और सुनो।',
    santaliOlChiki: 'ᱛᱷᱤᱨᱩᱜ ᱯᱮ ᱟᱨ ᱟᱸᱡᱚᱢ ᱯᱮ᱾',
    romanized: 'Thirug pe ar anjom pe.',
    domain: 'Classroom Routine',
    keywords: ['शांत', 'सुनो', 'quiet', 'listen'],
    nipunCode: 'LO-FLN-H1.01'
  },
  {
    hindi: 'स्लेट पर लिखो।',
    santaliOlChiki: 'ᱥᱞᱮᱴ ᱨᱮ ᱚᱞ ᱯᱮ᱾',
    romanized: 'Slet re ol pe.',
    domain: 'Classroom Routine',
    keywords: ['स्लेट', 'लिखो', 'write'],
    nipunCode: 'LO-FLN-H1.03'
  },
  {
    hindi: 'हाथ ऊपर करो।',
    santaliOlChiki: 'ᱛᱤ ᱪᱮᱛᱟᱱ ᱛᱩᱞ ᱯᱮ᱾',
    romanized: 'Ti cetan tul pe.',
    domain: 'Classroom Routine',
    keywords: ['हाथ', 'ऊपर', 'hands up'],
    nipunCode: 'LO-FLN-H1.01'
  },

  // Numeracy & Counting
  {
    hindi: 'गिनती करो।',
    santaliOlChiki: 'ᱞᱮᱠᱷᱟᱭ ᱢᱮ᱾',
    romanized: 'Lekhay me.',
    domain: 'Numeracy',
    keywords: ['गिनती', 'count'],
    nipunCode: 'LO-FLN-M1.01'
  },
  {
    hindi: 'एक, दो, तीन, चार, पाँच।',
    santaliOlChiki: 'ᱢᱤᱫ, ᱵᱟᱨ, ᱯᱮ, ᱯᱩᱱ, ᱢᱚᱬᱮ᱾',
    romanized: 'Mid, bar, pe, pun, mone.',
    domain: 'Numeracy',
    keywords: ['एक', 'दो', 'तीन', 'चार', 'पाँच', '1', '2', '3', '4', '5'],
    nipunCode: 'LO-FLN-M1.01'
  },
  {
    hindi: 'कितनी पेंसिल हैं?',
    santaliOlChiki: 'ᱛᱤᱱᱟᱹᱜ ᱯᱮᱱᱥᱤᱞ ᱢᱮᱱᱟᱜ-ᱟ?',
    romanized: 'Tinag pensil menag-a?',
    domain: 'Numeracy',
    keywords: ['कितनी', 'पेंसिल', 'how many'],
    nipunCode: 'LO-FLN-M1.03'
  },
  {
    hindi: 'तीन पेंसिल हैं।',
    santaliOlChiki: 'ᱯᱮᱭᱟ ᱯᱮᱱᱥᱤᱞ ᱢᱮᱱᱟᱜ-ᱟ᱾',
    romanized: 'Peya pensil menag-a.',
    domain: 'Numeracy',
    keywords: ['तीन', 'पेंसिल'],
    nipunCode: 'LO-FLN-M1.02'
  },
  {
    hindi: 'यहाँ चार पत्ते हैं।',
    santaliOlChiki: 'ᱱᱚᱸᱰᱮ ᱯᱩᱱᱭᱟᱹ ᱥᱟᱠᱟᱢ ᱢᱮᱱᱟᱜ-ᱟ᱾',
    romanized: 'Nonde punya sakam menag-a.',
    domain: 'Numeracy',
    keywords: ['चार', 'पत्ते', 'leaf'],
    nipunCode: 'LO-FLN-M1.02'
  },
  {
    hindi: 'पाँच आम हैं।',
    santaliOlChiki: 'ᱢᱚᱬᱮ ᱜᱚᱴᱟᱝ ᱩᱞ ᱢᱮᱱᱟᱜ-ᱟ᱾',
    romanized: 'Mone gotang ul menag-a.',
    domain: 'Numeracy',
    keywords: ['पाँच', 'आम', 'mango'],
    nipunCode: 'LO-FLN-M1.02'
  },

  // Story & Comprehension
  {
    hindi: 'कौवे की कहानी सुनो।',
    santaliOlChiki: 'ᱠᱟᱦᱩ ᱣᱟᱜ ᱠᱟᱹᱦᱱᱤ ᱟᱸᱡᱚᱢ ᱯᱮ᱾',
    romanized: 'Kahu wag kahni anjom pe.',
    domain: 'Storytelling',
    keywords: ['कौवा', 'कहानी', 'story'],
    nipunCode: 'LO-FLN-L1.01'
  },
  {
    hindi: 'कौवा बहुत प्यासा था।',
    santaliOlChiki: 'ᱠᱟᱦᱩ ᱟᱹᱰᱤ ᱛᱮᱛᱟᱝ ᱞᱮᱫᱮᱭᱟ᱾',
    romanized: 'Kahu adi tetang ledeya.',
    domain: 'Storytelling',
    keywords: ['प्यासा', 'thirsty'],
    nipunCode: 'LO-FLN-L1.01'
  },
  {
    hindi: 'घड़े में थोड़ा पानी था।',
    santaliOlChiki: 'ᱴᱩᱠᱩᱡ ᱨᱮ ᱠᱟᱹᱴᱤᱡ ᱫᱟᱜ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟ᱾',
    romanized: 'Tukuj re katij dag tahe kana.',
    domain: 'Storytelling',
    keywords: ['घड़ा', 'पानी', 'water'],
    nipunCode: 'LO-FLN-L1.01'
  },
  {
    hindi: 'उसने कंकड़ डाला।',
    santaliOlChiki: 'ᱩᱱᱤ ᱫᱷᱤᱨᱤ ᱠᱷᱟᱫᱽᱞᱮ ᱠᱮᱫ-ᱟ᱾',
    romanized: 'Uni dhiri khadle ked-a.',
    domain: 'Storytelling',
    keywords: ['कंकड़', 'पत्थर', 'pebble'],
    nipunCode: 'LO-FLN-L1.03'
  },
  {
    hindi: 'पानी ऊपर आ गया।',
    santaliOlChiki: 'ᱫᱟᱜ ᱪᱮᱛᱟᱱ ᱨᱟᱠᱟᱵ ᱮᱱᱟ᱾',
    romanized: 'Dag cetan rakab ena.',
    domain: 'Storytelling',
    keywords: ['ऊपर', 'पानी'],
    nipunCode: 'LO-FLN-L1.03'
  },

  // Body Parts & Physical Actions (Unit 5)
  {
    hindi: 'अपने सिर को हाथ से छुओ।',
    santaliOlChiki: 'ᱟᱯᱱᱟᱨᱟᱜ ᱵᱚᱦᱚᱜ ᱛᱤ ᱛᱮ ᱡᱚᱴᱮᱫ ᱯᱮ᱾',
    romanized: 'Apnarag bohog ti te joted pe.',
    domain: 'Literacy',
    keywords: ['सिर', 'माथा', 'छुओ', 'head', 'touch'],
    nipunCode: 'LO-FLN-H1.04'
  },
  {
    hindi: 'अपने दोनों हाथ आगे फैलाओ।',
    santaliOlChiki: 'ᱟᱯᱱᱟᱨᱟᱜ ᱵᱟᱱᱟᱨ ᱛᱤ ᱞᱟᱦᱟ ᱥᱮᱫ ᱯᱟᱥᱱᱟᱣ ᱯᱮ᱾',
    romanized: 'Apnarag banar ti laha sed pasnaw pe.',
    domain: 'Classroom Routine',
    keywords: ['हाथ', 'आगे', 'hands forward'],
    nipunCode: 'LO-FLN-H1.01'
  },
  {
    hindi: 'हम किस अंग से देखते हैं?',
    santaliOlChiki: 'ᱟᱵᱚ ᱚᱠᱟ ᱦᱟᱹᱴᱤᱧ ᱛᱮᱵᱚᱱ ᱧᱮᱞᱟ?',
    romanized: 'Abo oka hatiny tebon nyela?',
    domain: 'Literacy',
    keywords: ['अंग', 'देखते', 'see', 'eyes'],
    nipunCode: 'LO-FLN-H1.05'
  },
  {
    hindi: 'हम आँखों से देखते हैं।',
    santaliOlChiki: 'ᱟᱵᱚ ᱢᱮᱫ ᱛᱮᱵᱚᱱ ᱧᱮᱞᱟ᱾',
    romanized: 'Abo med tebon nyela.',
    domain: 'Literacy',
    keywords: ['आँख', 'देखते', 'eyes'],
    nipunCode: 'LO-FLN-H1.05'
  }
];

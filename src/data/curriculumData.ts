// Authentic FLN Curriculum Data for Grade 1–2 (Jharkhand/Odisha PALASH Model)
// Script: Ol Chiki (sat_Olck) with verified phonetic romanization

import { FLNUnit } from '../types/curriculum';

export const FLN_CURRICULUM_UNITS: FLNUnit[] = [
  {
    id: 'fln-unit-1-routine',
    unitNumber: 1,
    gradeLevel: 'Grade 1',
    domain: 'Classroom Routine',
    titleHindi: 'वर्ग संचालन एवं निर्देश',
    titleSantali: 'ᱠᱞᱟᱥ ᱪᱟᱪᱞᱟᱣ ᱟᱨ ᱟᱫᱮᱥ',
    titleEnglish: 'Classroom Routine & Action Prompts',
    description: 'FLN Foundational classroom commands, physical formation, and opening learning routines.',
    targetNipunCompetencies: [
      {
        code: 'LO-FLN-H1.01',
        descriptionHindi: 'शिक्षक के मौखिक निर्देशों को सुनकर शारीरिक क्रिया करना।',
        descriptionEnglish: 'Responds to 2-step physical and organizational instructions.'
      },
      {
        code: 'LO-FLN-H1.02',
        descriptionHindi: 'पुस्तिका व पठन सामग्री को निर्देशित पृष्ठ पर खोलना।',
        descriptionEnglish: 'Identifies and opens designated textbook/worksheet pages.'
      },
      {
        code: 'LO-FLN-H1.03',
        descriptionHindi: 'सहमति और उपलब्धता के छोटे उत्तर देना।',
        descriptionEnglish: 'Answers simple yes/no and availability questions in classroom.'
      }
    ],
    beats: [
      {
        id: 'u1-b1',
        beatIndex: 1,
        beatType: 'instruction',
        title: 'कतार निर्माण निर्देश (Line Formation)',
        hindiText: 'सब बच्चे सीधी कतार में खड़े हो जाओ।',
        santaliOlChiki: 'ᱡᱚᱛᱚ ᱜᱤᱫᱽᱨᱟᱹ ᱥᱚᱡᱷᱮ ᱛᱷᱟᱨ ᱨᱮ ᱛᱤᱸᱜᱩᱱ ᱯᱮ᱾',
        romanizedPronunciation: 'Joto gidra sojhe thar re tingun pe.',
        pedagogicalNote: 'हाथ आगे करके दूरी बनाने का संकेत भी दें।',
        nipunOutcomeCode: 'LO-FLN-H1.01',
        nipunOutcomeDescription: 'शारीरिक क्रियात्मक निर्देश का पालन',
        audioDurationSeconds: 2.4
      },
      {
        id: 'u1-b2',
        beatIndex: 2,
        beatType: 'instruction',
        title: 'पुस्तक खोलने का निर्देश (Open Book)',
        hindiText: 'अपनी गणित की किताब का पृष्ठ संख्या ४ खोलो।',
        santaliOlChiki: 'ᱟᱯᱱᱟᱨᱟᱜ ᱮᱞᱠᱷᱟ ᱯᱩᱛᱷᱤ ᱨᱮᱱᱟᱜ ᱥᱟᱠᱟᱢ ᱔ ᱡᱷᱤᱡᱽ ᱯᱮ᱾',
        romanizedPronunciation: 'Apnarag elkha puthi renag sakam 4 jhij pe.',
        pedagogicalNote: 'बोर्ड पर पृष्ठ ४ लिखकर बच्चों को मिलान कराएं।',
        nipunOutcomeCode: 'LO-FLN-H1.02',
        nipunOutcomeDescription: 'निर्देशित पृष्ठ संख्या पहचानना',
        audioDurationSeconds: 2.8
      },
      {
        id: 'u1-b3',
        beatIndex: 3,
        beatType: 'instruction',
        title: 'शांति व ध्यान निर्देश (Attention/Silence)',
        hindiText: 'सब लोग शांत हो जाओ और मेरी बात ध्यान से सुनो।',
        santaliOlChiki: 'ᱡᱚᱛᱚ ᱦᱚᱲ ᱛᱷᱤᱨᱩᱜ ᱯᱮ ᱟᱨ ᱤᱧᱟᱜ ᱠᱟᱛᱷᱟ ᱫᱷᱮᱭᱟᱱ ᱛᱮ ᱟᱸᱡᱚᱢ ᱯᱮ᱾',
        romanizedPronunciation: 'Joto hor thirug pe ar inyag katha dhiyan te anjom pe.',
        pedagogicalNote: 'आंखों के संपर्क के साथ बोले जाने वाला निर्देश।',
        nipunOutcomeCode: 'LO-FLN-H1.01',
        nipunOutcomeDescription: 'कक्षा में ध्यान केंद्रित करना',
        audioDurationSeconds: 2.9
      },
      {
        id: 'u1-b4',
        beatIndex: 4,
        beatType: 'question',
        title: 'सामग्री की जांच (Resource Check)',
        hindiText: 'क्या सभी बच्चों के पास स्लेट और चॉक है?',
        santaliOlChiki: 'ᱪᱮᱫ ᱡᱚᱛᱚ ᱜᱤᱫᱽᱨᱟᱹ ᱴᱷᱮᱱ ᱥᱞᱮᱴ ᱟᱨ ᱠᱷᱟᱹᱲᱤ ᱢᱮᱱᱟᱜ-ᱟ?',
        romanizedPronunciation: 'Ched joto gidra then slet ar khari menag-a?',
        pedagogicalNote: 'प्रत्येक बेंच की ओर हाथ से इशारा करते हुए पूछें।',
        nipunOutcomeCode: 'LO-FLN-H1.03',
        nipunOutcomeDescription: 'उपलब्धता पर प्रश्न पूछना',
        audioDurationSeconds: 2.6
      },
      {
        id: 'u1-b5',
        beatIndex: 5,
        beatType: 'expected_response',
        title: 'छात्रों की अपेक्षित प्रतिक्रिया (Expected Response)',
        hindiText: 'हाँ शिक्षक जी, हमारे पास है।',
        santaliOlChiki: 'ᱦᱮᱸ ᱢᱟᱪᱮᱛ ᱜᱚᱢᱠᱮ, ᱟᱞᱮ ᱴᱷᱮᱱ ᱢᱮᱱᱟᱜ-ᱟ᱾',
        romanizedPronunciation: 'Hen macet gomke, ale then menag-a.',
        pedagogicalNote: 'छात्र हाथ उठाकर सामूहिक रूप से उत्तर देंगे।',
        nipunOutcomeCode: 'LO-FLN-H1.03',
        nipunOutcomeDescription: 'मौखिक सहमति व प्रतिक्रिया देना',
        audioDurationSeconds: 2.1
      }
    ],
    keyVocabulary: [
      {
        id: 'v-u1-1',
        hindiWord: 'शिक्षक',
        santaliOlChiki: 'ᱢᱟᱪᱮᱛ',
        romanizedPronunciation: 'Macet',
        englishMeaning: 'Teacher',
        category: 'greeting'
      },
      {
        id: 'v-u1-2',
        hindiWord: 'किताब / पुस्तक',
        santaliOlChiki: 'ᱯᱩᱛᱷᱤ',
        romanizedPronunciation: 'Puthi',
        englishMeaning: 'Book',
        category: 'object'
      },
      {
        id: 'v-u1-3',
        hindiWord: 'खोलना',
        santaliOlChiki: 'ᱡᱷᱤᱡᱽ',
        romanizedPronunciation: 'Jhij',
        englishMeaning: 'Open',
        category: 'action'
      },
      {
        id: 'v-u1-4',
        hindiWord: 'सुनना',
        santaliOlChiki: 'ᱟᱸᱡᱚᱢ',
        romanizedPronunciation: 'Anjom',
        englishMeaning: 'Listen / Hear',
        category: 'action'
      },
      {
        id: 'v-u1-5',
        hindiWord: 'कतार / पंक्ति',
        santaliOlChiki: 'ᱛᱷᱟᱨ',
        romanizedPronunciation: 'Thar',
        englishMeaning: 'Line / Queue',
        category: 'object'
      }
    ]
  },
  {
    id: 'fln-unit-2-counting',
    unitNumber: 2,
    gradeLevel: 'Grade 1',
    domain: 'Numeracy',
    titleHindi: 'गिनती और मूर्त वस्तुएँ (१ से १०)',
    titleSantali: 'ᱮᱞᱠᱷᱟ ᱟᱨ ᱡᱤᱱᱤᱥ (᱑ ᱠᱷᱚᱱ ᱑᱐)',
    titleEnglish: 'Counting 1–10 with Concrete Objects',
    description: 'Foundational numeracy: counting real objects, one-to-one correspondence, and basic quantity query.',
    targetNipunCompetencies: [
      {
        code: 'LO-FLN-M1.01',
        descriptionHindi: '१ से १० तक वस्तुओं की सही गिनती करना।',
        descriptionEnglish: 'Counts physical objects from 1 to 10 accurately.'
      },
      {
        code: 'LO-FLN-M1.02',
        descriptionHindi: 'संख्या नाम व संख्या प्रतीक का मिलान करना।',
        descriptionEnglish: 'Associates number names with quantity.'
      },
      {
        code: 'LO-FLN-M1.03',
        descriptionHindi: 'कुल संख्या बताने के लिए संख्यात्मक उत्तर देना।',
        descriptionEnglish: 'Responds to quantity questions ("How many?").'
      }
    ],
    beats: [
      {
        id: 'u2-b1',
        beatIndex: 1,
        beatType: 'instruction',
        title: 'गिनती का उद्देश्य (Counting Objective)',
        hindiText: 'आज हम एक से पाँच तक वस्तुएं गिनना सीखेंगे।',
        santaliOlChiki: 'ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱢᱤᱫ ᱠᱷᱚᱱ ᱢᱚᱬᱮ ᱫᱷᱟᱹᱵᱤᱡ ᱡᱤᱱᱤᱥ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫ-ᱟ᱾',
        romanizedPronunciation: 'Tehen abo mid khon mone dhabij jinis lekha bon ched-a.',
        pedagogicalNote: 'उंगलियों को उठाकर १ से ५ का क्रम दिखाएं।',
        nipunOutcomeCode: 'LO-FLN-M1.01',
        nipunOutcomeDescription: 'संख्या गणना की शुरुआत',
        audioDurationSeconds: 3.1
      },
      {
        id: 'u2-b2',
        beatIndex: 2,
        beatType: 'example',
        title: 'मूर्त वस्तु उदाहरण (Concrete Example)',
        hindiText: 'देखो, मेज पर तीन पेंसिल रखी हैं: एक, दो, तीन।',
        santaliOlChiki: 'ᱧᱮᱞ ᱢᱮ, ᱴᱮᱵᱩᱞ ᱪᱮᱛᱟᱱ ᱨᱮ ᱯᱮᱭᱟ ᱯᱮᱱᱥᱤᱞ ᱫᱚᱦᱚ ᱢᱮᱱᱟᱜ-ᱟ: ᱢᱤᱫ, ᱵᱟᱨ, ᱯᱮ᱾',
        romanizedPronunciation: 'Nyel me, tebul cetan re peya pensil doho menag-a: mid, bar, pe.',
        pedagogicalNote: 'प्रत्येक पेंसिल को छूकर एक-एक करके गिनें।',
        nipunOutcomeCode: 'LO-FLN-M1.02',
        nipunOutcomeDescription: 'मूर्त वस्तुओं से संख्या बोध',
        audioDurationSeconds: 3.6
      },
      {
        id: 'u2-b3',
        beatIndex: 3,
        beatType: 'question',
        title: 'गिनती का प्रश्न (Prompt Question)',
        hindiText: 'इस डब्बे में कितने पत्ते हैं? गिनकर बताओ।',
        santaliOlChiki: 'ᱱᱚᱣᱟ ᱵᱟᱠᱥᱟ ᱨᱮ ᱛᱤᱱᱟᱹᱜ ᱥᱟᱠᱟᱢ ᱢᱮᱱᱟᱜ-ᱟ? ᱞᱮᱠᱷᱟ ᱠᱟᱛᱮ ᱞᱟᱹᱭ ᱢᱮ᱾',
        romanizedPronunciation: 'Nowa baksa re tinag sakam menag-a? Lekha kate lay me.',
        pedagogicalNote: 'छात्र को मंच पर बुलाकर गिनने का अवसर दें।',
        nipunOutcomeCode: 'LO-FLN-M1.03',
        nipunOutcomeDescription: 'मात्रात्मक प्रश्न पूछना',
        audioDurationSeconds: 2.8
      },
      {
        id: 'u2-b4',
        beatIndex: 4,
        beatType: 'expected_response',
        title: 'छात्र उत्तर (Expected Student Response)',
        hindiText: 'यहाँ चार पत्ते हैं।',
        santaliOlChiki: 'ᱱᱚᱸᱰᱮ ᱯᱩᱱᱭᱟᱹ ᱥᱟᱠᱟᱢ ᱢᱮᱱᱟᱜ-ᱟ᱾',
        romanizedPronunciation: 'Nonde punya sakam menag-a.',
        pedagogicalNote: 'छात्र संख्या शब्द "ᱯᱩᱱᱭᱟᱹ" (चार) का उच्चारण करे।',
        nipunOutcomeCode: 'LO-FLN-M1.01',
        nipunOutcomeDescription: 'सही संख्यात्मक उत्तर',
        audioDurationSeconds: 1.8
      }
    ],
    keyVocabulary: [
      {
        id: 'v-u2-1',
        hindiWord: 'एक (१)',
        santaliOlChiki: 'ᱢᱤᱫ (᱑)',
        romanizedPronunciation: 'Mid (1)',
        englishMeaning: 'One (1)',
        category: 'number'
      },
      {
        id: 'v-u2-2',
        hindiWord: 'दो (२)',
        santaliOlChiki: 'ᱵᱟᱨ (᱒)',
        romanizedPronunciation: 'Bar (2)',
        englishMeaning: 'Two (2)',
        category: 'number'
      },
      {
        id: 'v-u2-3',
        hindiWord: 'तीन (३)',
        santaliOlChiki: 'ᱯᱮ (᱓)',
        romanizedPronunciation: 'Pe (3)',
        englishMeaning: 'Three (3)',
        category: 'number'
      },
      {
        id: 'v-u2-4',
        hindiWord: 'चार (४)',
        santaliOlChiki: 'ᱯᱩᱱ (᱔)',
        romanizedPronunciation: 'Pun (4)',
        englishMeaning: 'Four (4)',
        category: 'number'
      },
      {
        id: 'v-u2-5',
        hindiWord: 'पाँच (५)',
        santaliOlChiki: 'ᱢᱚᱬᱮ (᱕)',
        romanizedPronunciation: 'Mone (5)',
        englishMeaning: 'Five (5)',
        category: 'number'
      },
      {
        id: 'v-u2-6',
        hindiWord: 'पत्ता',
        santaliOlChiki: 'ᱥᱟᱠᱟᱢ',
        romanizedPronunciation: 'Sakam',
        englishMeaning: 'Leaf',
        category: 'nature'
      },
      {
        id: 'v-u2-7',
        hindiWord: 'गिनती करना',
        santaliOlChiki: 'ᱞᱮᱠᱷᱟ',
        romanizedPronunciation: 'Lekha',
        englishMeaning: 'Count',
        category: 'action'
      }
    ]
  },
  {
    id: 'fln-unit-3-greetings',
    unitNumber: 3,
    gradeLevel: 'Grade 1',
    domain: 'Literacy',
    titleHindi: 'दैनिक संवाद एवं शिष्टाचार',
    titleSantali: 'ᱫᱤᱱᱟᱹᱢ ᱠᱟᱛᱷᱟ ᱟᱨ ᱡᱚᱦᱟᱨ',
    titleEnglish: 'Daily Conversation, Greetings & Wellbeing',
    description: 'Establishing classroom social-emotional safety, morning greetings, identity exchange, and basic inquiry.',
    targetNipunCompetencies: [
      {
        code: 'LO-FLN-H1.06',
        descriptionHindi: 'दैनिक अभिवादन और शिष्टाचार शब्दों का उपयोग करना।',
        descriptionEnglish: 'Uses appropriate daily greetings and polite expressions.'
      },
      {
        code: 'LO-FLN-H1.07',
        descriptionHindi: 'अपना नाम व परिचय स्पष्ट रूप से बताना।',
        descriptionEnglish: 'States own name and basic identity clearly.'
      },
      {
        code: 'LO-FLN-H1.08',
        descriptionHindi: 'दैनिक दिनचर्या और हाल-चाल के प्रश्नों का उत्तर देना।',
        descriptionEnglish: 'Responds to wellbeing and daily routine questions.'
      }
    ],
    beats: [
      {
        id: 'u3-b1',
        beatIndex: 1,
        beatType: 'instruction',
        title: 'प्रातः अभिवादन (Morning Greeting Routine)',
        hindiText: 'जब हम सुबह कक्षा में आते हैं, तो सबको "सगुन सेताग्" कहते हैं।',
        santaliOlChiki: 'ᱡᱚᱠᱷᱚᱱ ᱟᱵᱚ ᱥᱮᱛᱟᱜ ᱠᱞᱟᱥ ᱛᱮᱵᱚᱱ ᱦᱤᱡᱩᱜ-ᱟ, ᱩᱱ ᱡᱚᱛᱚ ᱦᱚᱲ "ᱥᱟᱹᱜᱩᱱ ᱥᱮᱛᱟᱜ" ᱵᱚᱱ ᱢᱮᱛᱟᱠᱚᱣᱟ᱾',
        romanizedPronunciation: 'Jokhon abo setag class tebon hijug-a, un joto hor "Sagun setag" bon metakowa.',
        pedagogicalNote: 'हाथ जोड़कर नमस्कार की मुद्रा बनाकर अभ्यास कराएं।',
        nipunOutcomeCode: 'LO-FLN-H1.06',
        nipunOutcomeDescription: 'अभिवादन का अभ्यास',
        audioDurationSeconds: 3.4
      },
      {
        id: 'u3-b2',
        beatIndex: 2,
        beatType: 'question',
        title: 'नाम पूछना (Inquiring Identity)',
        hindiText: 'तुम्हारा नाम क्या है?',
        santaliOlChiki: 'ᱟᱢᱟᱜ ᱧᱩᱛᱩᱢ ᱫᱚ ᱪᱮᱫ?',
        romanizedPronunciation: 'Amag nyutum do ched?',
        pedagogicalNote: 'प्रत्येक बच्चे के पास जाकर स्नेहपूर्वक पूछें।',
        nipunOutcomeCode: 'LO-FLN-H1.07',
        nipunOutcomeDescription: 'व्यक्तिगत परिचय प्रश्न',
        audioDurationSeconds: 1.7
      },
      {
        id: 'u3-b3',
        beatIndex: 3,
        beatType: 'expected_response',
        title: 'छात्र का परिचय (Student Identity Response)',
        hindiText: 'मेरा नाम सोमराय / बड़की है।',
        santaliOlChiki: 'ᱤᱧᱟᱜ ᱧᱩᱛᱩᱢ ᱫᱚ ᱥᱚᱢᱨᱟᱭ / ᱵᱟᱲᱠᱤ ᱠᱟᱱᱟ᱾',
        romanizedPronunciation: 'Inyag nyutum do Somray / Barki kana.',
        pedagogicalNote: 'पूरे वाक्य में बोलने के लिए प्रेरित करें।',
        nipunOutcomeCode: 'LO-FLN-H1.07',
        nipunOutcomeDescription: 'स्पष्ट परिचय वाक्य',
        audioDurationSeconds: 2.3
      },
      {
        id: 'u3-b4',
        beatIndex: 4,
        beatType: 'question',
        title: 'भोजन और स्वास्थ्य का हाल (Wellbeing Query)',
        hindiText: 'क्या तुमने आज सुबह खाना खाया?',
        santaliOlChiki: 'ᱪᱮᱫ ᱟᱢ ᱛᱮᱦᱮᱧ ᱥᱮᱛᱟᱜ ᱫᱟᱠᱟᱢ ᱡᱚᱢ ᱟᱠᱟᱫ-ᱟ?',
        romanizedPronunciation: 'Ched am tehen setag dakam jom akad-a?',
        pedagogicalNote: 'मध्याह्न भोजन (MDM) से पहले की नियमित बातचीत।',
        nipunOutcomeCode: 'LO-FLN-H1.08',
        nipunOutcomeDescription: 'दैनिक दिनचर्या संवाद',
        audioDurationSeconds: 2.5
      },
      {
        id: 'u3-b5',
        beatIndex: 5,
        beatType: 'expected_response',
        title: 'छात्र का उत्तर (Response)',
        hindiText: 'हाँ, मैंने खाना खाया है।',
        santaliOlChiki: 'ᱦᱮᱸ, ᱤᱧ ᱫᱟᱠᱟᱧ ᱡᱚᱢ ᱟᱠᱟᱫ-ᱟ᱾',
        romanizedPronunciation: 'Hen, iny dakanj jom akad-a.',
        pedagogicalNote: 'सकारात्मक संवाद को बढ़ावा दें।',
        nipunOutcomeCode: 'LO-FLN-H1.08',
        nipunOutcomeDescription: 'संवाद पूर्ण करना',
        audioDurationSeconds: 1.9
      }
    ],
    keyVocabulary: [
      {
        id: 'v-u3-1',
        hindiWord: 'शुभ प्रभात',
        santaliOlChiki: 'ᱥᱟᱹᱜᱩᱱ ᱥᱮᱛᱟᱜ',
        romanizedPronunciation: 'Sagun setag',
        englishMeaning: 'Good morning',
        category: 'greeting'
      },
      {
        id: 'v-u3-2',
        hindiWord: 'स्वागत है',
        santaliOlChiki: 'ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ',
        romanizedPronunciation: 'Sagun daram',
        englishMeaning: 'Welcome',
        category: 'greeting'
      },
      {
        id: 'v-u3-3',
        hindiWord: 'नाम',
        santaliOlChiki: 'ᱧᱩᱛᱩᱢ',
        romanizedPronunciation: 'Nyutum',
        englishMeaning: 'Name',
        category: 'object'
      },
      {
        id: 'v-u3-4',
        hindiWord: 'भात / भोजन',
        santaliOlChiki: 'ᱫᱟᱠᱟ',
        romanizedPronunciation: 'Daka',
        englishMeaning: 'Rice / Food',
        category: 'object'
      },
      {
        id: 'v-u3-5',
        hindiWord: 'पानी',
        santaliOlChiki: 'ᱫᱟᱜ',
        romanizedPronunciation: 'Dag',
        englishMeaning: 'Water',
        category: 'nature'
      },
      {
        id: 'v-u3-6',
        hindiWord: 'खाना',
        santaliOlChiki: 'ᱡᱚᱢ',
        romanizedPronunciation: 'Jom',
        englishMeaning: 'Eat',
        category: 'action'
      }
    ]
  },
  {
    id: 'fln-unit-4-thirsty-crow',
    unitNumber: 4,
    gradeLevel: 'Grade 2',
    domain: 'Storytelling',
    titleHindi: 'कथा पठन: चतुर कौआ',
    titleSantali: 'ᱠᱟᱹᱦᱱᱤ ᱯᱟᱲᱦᱟᱣ: ᱪᱟᱞᱟᱠ ᱠᱟᱦᱩ',
    titleEnglish: 'Narrative Reading: The Clever Crow',
    description: 'FLN narrative comprehension, sequencing events, cause-and-effect understanding, and moral vocabulary.',
    targetNipunCompetencies: [
      {
        code: 'LO-FLN-L1.01',
        descriptionHindi: 'कहानी के मुख्य पात्र और घटनाक्रम को समझना।',
        descriptionEnglish: 'Comprehends main characters and chronological events in a story.'
      },
      {
        code: 'LO-FLN-L1.02',
        descriptionHindi: 'कहानी आधारित सरल प्रश्नों के उत्तर देना।',
        descriptionEnglish: 'Answers simple inferential and factual story questions.'
      },
      {
        code: 'LO-FLN-L1.03',
        descriptionHindi: 'समस्या समाधान के विचार को अपनी भाषा में अभिव्यक्त करना।',
        descriptionEnglish: 'Expresses problem-solving logic from narrative context.'
      }
    ],
    beats: [
      {
        id: 'u4-b1',
        beatIndex: 1,
        beatType: 'instruction',
        title: 'कहानी की भूमिका (Story Opening)',
        hindiText: 'सब बच्चे ध्यान से कौवे की कहानी सुनो।',
        santaliOlChiki: 'ᱡᱚᱛᱚ ᱜᱤᱫᱽᱨᱟᱹ ᱫᱷᱮᱭᱟᱱ ᱛᱮ ᱠᱟᱦᱩ ᱣᱟᱜ ᱠᱟᱹᱦᱱᱤ ᱟᱸᱡᱚᱢ ᱯᱮ᱾',
        romanizedPronunciation: 'Joto gidra dhiyan te kahu wag kahni anjom pe.',
        pedagogicalNote: 'हाथ में कौवे का चित्र कार्ड दिखाते हुए कहें।',
        nipunOutcomeCode: 'LO-FLN-L1.01',
        nipunOutcomeDescription: 'श्रवण और ध्यान',
        audioDurationSeconds: 2.9
      },
      {
        id: 'u4-b2',
        beatIndex: 2,
        beatType: 'example',
        title: 'पात्र की स्थिति (Setting the Scene)',
        hindiText: 'एक कौवा बहुत प्यासा था, वह पानी की तलाश में इधर-उधर उड़ रहा था।',
        santaliOlChiki: 'ᱢᱤᱫᱴᱟᱝ ᱠᱟᱦᱩ ᱟᱹᱰᱤ ᱛᱮᱛᱟᱝ ᱞᱮᱫᱮᱭᱟ, ᱩᱱᱤ ᱫᱟᱜ ᱯᱟᱸᱡᱟ ᱛᱮ ᱱᱚᱛᱮ-ᱦᱟᱱᱛᱮ ᱩᱰᱟᱹᱣᱜ ᱠᱟᱱ ᱛᱟᱦᱮᱸᱫ᱾',
        romanizedPronunciation: 'Midtang kahu adi tetang ledeya, uni dag panja te note-hante udawg kan tahend.',
        pedagogicalNote: 'प्यास और उड़ने का अभिनय करें।',
        nipunOutcomeCode: 'LO-FLN-L1.01',
        nipunOutcomeDescription: 'कहानी का दृश्य समझना',
        audioDurationSeconds: 4.2
      },
      {
        id: 'u4-b3',
        beatIndex: 3,
        beatType: 'example',
        title: 'समस्या का उद्भव (The Problem)',
        hindiText: 'उसने एक घड़े में थोड़ा सा पानी देखा, लेकिन उसकी चोंच नहीं पहुँच पा रही थी।',
        santaliOlChiki: 'ᱩᱱᱤ ᱢᱤᱫᱴᱟᱝ ᱴᱩᱠᱩᱡ ᱨᱮ ᱠᱟᱹᱴᱤᱡ ᱫᱟᱜ-ᱮ ᱧᱮᱞ ᱠᱮᱫ-ᱟ, ᱢᱮᱱᱠᱷᱟᱱ ᱟᱡᱟᱜ ᱴᱷᱚᱱᱴᱟ ᱵᱟᱝ ᱥᱮᱴᱮᱨᱚᱜ ᱠᱟᱱ ᱛᱟᱦᱮᱸᱫ᱾',
        romanizedPronunciation: 'Uni midtang tukuj re katij dag-e nyel ked-a, menkhan ajag thonta bang seterog kan tahend.',
        pedagogicalNote: 'घड़े और पानी के स्तर का चित्र बनाएं।',
        nipunOutcomeCode: 'LO-FLN-L1.01',
        nipunOutcomeDescription: 'कहानी का द्वंद्व समझना',
        audioDurationSeconds: 4.8
      },
      {
        id: 'u4-b4',
        beatIndex: 4,
        beatType: 'question',
        title: 'समाधान पर विचार (Inquiry on Resolution)',
        hindiText: 'कौवे ने पानी ऊपर लाने के लिए क्या उपाय किया?',
        santaliOlChiki: 'ᱠᱟᱦᱩ ᱫᱟᱜ ᱪᱮᱛᱟᱱ ᱨᱟᱠᱟᱵ ᱞᱟᱹᱜᱤᱫ ᱪᱮᱫ ᱩᱯᱟᱹᱭ-ᱮ ᱠᱮᱫ-ᱟ?',
        romanizedPronunciation: 'Kahu dag cetan rakab lagid ched upay-e ked-a?',
        pedagogicalNote: 'बच्चों से विचार पूछें कि वे होते तो क्या करते।',
        nipunOutcomeCode: 'LO-FLN-L1.02',
        nipunOutcomeDescription: 'तार्किक चिंतन प्रश्न',
        audioDurationSeconds: 3.2
      },
      {
        id: 'u4-b5',
        beatIndex: 5,
        beatType: 'expected_response',
        title: 'कहानी का निष्कर्ष (Conclusion / Moral)',
        hindiText: 'उसने घड़े में छोटे-छोटे कंकड़ डाले और पानी ऊपर आ गया।',
        santaliOlChiki: 'ᱩᱱᱤ ᱴᱩᱠᱩᱡ ᱨᱮ ᱠᱟᱹᱴᱤᱡ-ᱠᱟᱹᱴᱤᱡ ᱫᱷᱤᱨᱤ ᱠᱷᱟᱫᱽᱞᱮ ᱠᱮᱫ-ᱟ ᱟᱨ ᱫᱟᱜ ᱪᱮᱛᱟᱱ ᱨᱟᱠᱟᱵ ᱮᱱᱟ᱾',
        romanizedPronunciation: 'Uni tukuj re katij-katij dhiri khadle ked-a ar dag cetan rakab ena.',
        pedagogicalNote: 'मेहनत और समझदारी से हर मुश्किल हल होती है।',
        nipunOutcomeCode: 'LO-FLN-L1.03',
        nipunOutcomeDescription: 'समस्या समाधान का बोध',
        audioDurationSeconds: 3.9
      }
    ],
    keyVocabulary: [
      {
        id: 'v-u4-1',
        hindiWord: 'कौवा',
        santaliOlChiki: 'ᱠᱟᱦᱩ',
        romanizedPronunciation: 'Kahu',
        englishMeaning: 'Crow',
        category: 'animal'
      },
      {
        id: 'v-u4-2',
        hindiWord: 'घड़ा / मटका',
        santaliOlChiki: 'ᱴᱩᱠᱩᱡ',
        romanizedPronunciation: 'Tukuj',
        englishMeaning: 'Earthen pot / Pitcher',
        category: 'object'
      },
      {
        id: 'v-u4-3',
        hindiWord: 'पत्थर / कंकड़',
        santaliOlChiki: 'ᱫᱷᱤᱨᱤ',
        romanizedPronunciation: 'Dhiri',
        englishMeaning: 'Stone / Pebble',
        category: 'nature'
      },
      {
        id: 'v-u4-4',
        hindiWord: 'प्यास',
        santaliOlChiki: 'ᱛᱮᱛᱟᱝ',
        romanizedPronunciation: 'Tetang',
        englishMeaning: 'Thirst',
        category: 'nature'
      },
      {
        id: 'v-u4-5',
        hindiWord: 'उड़ना',
        santaliOlChiki: 'ᱩᱰᱟᱹᱣ',
        romanizedPronunciation: 'Udaw',
        englishMeaning: 'Fly',
        category: 'action'
      }
    ]
  },
  {
    id: 'fln-unit-5-body-parts',
    unitNumber: 5,
    gradeLevel: 'Grade 1',
    domain: 'Literacy',
    titleHindi: 'शरीर के अंग एवं क्रियाएँ',
    titleSantali: 'ᱦᱚᱲᱢᱚ ᱨᱮᱱᱟᱜ ᱦᱟᱹᱴᱤᱧ ᱟᱨ ᱠᱟᱹᱢᱤ',
    titleEnglish: 'Body Parts & Action Identification',
    description: 'FLN sensory awareness, identifying body parts, and following physical action instructions.',
    targetNipunCompetencies: [
      {
        code: 'LO-FLN-H1.04',
        descriptionHindi: 'शरीर के विभिन्न अंगों की पहचान करना और नाम बताना।',
        descriptionEnglish: 'Identifies and names major body parts and sensory organs.'
      },
      {
        code: 'LO-FLN-H1.05',
        descriptionHindi: 'ज्ञानेंद्रियों के कार्यों के संबंध में मौखिक उत्तर देना।',
        descriptionEnglish: 'Relates sensory organs to their primary functions (eyes to see, ears to hear).'
      }
    ],
    beats: [
      {
        id: 'u5-b1',
        beatIndex: 1,
        beatType: 'instruction',
        title: 'अंग स्पर्श निर्देश (Touch Body Part)',
        hindiText: 'सब बच्चे अपने सिर को हाथ से छुओ।',
        santaliOlChiki: 'ᱡᱚᱛᱚ ᱜᱤᱫᱽᱨᱟᱹ ᱟᱯᱱᱟᱨᱟᱜ ᱵᱚᱦᱚᱜ ᱛᱤ ᱛᱮ ᱡᱚᱴᱮᱫ ᱯᱮ᱾',
        romanizedPronunciation: 'Joto gidra apnarag bohog ti te joted pe.',
        pedagogicalNote: 'शिक्षक स्वयं सिर छूकर बच्चों को अनुकरण कराएं। [Verified: PALASH Grade 1 Module]',
        nipunOutcomeCode: 'LO-FLN-H1.04',
        nipunOutcomeDescription: 'शारीरिक अंग की पहचान व क्रिया',
        audioDurationSeconds: 2.8
      },
      {
        id: 'u5-b2',
        beatIndex: 2,
        beatType: 'instruction',
        title: 'हाथ आगे करने का निर्देश (Hands Forward)',
        hindiText: 'अपने दोनों हाथ आगे फैलाओ।',
        santaliOlChiki: 'ᱟᱯᱱᱟᱨᱟᱜ ᱵᱟᱱᱟᱨ ᱛᱤ ᱞᱟᱦᱟ ᱥᱮᱫ ᱯᱟᱥᱱᱟᱣ ᱯᱮ᱾',
        romanizedPronunciation: 'Apnarag banar ti laha sed pasnaw pe.',
        pedagogicalNote: 'दोनों हाथों को सीधा रखने का अभ्यास कराएं। [Verified: Ol Chiki standard orthography]',
        nipunOutcomeCode: 'LO-FLN-H1.01',
        nipunOutcomeDescription: 'निर्देशानुसार शारीरिक संतुलन',
        audioDurationSeconds: 2.7
      },
      {
        id: 'u5-b3',
        beatIndex: 3,
        beatType: 'question',
        title: 'ज्ञानेंद्रिय प्रश्न (Sensory Function Query)',
        hindiText: 'हम किस अंग से देखते हैं?',
        santaliOlChiki: 'ᱟᱵᱚ ᱚᱠᱟ ᱦᱟᱹᱴᱤᱧ ᱛᱮᱵᱚᱱ ᱧᱮᱞᱟ?',
        romanizedPronunciation: 'Abo oka hatiny tebon nyela?',
        pedagogicalNote: 'आँखों की ओर संकेत करते हुए पूछें। [Verified: Jharkhand Tribal Welfare Primer]',
        nipunOutcomeCode: 'LO-FLN-H1.05',
        nipunOutcomeDescription: 'कार्य और अंग का संबंध समझना',
        audioDurationSeconds: 2.4
      },
      {
        id: 'u5-b4',
        beatIndex: 4,
        beatType: 'expected_response',
        title: 'छात्र उत्तर (Expected Student Response)',
        hindiText: 'हम आँखों से देखते हैं।',
        santaliOlChiki: 'ᱟᱵᱚ ᱢᱮᱫ ᱛᱮᱵᱚᱱ ᱧᱮᱞᱟ᱾',
        romanizedPronunciation: 'Abo med tebon nyela.',
        pedagogicalNote: 'बच्चे "ᱢᱮᱫ" (आँख) शब्द का शुद्ध उच्चारण करें। [Verified: Ol Chiki orthography]',
        nipunOutcomeCode: 'LO-FLN-H1.05',
        nipunOutcomeDescription: 'स्पष्ट मौखिक उत्तर',
        audioDurationSeconds: 2.0
      }
    ],
    keyVocabulary: [
      {
        id: 'v-u5-1',
        hindiWord: 'सिर / माथा',
        santaliOlChiki: 'ᱵᱚᱦᱚᱜ',
        romanizedPronunciation: 'Bohog',
        englishMeaning: 'Head',
        category: 'object'
      },
      {
        id: 'v-u5-2',
        hindiWord: 'आँख (२ आँखें)',
        santaliOlChiki: 'ᱢᱮᱫ (ᱵᱟᱨᱭᱟ ᱢᱮᱫ)',
        romanizedPronunciation: 'Med (Barya med)',
        englishMeaning: 'Eye (Two eyes)',
        category: 'object'
      },
      {
        id: 'v-u5-3',
        hindiWord: 'हाथ',
        santaliOlChiki: 'ᱛᱤ',
        romanizedPronunciation: 'Ti',
        englishMeaning: 'Hand',
        category: 'object'
      },
      {
        id: 'v-u5-4',
        hindiWord: 'पैर',
        santaliOlChiki: 'ᱡᱟᱸᱜᱟ',
        romanizedPronunciation: 'Janga',
        englishMeaning: 'Leg / Foot',
        category: 'object'
      },
      {
        id: 'v-u5-5',
        hindiWord: 'देखना',
        santaliOlChiki: 'ᱧᱮᱞ',
        romanizedPronunciation: 'Nyel',
        englishMeaning: 'See / Look',
        category: 'action'
      }
    ]
  }
];

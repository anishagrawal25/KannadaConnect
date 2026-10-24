// Real-life guided practice scenarios for non-Kannada speakers
// Covers transport, food, shopping, pharmacy, and everyday social interactions.

export const PRACTICE_SCENARIOS = [
  {
    id: 'practice-auto-meter',
    situation: 'transport',
    situationLabel: 'Transport & Directions',
    title: 'Taking an Auto Rickshaw',
    promptEnglish: 'Ask the auto driver if they will go to Indiranagar by the meter.',
    targetKannada: 'ಇಂದಿರಾನಗರಕ್ಕೆ ಮೀಟರ್ ಹಾಕಿ ಬರ್ತೀರಾ?',
    transliteration: 'Indiranagar-ge meter haaki barteera?',
    pronunciationGuide: 'in-di-ra-na-gar-GAY MEE-ter HAA-ki bar-TEE-ra?',
    keywords: ['ಇಂದಿರಾನಗರ', 'ಮೀಟರ್', 'ಹಾಕಿ', 'ಬರ್ತೀರಾ', 'indiranagar', 'meter', 'haaki', 'barteera'],
    contextNote: 'Use when approaching an auto stand or hailing on the street in Bengaluru.',
    tips: "Keep your tone friendly. Emphasize 'bar-TEE-ra' with a slight questioning lift.",
    replies: [
      {
        kannada: 'ಹೌದು, ಬರ್ತೀನಿ, ಹತ್ತಿ.',
        transliteration: 'Haudu, barteeni, hatti.',
        englishMeaning: 'Yes, I will come, please get in.'
      },
      {
        kannada: 'ಮೀಟರ್ ಮೇಲೆ ಇಪ್ಪತ್ತು ರೂಪಾಯಿ ಜಾಸ್ತಿ ಆಗುತ್ತೆ.',
        transliteration: 'Meter mele ippattu roopayi jaasti aagutte.',
        englishMeaning: 'It will be twenty rupees extra above the meter.'
      }
    ]
  },
  {
    id: 'practice-bus-mysuru',
    situation: 'transport',
    situationLabel: 'Transport & Directions',
    title: 'Boarding a Bus at Majestic',
    promptEnglish: 'Ask the conductor or driver if this bus goes to Mysuru.',
    targetKannada: 'ಈ ಬಸ್ ಮೈಸೂರಿಗೆ ಹೋಗುತ್ತದೆಯೇ?',
    transliteration: 'Ee bus Mysurige hoguttadeye?',
    pronunciationGuide: 'EE bus MY-soo-ri-gay ho-gut-ta-de-ye?',
    keywords: ['ಬಸ್', 'ಮೈಸೂರಿಗೆ', 'ಹೋಗುತ್ತೆ', 'ಹೋಗುತ್ತದೆಯೇ', 'bus', 'mysuru', 'mysore', 'hoguttadeye'],
    contextNote: 'Essential for boarding at KSRTC Majestic stand or satellite terminals.',
    tips: "'Ee bus' means 'this bus', and 'hoguttadeye' asks 'does it go?'.",
    replies: [
      {
        kannada: 'ಹೌದು, ಹೋಗುತ್ತೆ, ಹತ್ತಿ.',
        transliteration: 'Haudu, hogutte, hatti.',
        englishMeaning: 'Yes, it goes, get in.'
      },
      {
        kannada: 'ಇಲ್ಲ, ಇದು ಹೋಗಲ್ಲ. ಮುಂದಿನ ಬಸ್ ಹತ್ತಿ.',
        transliteration: 'Illa, idu hogalla. Mundina bus hatti.',
        englishMeaning: 'No, this does not go. Take the next bus.'
      }
    ]
  },
  {
    id: 'practice-coffee-sugar',
    situation: 'food',
    situationLabel: 'Food & Restaurants',
    title: 'Ordering Darshini Filter Coffee',
    promptEnglish: 'Order two filter coffees with less sugar.',
    targetKannada: 'ಎರಡು ಫಿಲ್ಟರ್ ಕಾಫಿ, ಸಕ್ಕರೆ ಕಡಿಮೆ ಹಾಕಿ ಕೊಡಿ.',
    transliteration: 'Eradu filter coffee, sakkare kadime haaki kodi.',
    pronunciationGuide: 'eh-RA-du FIL-ter KAA-phi, SAK-ka-ray KA-di-may HAA-ki KO-di.',
    keywords: ['ಎರಡು', 'ಫಿಲ್ಟರ್', 'ಕಾಫಿ', 'ಸಕ್ಕರೆ', 'ಕಡಿಮೆ', 'ಕೊಡಿ', 'eradu', 'coffee', 'sakkare', 'kadime', 'kodi'],
    contextNote: 'Standard order format in Darshinis across Karnataka.',
    tips: "'Eradu' is two, 'sakkare kadime' is less sugar, and 'kodi' is please give.",
    replies: [
      {
        kannada: 'ಎರಡು ನಿಮಿಷದಲ್ಲಿ ತರ್ತೀನಿ ಸರ್.',
        transliteration: 'Eradu nimishadalli tarteeni sir.',
        englishMeaning: 'I will bring it in two minutes sir.'
      },
      {
        kannada: 'ಟೋಕನ್ ಕೌಂಟರ್‌ನಲ್ಲಿ ಮೊದಲು ತಗೊಳ್ಳಿ.',
        transliteration: 'Token counter-nalli modalu tagolli.',
        englishMeaning: 'Please get the token from the counter first.'
      }
    ]
  },
  {
    id: 'practice-order-tea',
    situation: 'food',
    situationLabel: 'Food & Restaurants',
    title: 'Ordering Tea at a Stall',
    promptEnglish: 'Politely ask the tea master for one cup of hot tea.',
    targetKannada: 'ದಯವಿಟ್ಟು ಒಂದು ಕಪ್ ಟೀ ಕೊಡಿ.',
    transliteration: 'Dayavittu ondu cup tea kodi.',
    pronunciationGuide: 'da-ya-VIT-tu ON-du cup TEE KO-di.',
    keywords: ['ದಯವಿಟ್ಟು', 'ಒಂದು', 'ಕಪ್', 'ಟೀ', 'ಕೊಡಿ', 'dayavittu', 'ondu', 'tea', 'chai', 'kodi'],
    contextNote: 'Understood at every local tea stall and bakery.',
    tips: "Always start with 'Dayavittu' (please) for courteous communication.",
    replies: [
      {
        kannada: 'ಹಾಲು ಜಾಸ್ತಿ ಬೇಕಾ, ಡಿಕಾಕ್ಷನ್ ಜಾಸ್ತಿ ಬೇಕಾ?',
        transliteration: 'Haalu jaasti bekaa, decoction jaasti bekaa?',
        englishMeaning: 'Do you want more milk or stronger decoction?'
      },
      {
        kannada: 'ಎರಡು ನಿಮಿಷ ಸರ್, ಬಿಸಿ ಬಿಸಿ ಕೊಡ್ತೀನಿ.',
        transliteration: 'Eradu nimisha sir, bisi bisi kodteeni.',
        englishMeaning: 'Two minutes sir, will give it piping hot.'
      }
    ]
  },
  {
    id: 'practice-market-upi',
    situation: 'shopping',
    situationLabel: 'Shopping & Payments',
    title: 'Buying Vegetables & Paying with UPI',
    promptEnglish: 'Ask how much for 1 kg tomatoes and if they accept UPI payments.',
    targetKannada: 'ಒಂದು ಕಿಲೋ ಟೊಮೆಟೊ ಎಷ್ಟು? ಯುಪಿಐ ತಗೊಳ್ತೀರಾ?',
    transliteration: 'Ondu kilo tomato eshtu? UPI tagolteera?',
    pronunciationGuide: 'ON-du KEE-lo to-MA-to ESH-tu? U-P-I ta-GOL-tee-ra?',
    keywords: ['ಒಂದು', 'ಕಿಲೋ', 'ಟೊಮೆಟೊ', 'ಎಷ್ಟು', 'ಯುಪಿಐ', 'ತಗೊಳ್ತೀರಾ', 'tomato', 'eshtu', 'upi', 'tagolteera'],
    contextNote: 'Standard provision store or vegetable vendor inquiry.',
    tips: "'Eshtu' means how much, and 'tagolteera' means will you take/accept.",
    replies: [
      {
        kannada: 'ನಲವತ್ತು ರೂಪಾಯಿ ಕಿಲೋ, ಕ್ಯೂಆರ್ ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.',
        transliteration: 'Nalavattu roopayi kilo, QR code scan maadi.',
        englishMeaning: 'Forty rupees a kilo, scan the QR code right here.'
      },
      {
        kannada: 'ಕ್ಯಾಶ್ ಮಾತ್ರ ಸರ್, ನೆಟ್‌ವರ್ಕ್ ಇಲ್ಲ.',
        transliteration: 'Cash maatra sir, network illa.',
        englishMeaning: 'Cash only today sir, mobile network is down.'
      }
    ]
  },
  {
    id: 'practice-pharmacy-headache',
    situation: 'health',
    situationLabel: 'Health & Pharmacy',
    title: 'Asking for Medicine at a Pharmacy',
    promptEnglish: 'Tell the chemist you have a severe headache and please give medicine.',
    targetKannada: 'ನನಗೆ ತುಂಬಾ ತಲೆನೋವು ಇದೆ, ದಯವಿಟ್ಟು ಮಾತ್ರೆ ಕೊಡಿ.',
    transliteration: 'Nanage tumba talenovu ide, dayavittu maatre kodi.',
    pronunciationGuide: 'na-na-ge TUM-ba ta-lay-NO-vu ee-de, da-ya-VIT-tu MAA-tre KO-di.',
    keywords: ['ನನಗೆ', 'ತುಂಬಾ', 'ತಲೆನೋವು', 'ಮಾತ್ರೆ', 'ಕೊಡಿ', 'nanage', 'tumba', 'talenovu', 'maatre', 'kodi'],
    contextNote: 'Clear, concise way to explain symptoms at local medical stores.',
    tips: "'Talenovu' means headache (tale = head, novu = pain), and 'maatre' is tablet.",
    replies: [
      {
        kannada: 'ಊಟ ಆದ್ಮೇಲೆ ಒಂದು ಮಾತ್ರೆ ತಗೊಳ್ಳಿ.',
        transliteration: 'Oota aadmeyle ondu maatre tagolli.',
        englishMeaning: 'Take one tablet after eating food.'
      },
      {
        kannada: 'ಜ್ವರ ಕೂಡ ಇದೆಯಾ ನಿಮಗೆ?',
        transliteration: 'Jwara kooda ideya nimage?',
        englishMeaning: 'Do you also have a fever?'
      }
    ]
  },
  {
    id: 'practice-speak-slowly',
    situation: 'everyday',
    situationLabel: 'Everyday Life',
    title: 'Asking Someone to Speak Slowly',
    promptEnglish: 'Politely explain that you do not know Kannada well and ask them to speak slowly.',
    targetKannada: 'ನನಗೆ ಕನ್ನಡ ಅಷ್ಟಾಗಿ ಬರಲ್ಲ, ಸ್ವಲ್ಪ ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ.',
    transliteration: 'Nanage Kannada ashtaagi baralla, swalpa nidhaanavaagi maatanaadi.',
    pronunciationGuide: 'na-na-ge KAN-na-da ash-TAA-gi ba-ral-la, SWAL-pa ni-DHAA-na-vaa-gi maa-ta-naa-di.',
    keywords: ['ಕನ್ನಡ', 'ಅಷ್ಟಾಗಿ', 'ಬರಲ್ಲ', 'ಸ್ವಲ್ಪ', 'ನಿಧಾನವಾಗಿ', 'ಮಾತನಾಡಿ', 'kannada', 'baralla', 'swalpa', 'nidhaanavaagi'],
    contextNote: 'Locals warmly appreciate this polite phrase and will gladly slow down.',
    tips: "'Baralla' means do not know, and 'nidhaanavaagi' means slowly.",
    replies: [
      {
        kannada: 'ಪರವಾಗಿಲ್ಲ! ನಾನು ನಿಧಾನವಾಗಿ ಹೇಳ್ತೀನಿ.',
        transliteration: 'Paravaagilla! Naanu nidhaanavaagi helteeni.',
        englishMeaning: 'No problem! I will speak slowly for you.'
      },
      {
        kannada: 'ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಬೇಕಾದರೆ ಹೇಳಲಾ?',
        transliteration: 'English-nalli bekaadare helalaa?',
        englishMeaning: 'Shall I explain in English if you prefer?'
      }
    ]
  }
];

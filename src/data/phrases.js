// Curated, human-reviewed real-world Kannada communication phrases
// Each entry includes authentic Kannada script, phonetic transliteration,
// English translation, realistic situational replies, and cultural context tips.

export const SITUATIONS = [
  { id: 'all', label: 'All Situations', icon: 'Sparkles', color: '#174C3C' },
  { id: 'transport', label: 'Transport & Directions', icon: 'Bus', color: '#174C3C' },
  { id: 'food', label: 'Food & Restaurants', icon: 'Utensils', color: '#7E3B16' },
  { id: 'shopping', label: 'Shopping & Payments', icon: 'ShoppingBag', color: '#1A4D62' },
  { id: 'health', label: 'Health & Pharmacy', icon: 'HeartPulse', color: '#8A2B3D' },
  { id: 'conversation', label: 'Everyday Conversations', icon: 'MessageCircle', color: '#2B4C32' }
];

export const CURATED_PHRASES = [
  {
    id: 'trans-01',
    situation: 'transport',
    situationLabel: 'Transport & Directions',
    english: 'Does this bus go to Mysuru?',
    intentMatch: ['bus to mysuru', 'bus go to mysore', 'mysuru bus', 'is this bus going to mysuru'],
    kannada: 'ಈ ಬಸ್ ಮೈಸೂರಿಗೆ ಹೋಗುತ್ತದೆಯೇ?',
    transliteration: 'Ee bus Mysurige hoguttadeye?',
    pronunciationGuide: 'EE bus MY-soo-ri-gay ho-gut-ta-de-ye?',
    contextNote: 'Use when boarding at Majestic (KSRTC bus stand) or satellite stations. Point to the bus board if noisy.',
    verified: true,
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
      },
      {
        kannada: 'ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ 3 ರಲ್ಲಿ ಬೇರೆ ಬಸ್ ಇದೆ.',
        transliteration: 'Platform mooraneyalli bere bus ide.',
        englishMeaning: 'There is another bus standing on platform 3.'
      }
    ]
  },
  {
    id: 'trans-02',
    situation: 'transport',
    situationLabel: 'Transport & Directions',
    english: 'Please give one ticket to Majestic.',
    intentMatch: ['one ticket to majestic', 'ticket majestic', 'majestic ticket', 'bus ticket to majestic'],
    kannada: 'ಮೆಜೆಸ್ಟಿಕ್‌ಗೆ ಒಂದು ಟಿಕೆಟ್ ಕೊಡಿ.',
    transliteration: 'Majestic-ge ondu ticket kodi.',
    pronunciationGuide: 'ma-JES-tic-ge ON-du ti-ket KO-di.',
    contextNote: 'Adding "-kodi" (give) makes it polite. Keep small currency notes or coins handy.',
    verified: true,
    replies: [
      {
        kannada: 'ಇಪ್ಪತ್ತು ರೂಪಾಯಿ ಆಗುತ್ತೆ.',
        transliteration: 'Ippattu roopayi aagutte.',
        englishMeaning: 'It will be twenty rupees.'
      },
      {
        kannada: 'ಚಿಲ್ಲರೆ ಕೊಡಿ.',
        transliteration: 'Chillare kodi.',
        englishMeaning: 'Please give exact change.'
      },
      {
        kannada: 'ಯುಪಿಐ ಕ್ಯೂಆರ್ ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.',
        transliteration: 'UPI QR code scan maadi.',
        englishMeaning: 'Scan the UPI QR code on the machine.'
      }
    ]
  },
  {
    id: 'trans-03',
    situation: 'transport',
    situationLabel: 'Transport & Directions',
    english: 'Will you go to Indiranagar by meter?',
    intentMatch: ['meter auto indiranagar', 'auto indiranagar', 'will you put meter', 'go by meter'],
    kannada: 'ಇಂದಿರಾನಗರಕ್ಕೆ ಮೀಟರ್ ಹಾಕಿ ಬರ್ತೀರಾ?',
    transliteration: 'Indiranagarakke meter haaki barteera?',
    pronunciationGuide: 'in-di-ra-NA-ga-rak-ke MEE-ter HAA-ki bar-TEE-ra?',
    contextNote: 'Respectful way to ask Bengaluru auto drivers for meter fare.',
    verified: true,
    replies: [
      {
        kannada: 'ಸರಿ, ಕೂತ್ಕೊಳ್ಳಿ.',
        transliteration: 'Sari, kootkolli.',
        englishMeaning: 'Okay, please sit inside.'
      },
      {
        kannada: 'ಮೀಟರ್ ಮೇಲೆ ಐವತ್ತು ರೂಪಾಯಿ ಜಾಸ್ತಿ ಆಗುತ್ತೆ.',
        transliteration: 'Meter mele aivattu roopayi jaasti aagutte.',
        englishMeaning: 'It will be 50 rupees extra over the meter.'
      },
      {
        kannada: 'ಬೇರೆ ಕಡೆ ಹೋಗ್ತಾ ಇದೀನಿ, ಬರಲ್ಲ.',
        transliteration: 'Bere kade hogta ideeni, baralla.',
        englishMeaning: 'I am heading somewhere else, won\'t come.'
      }
    ]
  },
  {
    id: 'trans-04',
    situation: 'transport',
    situationLabel: 'Transport & Directions',
    english: 'Where is the nearest metro station?',
    intentMatch: ['nearest metro station', 'where is metro', 'metro station ellide', 'find metro'],
    kannada: 'ಹತ್ತಿರದ ಮೆಟ್ರೋ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?',
    transliteration: 'Hattirada metro nildana ellide?',
    pronunciationGuide: 'HAT-ti-ra-da MET-ro nil-DAA-na EL-li-de?',
    contextNote: 'Ask pedestrians or traffic police when looking for Namma Metro.',
    verified: true,
    replies: [
      {
        kannada: 'ನೇರವಾಗಿ ಹೋಗಿ, ಬಲಕ್ಕೆ ತಿರುಗಿ.',
        transliteration: 'Neravaagi hogi, balakke tirugi.',
        englishMeaning: 'Go straight, then turn right.'
      },
      {
        kannada: 'ಇಲ್ಲಿಂದ ಐದು ನಿಮಿಷ ನಡಿಗೆ.',
        transliteration: 'Illinda aidu nimisha nadige.',
        englishMeaning: 'Five minutes walk from here.'
      },
      {
        kannada: 'ಸಿಗ್ನಲ್ ದಾಟಿದ ತಕ್ಷಣ ಸಿಗುತ್ತೆ.',
        transliteration: 'Signal daatida takshana sigutte.',
        englishMeaning: 'You will find it right after crossing the traffic signal.'
      }
    ]
  },
  {
    id: 'food-01',
    situation: 'food',
    situationLabel: 'Food & Restaurants',
    english: 'Two filter coffees, less sugar please.',
    intentMatch: ['two filter coffee less sugar', 'two coffees', 'filter coffee less sugar', 'coffee kam shakkar'],
    kannada: 'ಎರಡು ಫಿಲ್ಟರ್ ಕಾಫಿ, ಸಕ್ಕರೆ ಕಡಿಮೆ ಹಾಕಿ ಕೊಡಿ.',
    transliteration: 'Eradu filter coffee, sakkare kadime haaki kodi.',
    pronunciationGuide: 'eh-RA-du FIL-ter KAA-phi, SAK-ka-ray KA-di-may HAA-ki KO-di.',
    contextNote: 'Standard order format in Darshinis and traditional coffee houses.',
    verified: true,
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
      },
      {
        kannada: 'ಸಕ್ಕರೆ ಇಲ್ಲದೆಯೂ ಕೊಡಬಹುದು.',
        transliteration: 'Sakkare illadeyu kodabahudu.',
        englishMeaning: 'Can also be given without any sugar.'
      }
    ]
  },
  {
    id: 'food-02',
    situation: 'food',
    situationLabel: 'Food & Restaurants',
    english: 'What is special here today?',
    intentMatch: ['what is special today', 'special food', 'recommend food', 'today special in hotel'],
    kannada: 'ಇವತ್ತು ಇಲ್ಲಿ ಏನು ಸ್ಪೆಷಲ್ ಇದೆ?',
    transliteration: 'Ivattu illi enu special ide?',
    pronunciationGuide: 'ee-VAT-tu IL-li AY-nu SPE-shal EE-de?',
    contextNote: 'Great icebreaker when trying local Karnataka tiffin or thali.',
    verified: true,
    replies: [
      {
        kannada: 'ಮಸಾಲೆ ದೋಸೆ ಮತ್ತು ರವೆ ಇಡ್ಲಿ ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ.',
        transliteration: 'Masale dose mattu rave idli tumba chennagide.',
        englishMeaning: 'Masala dosa and rave idli are very good today.'
      },
      {
        kannada: 'ಬಿಸಿ ಬೇಳೆ ಬಾತ್ ಮತ್ತು ಕೇಸರಿ ಬಾತ್ ಫ್ರೆಶ್ ಇದೆ.',
        transliteration: 'Bisi bele bath mattu kesari bath fresh ide.',
        englishMeaning: 'Bisi bele bath and kesari bath are fresh right now.'
      },
      {
        kannada: 'ದಕ್ಷಿಣ ಕನ್ನಡ ಊಟ ರೆಡಿ ಇದೆ ಸರ್.',
        transliteration: 'Dakshina Kannada oota ready ide sir.',
        englishMeaning: 'South Canara full meals are ready, sir.'
      }
    ]
  },
  {
    id: 'food-03',
    situation: 'food',
    situationLabel: 'Food & Restaurants',
    english: 'Please give the bill.',
    intentMatch: ['give bill', 'restaurant bill', 'check please', 'how much for food bill'],
    kannada: 'ದಯವಿಟ್ಟು ಬಿಲ್ ಕೊಡಿ.',
    transliteration: 'Dayavittu bill kodi.',
    pronunciationGuide: 'da-ya-VIT-tu BILL KO-di.',
    contextNote: 'Polite and crisp. You can accompany it with the hand-writing gesture.',
    verified: true,
    replies: [
      {
        kannada: 'ತರ್ತೀನಿ ಸರ್, ಒಂದು ಕ್ಷಣ.',
        transliteration: 'Tarteeni sir, ondu kshana.',
        englishMeaning: 'Bringing it sir, just a moment.'
      },
      {
        kannada: 'ಕ್ಯಾಶ್ ಅಥವಾ ಯುಪಿಐ ನಾ?',
        transliteration: 'Cash athava UPI-na?',
        englishMeaning: 'Will you pay by cash or UPI?'
      },
      {
        kannada: 'ಕೌಂಟರ್‌ನಲ್ಲಿ ಪೇ ಮಾಡಿ ಸರ್.',
        transliteration: 'Counter-nalli pay maadi sir.',
        englishMeaning: 'Please pay directly at the counter, sir.'
      }
    ]
  },
  {
    id: 'shop-01',
    situation: 'shopping',
    situationLabel: 'Shopping & Payments',
    english: 'How much for one kilo of tomatoes and do you accept UPI?',
    intentMatch: ['how much for 1 kg tomatoes', 'tomato price upi', 'one kilo tomatoes', 'vegetable price upi'],
    kannada: 'ಒಂದು ಕಿಲೋ ಟೊಮೆಟೊ ಎಷ್ಟು? ಯುಪಿಐ ತಗೊಳ್ತೀರಾ?',
    transliteration: 'Ondu kilo tomato eshtu? UPI tagolteera?',
    pronunciationGuide: 'ON-du KEE-lo to-MA-to ESH-tu? U-P-I ta-GOL-tee-ra?',
    contextNote: 'Standard vegetable/provision store inquiry across Karnataka.',
    verified: true,
    replies: [
      {
        kannada: 'ನಲವತ್ತು ರೂಪಾಯಿ ಕಿಲೋ, ಕ್ಯೂಆರ್ ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.',
        transliteration: 'Nalavattu roopayi kilo, QR code scan maadi.',
        englishMeaning: 'Forty rupees a kilo, scan the QR code right here.'
      },
      {
        kannada: 'ಎರಡು ಕಿಲೋ ತಗೊಂಡ್ರೆ ಎಪ್ಪತ್ತು ರೂಪಾಯಿ.',
        transliteration: 'Eradu kilo tagondre eppattu roopayi.',
        englishMeaning: 'Seventy rupees if you buy two kilos.'
      },
      {
        kannada: 'ಕ್ಯಾಶ್ ಮಾತ್ರ ಸರ್, ನೆಟ್‌ವರ್ಕ್ ಇಲ್ಲ.',
        transliteration: 'Cash maatra sir, network illa.',
        englishMeaning: 'Cash only today sir, mobile network is down.'
      }
    ]
  },
  {
    id: 'shop-02',
    situation: 'shopping',
    situationLabel: 'Shopping & Payments',
    english: 'Can you give a little discount?',
    intentMatch: ['little discount', 'reduce price', 'bargain shop', 'kam karo thoda'],
    kannada: 'ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡ್ತೀರಾ?',
    transliteration: 'Swalpa kadime maateera?',
    pronunciationGuide: 'SWAL-pa KA-di-may maa-TEE-ra?',
    contextNote: 'Gentle, friendly bargaining phrase for local bazaars like Malleshwaram or KR Market.',
    verified: true,
    replies: [
      {
        kannada: 'ಇದು ಫಿಕ್ಸ್ಡ್ ರೇಟ್ ಮೇಡಂ / ಸರ್.',
        transliteration: 'Idu fixed rate madam / sir.',
        englishMeaning: 'This is a fixed price madam / sir.'
      },
      {
        kannada: 'ಸರಿ, ಹತ್ತು ರೂಪಾಯಿ ಕಡಿಮೆ ಕೊಡಿ.',
        transliteration: 'Sari, hattu roopayi kadime kodi.',
        englishMeaning: 'Okay, give ten rupees less.'
      },
      {
        kannada: 'ಎರಡು ಪೀಸ್ ತಗೊಂಡ್ರೆ ರಿಯಾಯಿತಿ ಕೊಡ್ತೀನಿ.',
        transliteration: 'Eradu piece tagondre riyaayiti kodteeni.',
        englishMeaning: 'I will give a discount if you buy two items.'
      }
    ]
  },
  {
    id: 'shop-03',
    situation: 'shopping',
    situationLabel: 'Shopping & Payments',
    english: 'Do you accept Google Pay or PhonePe?',
    intentMatch: ['google pay phonepe', 'online payment', 'scanner ideya', 'accept gpay'],
    kannada: 'ಗೂಗಲ್ ಪೇ ಅಥವಾ ಫೋನ್ ಪೇ ತಗೊಳ್ತೀರಾ?',
    transliteration: 'Google Pay athava PhonePe tagolteera?',
    pronunciationGuide: 'goo-gal pay a-tha-va phone-pay ta-GOL-tee-ra?',
    contextNote: 'Almost all roadside vendors and shops in Karnataka support UPI.',
    verified: true,
    replies: [
      {
        kannada: 'ಹೌದು, ಆ ಬೋರ್ಡ್ ಮೇಲಿರೋ ಕ್ಯೂಆರ್ ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.',
        transliteration: 'Haudu, aa board meliro QR code scan maadi.',
        englishMeaning: 'Yes, scan the QR code hanging on that board.'
      },
      {
        kannada: 'ಪೇ ಆದಮೇಲೆ ಸೌಂಡ್‌ಬಾಕ್ಸ್ ಮೆಸೇಜ್ ಬರಲಿ.',
        transliteration: 'Pay aadmele soundbox message barali.',
        englishMeaning: 'Once paid, wait for the voice soundbox announcement.'
      },
      {
        kannada: 'ಸರ್ವರ್ ಡೌನ್ ಇದೆ, ದಯವಿಟ್ಟು ನಗದು ಕೊಡಿ.',
        transliteration: 'Server down ide, dayavittu nagadu kodi.',
        englishMeaning: 'Server is down, please give cash.'
      }
    ]
  },
  {
    id: 'health-01',
    situation: 'health',
    situationLabel: 'Health & Pharmacy',
    english: 'I have a severe headache, please give medicine.',
    intentMatch: ['headache medicine', 'medicine for headache', 'severe headache', 'pharmacist headache'],
    kannada: 'ನನಗೆ ತುಂಬಾ ತಲೆನೋವು ಇದೆ, ದಯವಿಟ್ಟು ಮಾತ್ರೆ ಕೊಡಿ.',
    transliteration: 'Nanage tumba talenovu ide, dayavittu maatre kodi.',
    pronunciationGuide: 'na-na-ge TUM-ba ta-lay-NO-vu ee-de, da-ya-VIT-tu MAA-tre KO-di.',
    contextNote: 'Useful at medical stores (pharmacies). For severe symptoms, always consult a licensed doctor.',
    verified: true,
    replies: [
      {
        kannada: 'ಊಟ ಆದ್ಮೇಲೆ ಒಂದು ಮಾತ್ರೆ ತಗೊಳ್ಳಿ.',
        transliteration: 'Oota aadmeyle ondu maatre tagolli.',
        englishMeaning: 'Take one tablet after eating food.'
      },
      {
        kannada: 'ಎರಡು ದಿನಕ್ಕೆ ಸಾಕಾಗುವಷ್ಟು ಕೊಡಲಾ?',
        transliteration: 'Eradu dinakke saakaaguvashthu kodala?',
        englishMeaning: 'Shall I give enough for two days?'
      },
      {
        kannada: 'ಜ್ವರ ಕೂಡ ಇದೆಯಾ ನಿಮಗೆ?',
        transliteration: 'Jwara kooda ideya nimage?',
        englishMeaning: 'Do you also have a fever?'
      }
    ]
  },
  {
    id: 'health-02',
    situation: 'health',
    situationLabel: 'Health & Pharmacy',
    english: 'I have a sore throat and cough.',
    intentMatch: ['sore throat cough', 'throat pain', 'cough syrup', 'pharmacy throat'],
    kannada: 'ನನಗೆ ಗಂಟಲು ನೋವು ಮತ್ತು ಕೆಮ್ಮು ಇದೆ.',
    transliteration: 'Nanage gantalu novu mattu kemmu ide.',
    pronunciationGuide: 'na-na-ge GAN-ta-lu NO-vu mat-tu KEM-mu ee-de.',
    contextNote: 'State your symptoms clearly to get appropriate lozenges or syrup.',
    verified: true,
    replies: [
      {
        kannada: 'ಈ ಸಿರಪ್ ದಿನಕ್ಕೆ ಎರಡು ಬಾರಿ ಬಿಸಿ ನೀರಿನ ಜೊತೆ ತಗೊಳ್ಳಿ.',
        transliteration: 'Ee syrup dinakke eradu baari bisi neerina jote tagolli.',
        englishMeaning: 'Take this syrup twice daily with warm water.'
      },
      {
        kannada: 'ಡಾಕ್ಟರ್ ಚೀಟಿ ಇದೆಯಾ?',
        transliteration: 'Doctor cheeti ideya?',
        englishMeaning: 'Do you have a doctor\'s prescription slip?'
      },
      {
        kannada: 'ತಣ್ಣೀರು ಕುಡಿಯಬೇಡಿ, ಬಿಸಿ ನೀರು ಕುಡಿಯಿರಿ.',
        transliteration: 'Tanneeru kudiyabedi, bisi neeru kudiyiri.',
        englishMeaning: 'Do not drink cold water, drink warm water.'
      }
    ]
  },
  {
    id: 'conv-01',
    situation: 'conversation',
    situationLabel: 'Everyday Conversations',
    english: 'Hello, how are you? Nice to meet you.',
    intentMatch: ['hello how are you', 'how are you', 'namaskara', 'nice to meet you'],
    kannada: 'ನಮಸ್ಕಾರ, ಹೇಗಿದ್ದೀರಾ? ನಿಮ್ಮನ್ನು ಭೇಟಿಯಾಗಿದ್ದು ಖುಷಿಯಾಯ್ತು.',
    transliteration: 'Namaskara, hegiddeera? Nimmannu bhetiyaagiddu khushiyaaytu.',
    pronunciationGuide: 'na-mas-KAA-ra, hay-gid-DEE-ra? nim-man-nu bhay-ti-yaa-gid-du khu-shi-yaay-tu.',
    contextNote: 'Universally respectful greeting across all ages and social settings.',
    verified: true,
    replies: [
      {
        kannada: 'ನಮಸ್ಕಾರ! ನಾನು ಚೆನ್ನಾಗಿದ್ದೀನಿ, ನೀವು ಹೇಗಿದ್ದೀರಾ?',
        transliteration: 'Namaskara! Naanu chennaagiddeeni, neevu hegiddeera?',
        englishMeaning: 'Hello! I am doing great, how are you?'
      },
      {
        kannada: 'ಎಲ್ಲ ಆರಾಮ! ನೀವೇನು ಸಮಾಚಾರ?',
        transliteration: 'Ella aaraama! Neevenu samaachara?',
        englishMeaning: 'All well! What is the news with you?'
      },
      {
        kannada: 'ನನಗೂ ತುಂಬಾ ಸಂತೋಷವಾಯ್ತು.',
        transliteration: 'Nanagoo tumba santoshavaytu.',
        englishMeaning: 'I am very pleased to meet you too.'
      }
    ]
  },
  {
    id: 'conv-02',
    situation: 'conversation',
    situationLabel: 'Everyday Conversations',
    english: 'I do not know Kannada well, please speak slowly.',
    intentMatch: ['i do not know kannada', 'speak slowly', 'kannada baralla', 'learning kannada'],
    kannada: 'ನನಗೆ ಕನ್ನಡ ಅಷ್ಟಾಗಿ ಬರಲ್ಲ, ಸ್ವಲ್ಪ ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ.',
    transliteration: 'Nanage Kannada ashtaagi baralla, swalpa nidhaanavaagi maatanaadi.',
    pronunciationGuide: 'na-na-ge KAN-na-da ash-TAA-gi ba-ral-la, SWAL-pa ni-DHAA-na-vaa-gi maa-ta-naa-di.',
    contextNote: 'Locals genuinely appreciate this phrase and will immediately slow down or help out.',
    verified: true,
    replies: [
      {
        kannada: 'ಪರವಾಗಿಲ್ಲ! ನೀವು ಚೆನ್ನಾಗಿ ಕಲೀತಾ ಇದ್ದೀರಾ.',
        transliteration: 'Paravaagilla! Neevu chennaagi kaleetaa iddeera.',
        englishMeaning: 'No problem! You are learning very well.'
      },
      {
        kannada: 'ಸರಿ, ನಾನು ನಿಧಾನವಾಗಿ ಹೇಳ್ತೀನಿ.',
        transliteration: 'Sari, naanu nidhaanavaagi helteeni.',
        englishMeaning: 'Okay, I will speak slowly for you.'
      },
      {
        kannada: 'ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಬೇಕಾದರೆ ಹೇಳಲಾ?',
        transliteration: 'English-nalli bekaadare helalaa?',
        englishMeaning: 'Shall I explain in English if you prefer?'
      }
    ]
  },
  {
    id: 'conv-03',
    situation: 'conversation',
    situationLabel: 'Everyday Conversations',
    english: 'Thank you very much for your help!',
    intentMatch: ['thank you very much', 'thanks for help', 'tumba dhanyavadagalu', 'thanks'],
    kannada: 'ನಿಮ್ಮ ಸಹಾಯಕ್ಕೆ ತುಂಬಾ ಧನ್ಯವಾದಗಳು!',
    transliteration: 'Nimma sahaayakke tumba dhanyavaadagalu!',
    pronunciationGuide: 'nim-ma sa-HAA-yak-ke TUM-ba dhan-ya-vaa-da-ga-lu!',
    contextNote: 'Warm, sincere way to show gratitude to anyone who assists you.',
    verified: true,
    replies: [
      {
        kannada: 'ಪರವಾಗಿಲ್ಲ, ಸಂತೋಷ!',
        transliteration: 'Paravaagilla, santosha!',
        englishMeaning: 'No problem at all, glad to help!'
      },
      {
        kannada: 'ಯಾವಾಗ ಬೇಕಾದ್ರೂ ಕೇಳಿ.',
        transliteration: 'Yaavaaga bekaadroo keli.',
        englishMeaning: 'Feel free to ask anytime.'
      },
      {
        kannada: 'ಶುಭ ದಿನ!',
        transliteration: 'Shubha dina!',
        englishMeaning: 'Have a wonderful day!'
      }
    ]
  }
];

// Helper to find best curated match offline or when AI is unavailable
export function findMatchingCuratedPhrase(intent, situation = 'all') {
  if (!intent || !intent.trim()) return null;
  const lower = intent.toLowerCase().trim();

  // Filter by situation if specified
  let candidates = CURATED_PHRASES;
  if (situation && situation !== 'all') {
    candidates = candidates.filter(p => p.situation === situation);
    // If no candidate in specific situation, fallback to all
    if (candidates.length === 0) candidates = CURATED_PHRASES;
  }

  // Exact or keyword match
  for (const phrase of candidates) {
    if (phrase.english.toLowerCase() === lower) return phrase;
    if (phrase.intentMatch && phrase.intentMatch.some(m => lower.includes(m) || m.includes(lower))) {
      return phrase;
    }
  }

  // Word overlap scoring
  const inputWords = lower.split(/\W+/).filter(w => w.length > 2);
  let bestPhrase = null;
  let maxScore = 0;

  for (const phrase of candidates) {
    const targetWords = (phrase.english + ' ' + (phrase.intentMatch || []).join(' ')).toLowerCase().split(/\W+/);
    let score = 0;
    for (const w of inputWords) {
      if (targetWords.includes(w)) score++;
    }
    if (score > maxScore) {
      maxScore = score;
      bestPhrase = phrase;
    }
  }

  if (maxScore >= 1) return bestPhrase;

  // Fallback to primary bus demo phrase if transport or default
  return CURATED_PHRASES[0];
}

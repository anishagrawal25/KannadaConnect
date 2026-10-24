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
    id: 'trans-05',
    situation: 'transport',
    situationLabel: 'Transport & Directions',
    english: 'Where is the washroom or toilet?',
    intentMatch: [
      'washroom', 'toilet', 'restroom', 'bathroom', 'where is washroom', 
      'where is toilet', 'find washroom', 'need washroom', 'need toilet', 'loo'
    ],
    kannada: 'ವಾಶ್‌ರೂಮ್ ಎಲ್ಲಿದೆ?',
    transliteration: 'Washroom ellide?',
    pronunciationGuide: 'WASH-room EL-li-de?',
    contextNote: 'Widely understood across bus stations, restaurants, metro terminals, and petrol pumps.',
    verified: true,
    replies: [
      {
        kannada: 'ಹಿಂದೆ ಬಲಭಾಗದಲ್ಲಿದೆ.',
        transliteration: 'Hinde balabhaagadallide.',
        englishMeaning: 'At the back on the right-hand side.'
      },
      {
        kannada: 'ಮೆಟ್ಟಿಲು ಹತ್ತಿ ಮೇಲ್ಗಡೆ ಇದೆ.',
        transliteration: 'Mettilu hatti melgade ide.',
        englishMeaning: 'Go up the stairs, it is on the first floor.'
      },
      {
        kannada: 'ನೇರವಾಗಿ ಹೋಗಿ ಎಡಕ್ಕೆ ತಿರುಗಿ.',
        transliteration: 'Neravaagi hogi edakke tirugi.',
        englishMeaning: 'Go straight and turn left.'
      }
    ]
  },
  {
    id: 'trans-06',
    situation: 'transport',
    situationLabel: 'Transport & Directions',
    english: 'Please stop the vehicle right here.',
    intentMatch: [
      'stop here', 'please stop here', 'stop auto', 'stop bus here', 
      'drop me here', 'stop car', 'stop vehicle', 'drop here', 'ille nillisi'
    ],
    kannada: 'ದಯವಿಟ್ಟು ಇಲ್ಲೇ ನಿಲ್ಲಿಸಿ.',
    transliteration: 'Dayavittu ille nillisi.',
    pronunciationGuide: 'da-ya-VIT-tu IL-lay nil-LI-si.',
    contextNote: 'Say clearly to bus conductors, BMTC drivers near the door, or auto drivers as you reach your stop.',
    verified: true,
    replies: [
      {
        kannada: 'ಸರಿ ಸರ್, ಇಳಿಯಿರಿ.',
        transliteration: 'Sari sir, iliyiri.',
        englishMeaning: 'Okay sir, please step down carefully.'
      },
      {
        kannada: 'ಸಿಗ್ನಲ್ ದಾಟಿದ ಮೇಲೆ ನಿಲ್ಲಿಸ್ತೀನಿ.',
        transliteration: 'Signal daatida mele nillisteeni.',
        englishMeaning: 'I will stop right after crossing the traffic signal.'
      }
    ]
  },
  {
    id: 'food-01',
    situation: 'food',
    situationLabel: 'Food & Restaurants',
    english: 'Two filter coffees, less sugar please.',
    intentMatch: [
      'coffee', 'i need coffee', 'two filter coffee less sugar', 'two coffees', 
      'filter coffee less sugar', 'coffee kam shakkar', 'one coffee', 'filter coffee',
      'give coffee', 'hot coffee', 'kaafi', 'want coffee', 'black coffee'
    ],
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
    intentMatch: ['what is special today', 'special food', 'recommend food', 'today special in hotel', 'today special'],
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
    intentMatch: [
      'bill', 'give bill', 'restaurant bill', 'check please', 'how much for food bill',
      'bill please', 'the bill', 'check', 'account', 'total bill', 'food bill', 'pay bill'
    ],
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
    id: 'food-04',
    situation: 'food',
    situationLabel: 'Food & Restaurants',
    english: 'Please give one cup of tea.',
    intentMatch: [
      'tea', 'i need tea', 'need tea', 'give tea', 'one tea', 'chai', 
      'hot tea', 'tea please', 'cup of tea', 'want tea', 'one cup tea',
      'chaha', 'chaa', 'kadak chai', 'black tea', 'lemon tea', 'i want tea'
    ],
    kannada: 'ದಯವಿಟ್ಟು ಒಂದು ಕಪ್ ಟೀ ಕೊಡಿ.',
    transliteration: 'Dayavittu ondu cup tea kodi.',
    pronunciationGuide: 'da-ya-VIT-tu ON-du cup TEE KO-di.',
    contextNote: 'Standard order at local tea stalls, darshinis, and bakeries across Karnataka.',
    verified: true,
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
      },
      {
        kannada: 'ಸಕ್ಕರೆ ಕಡಿಮೆ ಹಾಕ್ಲಾ?',
        transliteration: 'Sakkare kadime haaklaa?',
        englishMeaning: 'Shall I put less sugar?'
      }
    ]
  },
  {
    id: 'food-05',
    situation: 'food',
    situationLabel: 'Food & Restaurants',
    english: 'Please give drinking water.',
    intentMatch: [
      'water', 'drinking water', 'need water', 'i need water', 'give water', 
      'glass of water', 'water bottle', 'neeru', 'water please', 'bottle of water',
      'cold water', 'hot water', 'normal water', 'kudiyoke neeru'
    ],
    kannada: 'ದಯವಿಟ್ಟು ಕುಡಿಯಲು ನೀರು ಕೊಡಿ.',
    transliteration: 'Dayavittu kudiyalu neeru kodi.',
    pronunciationGuide: 'da-ya-VIT-tu ku-di-YA-lu NEE-ru KO-di.',
    contextNote: 'Polite and understood everywhere—restaurants, hotels, shops, and homes.',
    verified: true,
    replies: [
      {
        kannada: 'ತಣ್ಣೀರು ಬೇಕಾ, ಬಿಸಿ ನೀರು ಬೇಕಾ?',
        transliteration: 'Tanneeru bekaa, bisi neeru bekaa?',
        englishMeaning: 'Do you want cold water or warm water?'
      },
      {
        kannada: 'ಬಾಟಲ್ ನೀರು ತರ್ಲಾ ಸರ್?',
        transliteration: 'Bottle neeru tarlaa sir?',
        englishMeaning: 'Shall I bring a packaged water bottle, sir?'
      },
      {
        kannada: 'ಇಲ್ಲೇ ಜಗ್ ಇದೆ, ತಗೊಳ್ಳಿ.',
        transliteration: 'Ille jug ide, tagolli.',
        englishMeaning: 'The water jug is right here, please take it.'
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
    id: 'shop-04',
    situation: 'shopping',
    situationLabel: 'Shopping & Payments',
    english: 'Please give a carry bag or cover.',
    intentMatch: ['bag', 'cover', 'carry bag', 'carrybag', 'plastic cover', 'cloth bag', 'need a bag', 'give bag', 'cover kodi'],
    kannada: 'ದಯವಿಟ್ಟು ಒಂದು ಕವರ್ ಕೊಡಿ.',
    transliteration: 'Dayavittu ondu cover kodi.',
    pronunciationGuide: 'da-ya-VIT-tu ON-du CO-ver KO-di.',
    contextNote: 'Shopkeepers throughout Karnataka refer to bags and carry bags as \'cover\'.',
    verified: true,
    replies: [
      {
        kannada: 'ಹತ್ತು ರೂಪಾಯಿ ಎಕ್ಸ್ಟ್ರಾ ಆಗುತ್ತೆ ಸರ್.',
        transliteration: 'Hattu roopayi extra aagutte sir.',
        englishMeaning: 'It will be ten rupees extra, sir.'
      },
      {
        kannada: 'ಬಟ್ಟೆ ಬ್ಯಾಗ್ ಇದೆ, ಇಪ್ಪತ್ತು ರೂಪಾಯಿ.',
        transliteration: 'Batte bag ide, ippattu roopayi.',
        englishMeaning: 'Cloth bag is available for twenty rupees.'
      },
      {
        kannada: 'ಇಲ್ಲೇ ಇದೆ, ತಗೊಳ್ಳಿ.',
        transliteration: 'Ille ide, tagolli.',
        englishMeaning: 'It is right here, please take it.'
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
    id: 'health-03',
    situation: 'health',
    situationLabel: 'Health & Pharmacy',
    english: 'Where is the nearest hospital or medical store?',
    intentMatch: ['hospital', 'nearest hospital', 'where is hospital', 'medical store', 'pharmacy near me', 'clinic', 'doctor', 'doctor clinic'],
    kannada: 'ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ ಅಥವಾ ಮೆಡಿಕಲ್ ಶಾಪ್ ಎಲ್ಲಿದೆ?',
    transliteration: 'Hathirada aaspathre athava medical shop ellide?',
    pronunciationGuide: 'HAT-ti-ra-da aas-PAT-ray a-tha-va ME-di-cal shop EL-li-de?',
    contextNote: 'Crucial emergency query understood by any local resident or traffic police.',
    verified: true,
    replies: [
      {
        kannada: 'ಮುಂದಿನ ಸಿಗ್ನಲ್ ಹತ್ತಿರ ದೊಡ್ಡ ಆಸ್ಪತ್ರೆ ಇದೆ.',
        transliteration: 'Mundina signal hathira dodda aaspathre ide.',
        englishMeaning: 'There is a big hospital near the next traffic signal.'
      },
      {
        kannada: 'ಎರಡು ನಿಮಿಷ ನಡೀರಿ, ಬಲಭಾಗದಲ್ಲೇ ಮೆಡಿಕಲ್ ಶಾಪ್ ಇದೆ.',
        transliteration: 'Eradu nimisha nadeeri, balabhaagadalle medical shop ide.',
        englishMeaning: 'Walk for two minutes, the medical shop is on the right side.'
      },
      {
        kannada: 'ಆಂಬ್ಯುಲೆನ್ಸ್ ಬೇಕಾದರೆ 108 ಗೆ ಕಾಲ್ ಮಾಡಿ.',
        transliteration: 'Ambulance bekaadare 108 ge call maadi.',
        englishMeaning: 'Call 108 if you need an emergency ambulance.'
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
  },
  {
    id: 'conv-04',
    situation: 'conversation',
    situationLabel: 'Everyday Conversations',
    english: 'How much does this cost?',
    intentMatch: ['how much', 'cost', 'price', 'eshtu', 'how much is this', 'what is the price', 'rate', 'eshtu roopayi'],
    kannada: 'ಇದು ಎಷ್ಟು ರೂಪಾಯಿ?',
    transliteration: 'Idu eshtu roopayi?',
    pronunciationGuide: 'EE-du ESH-tu roo-PAA-yi?',
    contextNote: 'Universal question when asking the price of any item or service across Karnataka.',
    verified: true,
    replies: [
      {
        kannada: 'ನೂರು ರೂಪಾಯಿ ಮಾತ್ರ.',
        transliteration: 'Nooru roopayi maatra.',
        englishMeaning: 'One hundred rupees only.'
      },
      {
        kannada: 'ಬೋರ್ಡ್ ಮೇಲೆ ರೇಟ್ ಹಾಕಿದ್ದೀವಿ ನೋಡಿ.',
        transliteration: 'Board mele rate haakiddeevi nodi.',
        englishMeaning: 'Please check, the rates are listed on the board.'
      },
      {
        kannada: 'ಎಷ್ಟು ಪೀಸ್ ತಗೊಳ್ತೀರಾ?',
        transliteration: 'Eshtu piece tagolteera?',
        englishMeaning: 'How many pieces will you buy?'
      }
    ]
  }
];

// Helper to find best curated match offline or when AI is unavailable
export function findMatchingCuratedPhrase(intent, situation = 'all') {
  if (!intent || !intent.trim()) return null;

  const raw = intent.toLowerCase().trim();
  const normalized = raw.replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, ' ').replace(/\s+/g, ' ').trim();
  const tokens = normalized.split(' ').filter(t => t.length >= 2);

  const STOP_WORDS = new Set([
    'i', 'me', 'my', 'we', 'our', 'you', 'your', 'he', 'she', 'it', 'they',
    'a', 'an', 'the', 'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being',
    'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'as', 'into',
    'want', 'need', 'please', 'give', 'can', 'could', 'would', 'should',
    'tell', 'ask', 'know', 'how', 'what', 'where', 'when', 'why', 'which',
    'some', 'any', 'one', 'two', 'this', 'that', 'these', 'those'
  ]);

  const contentTokens = tokens.filter(t => !STOP_WORDS.has(t));

  // 1. Direct exact or intentMatch array check
  for (const phrase of CURATED_PHRASES) {
    const engLower = phrase.english.toLowerCase();
    if (engLower === raw || engLower.replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, ' ').trim() === normalized) {
      return phrase;
    }
    if (phrase.intentMatch && phrase.intentMatch.some(m => {
      const mNorm = m.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, ' ').trim();
      return normalized === mNorm || normalized.includes(mNorm) || mNorm.includes(normalized);
    })) {
      // Prioritize match if user also selected same situation
      if (!situation || situation === 'all' || phrase.situation === situation) {
        return phrase;
      }
    }
  }

  // If matched above across situations, do a prioritized pass
  for (const phrase of CURATED_PHRASES) {
    if (phrase.intentMatch && phrase.intentMatch.some(m => {
      const mNorm = m.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, ' ').trim();
      return normalized.includes(mNorm) || mNorm.includes(normalized);
    })) {
      return phrase;
    }
  }

  // 2. High-intent keyword mappings (immediate precision for common Bangalore/Karnataka needs)
  const KEYWORD_MAP = [
    { keys: ['tea', 'chai', 'chaa', 'chaha'], id: 'food-04' },
    { keys: ['water', 'neeru', 'bottle', 'kudiyalu'], id: 'food-05' },
    { keys: ['coffee', 'kaafi', 'filter coffee'], id: 'food-01' },
    { keys: ['bill', 'check', 'hisab', 'payment'], id: 'food-03' },
    { keys: ['washroom', 'toilet', 'restroom', 'bathroom', 'loo', 'mutti'], id: 'trans-05' },
    { keys: ['stop', 'drop', 'halt', 'nillisi'], id: 'trans-06' },
    { keys: ['auto', 'meter', 'rickshaw'], id: 'trans-02' },
    { keys: ['mysuru', 'mysore', 'bus stand', 'ksrtc', 'conductor'], id: 'trans-01' },
    { keys: ['metro', 'namma metro', 'token', 'smart card'], id: 'trans-03' },
    { keys: ['majestic', 'city railway', 'kempegowda'], id: 'trans-04' },
    { keys: ['discount', 'kam', 'bargain', 'reduce', 'offer', 'less'], id: 'shop-02' },
    { keys: ['upi', 'gpay', 'phonepe', 'paytm', 'qr', 'scan'], id: 'shop-03' },
    { keys: ['tomato', 'vegetable', 'kilo', 'kg', 'fruit'], id: 'shop-01' },
    { keys: ['bag', 'cover', 'carrybag', 'carry bag'], id: 'shop-04' },
    { keys: ['headache', 'medicine', 'tablet', 'pharmacy', 'pain', 'fever', 'medical'], id: 'health-01' },
    { keys: ['cough', 'throat', 'cold', 'syrup'], id: 'health-02' },
    { keys: ['hospital', 'clinic', 'doctor'], id: 'health-03' },
    { keys: ['hello', 'hi', 'namaskara', 'greet'], id: 'conv-01' },
    { keys: ['slowly', 'slow', 'baralla', 'kannada baralla', 'english'], id: 'conv-02' },
    { keys: ['thank', 'thanks', 'dhanyavadagalu', 'grateful'], id: 'conv-03' },
    { keys: ['cost', 'price', 'rate', 'eshtu', 'how much'], id: 'conv-04' }
  ];

  for (const mapping of KEYWORD_MAP) {
    const hasKey = mapping.keys.some(k => normalized.includes(k) || tokens.includes(k));
    if (hasKey) {
      const target = CURATED_PHRASES.find(p => p.id === mapping.id);
      if (target) return target;
    }
  }

  // 3. Token-based scoring
  let bestPhrase = null;
  let maxScore = 0;

  for (const phrase of CURATED_PHRASES) {
    const targetText = (
      phrase.english + ' ' +
      (phrase.intentMatch || []).join(' ') + ' ' +
      (phrase.transliteration || '')
    ).toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, ' ');

    const targetTokens = new Set(targetText.split(/\s+/).filter(Boolean));
    let score = 0;

    // Check content tokens first
    for (const t of contentTokens) {
      if (targetTokens.has(t)) {
        score += 5;
      } else {
        for (const tt of targetTokens) {
          if (tt.startsWith(t) || t.startsWith(tt)) {
            score += 2;
            break;
          }
        }
      }
    }

    // Give slight situation bonus if matches user situation
    if (situation && situation !== 'all' && phrase.situation === situation) {
      score += 1;
    }

    if (score > maxScore) {
      maxScore = score;
      bestPhrase = phrase;
    }
  }

  // ONLY return if there was an actual meaningful match (score >= 4)
  if (maxScore >= 4) {
    return bestPhrase;
  }

  // If score is low or 0, return null (never falsely return an unrelated phrase)
  return null;
}

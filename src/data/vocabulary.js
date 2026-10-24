// Practical everyday Kannada vocabulary for real-world situations
// Includes Kannada script, readable transliteration, English meanings, and practical examples.

export const VOCAB_CATEGORIES = [
  { id: 'all', label: 'All Vocabulary', icon: 'Sparkles' },
  { id: 'transport', label: 'Transport & Directions', icon: 'Bus' },
  { id: 'food', label: 'Food & Restaurants', icon: 'Utensils' },
  { id: 'shopping', label: 'Shopping & Payments', icon: 'ShoppingBag' },
  { id: 'health', label: 'Health & Pharmacy', icon: 'HeartPulse' },
  { id: 'everyday', label: 'Everyday Life', icon: 'MessageCircle' }
];

export const VOCABULARY_LIST = [
  // ==================== TRANSPORT & DIRECTIONS ====================
  {
    id: 'vocab-trans-01',
    category: 'transport',
    categoryLabel: 'Transport & Directions',
    kannada: 'ಬಸ್',
    transliteration: 'Bas',
    english: 'Bus',
    example: {
      kannada: 'ಈ ಬಸ್ ಮೈಸೂರಿಗೆ ಹೋಗುತ್ತದೆಯೇ?',
      transliteration: 'Ee bus Mysurige hoguttadeye?',
      english: 'Does this bus go to Mysuru?'
    }
  },
  {
    id: 'vocab-trans-02',
    category: 'transport',
    categoryLabel: 'Transport & Directions',
    kannada: 'ಆಟೋ',
    transliteration: 'Aato',
    english: 'Auto rickshaw',
    example: {
      kannada: 'ಆಟೋ ಮೀಟರ್ ಹಾಕಿ ಬರ್ತೀರಾ?',
      transliteration: 'Aato meter haaki barteera?',
      english: 'Will you go by meter in the auto?'
    }
  },
  {
    id: 'vocab-trans-03',
    category: 'transport',
    categoryLabel: 'Transport & Directions',
    kannada: 'ಹೋಗಿ',
    transliteration: 'Hogi',
    english: 'Go / Please go',
    example: {
      kannada: 'ನೇರವಾಗಿ ಹೋಗಿ ಎಡಕ್ಕೆ ತಿರುಗಿ.',
      transliteration: 'Neravaagi hogi edakke tirugi.',
      english: 'Go straight and turn left.'
    }
  },
  {
    id: 'vocab-trans-04',
    category: 'transport',
    categoryLabel: 'Transport & Directions',
    kannada: 'ನಿಲ್ಲಿಸಿ',
    transliteration: 'Nillisi',
    english: 'Stop / Please stop',
    example: {
      kannada: 'ದಯವಿಟ್ಟು ಇಲ್ಲೇ ನಿಲ್ಲಿಸಿ.',
      transliteration: 'Dayavittu ille nillisi.',
      english: 'Please stop right here.'
    }
  },
  {
    id: 'vocab-trans-05',
    category: 'transport',
    categoryLabel: 'Transport & Directions',
    kannada: 'ಎಡಕ್ಕೆ',
    transliteration: 'Edakke',
    english: 'To the left',
    example: {
      kannada: 'ಮುಂದಿನ ಸಿಗ್ನಲ್‌ನಲ್ಲಿ ಎಡಕ್ಕೆ ತಿರುಗಿ.',
      transliteration: 'Mundina signal-nalli edakke tirugi.',
      english: 'Turn to the left at the next traffic signal.'
    }
  },
  {
    id: 'vocab-trans-06',
    category: 'transport',
    categoryLabel: 'Transport & Directions',
    kannada: 'ಬಲಕ್ಕೆ',
    transliteration: 'Balakke',
    english: 'To the right',
    example: {
      kannada: 'ಅಂಗಡಿ ಬಲಭಾಗದಲ್ಲಿದೆ.',
      transliteration: 'Angadi balabhaagadallide.',
      english: 'The shop is on the right side.'
    }
  },
  {
    id: 'vocab-trans-07',
    category: 'transport',
    categoryLabel: 'Transport & Directions',
    kannada: 'ನೇರವಾಗಿ',
    transliteration: 'Neravaagi',
    english: 'Straight ahead',
    example: {
      kannada: 'ನೇರವಾಗಿ ಎರಡು ನಿಮಿಷ ನಡೀರಿ.',
      transliteration: 'Neravaagi eradu nimisha nadeeri.',
      english: 'Walk straight ahead for two minutes.'
    }
  },
  {
    id: 'vocab-trans-08',
    category: 'transport',
    categoryLabel: 'Transport & Directions',
    kannada: 'ಹತ್ತಿರ',
    transliteration: 'Hathira',
    english: 'Near / Close by',
    example: {
      kannada: 'ಮೆಟ್ರೋ ಸ್ಟೇಷನ್ ಹತ್ತಿರ ಇದೆಯಾ?',
      transliteration: 'Metro station hathira ideya?',
      english: 'Is the metro station nearby?'
    }
  },
  {
    id: 'vocab-trans-09',
    category: 'transport',
    categoryLabel: 'Transport & Directions',
    kannada: 'ದೂರ',
    transliteration: 'Doora',
    english: 'Far away',
    example: {
      kannada: 'ಇಲ್ಲಿಂದ ತುಂಬಾ ದೂರನಾ?',
      transliteration: 'Illinda tumba dooranaa?',
      english: 'Is it very far from here?'
    }
  },
  {
    id: 'vocab-trans-10',
    category: 'transport',
    categoryLabel: 'Transport & Directions',
    kannada: 'ಇಳಿಯಿರಿ',
    transliteration: 'Iliyiri',
    english: 'Get down / Step off',
    example: {
      kannada: 'ಬಸ್ ನಿಂತ ಮೇಲೆ ಇಳಿಯಿರಿ.',
      transliteration: 'Bus ninta mele iliyiri.',
      english: 'Please get down after the bus stops.'
    }
  },

  // ==================== FOOD & RESTAURANTS ====================
  {
    id: 'vocab-food-01',
    category: 'food',
    categoryLabel: 'Food & Restaurants',
    kannada: 'ಊಟ',
    transliteration: 'Oota',
    english: 'Full meal / Lunch / Dinner',
    example: {
      kannada: 'ಊಟ ರೆಡಿ ಇದೆಯಾ?',
      transliteration: 'Oota ready ideya?',
      english: 'Is the meal ready?'
    }
  },
  {
    id: 'vocab-food-02',
    category: 'food',
    categoryLabel: 'Food & Restaurants',
    kannada: 'ತಿಂಡಿ',
    transliteration: 'Tindi',
    english: 'Breakfast / Tiffin snacks',
    example: {
      kannada: 'ಬೆಳಗ್ಗಿನ ತಿಂಡಿ ಏನು ಸ್ಪೆಷಲ್?',
      transliteration: 'Belaggina tindi enu special?',
      english: 'What is special for morning breakfast?'
    }
  },
  {
    id: 'vocab-food-03',
    category: 'food',
    categoryLabel: 'Food & Restaurants',
    kannada: 'ನೀರು',
    transliteration: 'Neeru',
    english: 'Drinking water',
    example: {
      kannada: 'ದಯವಿಟ್ಟು ಕುಡಿಯಲು ನೀರು ಕೊಡಿ.',
      transliteration: 'Dayavittu kudiyalu neeru kodi.',
      english: 'Please give drinking water.'
    }
  },
  {
    id: 'vocab-food-04',
    category: 'food',
    categoryLabel: 'Food & Restaurants',
    kannada: 'ಟೀ / ಚಹಾ',
    transliteration: 'Tea / Chaha',
    english: 'Tea',
    example: {
      kannada: 'ಒಂದು ಕಪ್ ಬಿಸಿ ಟೀ ಕೊಡಿ.',
      transliteration: 'Ondu cup bisi tea kodi.',
      english: 'Please give one cup of hot tea.'
    }
  },
  {
    id: 'vocab-food-05',
    category: 'food',
    categoryLabel: 'Food & Restaurants',
    kannada: 'ಕಾಫಿ',
    transliteration: 'Kaaphi',
    english: 'Coffee',
    example: {
      kannada: 'ಫಿಲ್ಟರ್ ಕಾಫಿ ಸಕ್ಕರೆ ಕಡಿಮೆ ಹಾಕಿ ಕೊಡಿ.',
      transliteration: 'Filter coffee sakkare kadime haaki kodi.',
      english: 'Give filter coffee with less sugar.'
    }
  },
  {
    id: 'vocab-food-06',
    category: 'food',
    categoryLabel: 'Food & Restaurants',
    kannada: 'ಬಿಸಿ',
    transliteration: 'Bisi',
    english: 'Hot / Piping warm',
    example: {
      kannada: 'ಬಿಸಿ ಬೇಳೆ ಬಾತ್ ಫ್ರೆಶ್ ಇದೆ.',
      transliteration: 'Bisi bele bath fresh ide.',
      english: 'Bisi bele bath is fresh and hot.'
    }
  },
  {
    id: 'vocab-food-07',
    category: 'food',
    categoryLabel: 'Food & Restaurants',
    kannada: 'ಖಾರ',
    transliteration: 'Khaara',
    english: 'Spicy / Chili heat',
    example: {
      kannada: 'ಖಾರ ಕಡಿಮೆ ಮಾಡಿ ದಯವಿಟ್ಟು.',
      transliteration: 'Khaara kadime maadi dayavittu.',
      english: 'Please make it less spicy.'
    }
  },
  {
    id: 'vocab-food-08',
    category: 'food',
    categoryLabel: 'Food & Restaurants',
    kannada: 'ಸಕ್ಕರೆ',
    transliteration: 'Sakkare',
    english: 'Sugar',
    example: {
      kannada: 'ಸಕ್ಕರೆ ಇಲ್ಲದೆ ಕೊಡಬಹುದು.',
      transliteration: 'Sakkare illade kodabahudu.',
      english: 'Can be given without sugar.'
    }
  },
  {
    id: 'vocab-food-09',
    category: 'food',
    categoryLabel: 'Food & Restaurants',
    kannada: 'ಬಿಲ್',
    transliteration: 'Bill',
    english: 'Food bill / Check',
    example: {
      kannada: 'ದಯವಿಟ್ಟು ಬಿಲ್ ಕೊಡಿ.',
      transliteration: 'Dayavittu bill kodi.',
      english: 'Please bring the bill.'
    }
  },
  {
    id: 'vocab-food-10',
    category: 'food',
    categoryLabel: 'Food & Restaurants',
    kannada: 'ತುಪ್ಪ',
    transliteration: 'Thuppa',
    english: 'Ghee (clarified butter)',
    example: {
      kannada: 'ದೋಸೆ ಮೇಲೆ ಸ್ವಲ್ಪ ತುಪ್ಪ ಹಾಕಿ.',
      transliteration: 'Dose mele swalpa thuppa haaki.',
      english: 'Put a little ghee on the dosa.'
    }
  },

  // ==================== SHOPPING & PAYMENTS ====================
  {
    id: 'vocab-shop-01',
    category: 'shopping',
    categoryLabel: 'Shopping & Payments',
    kannada: 'ಎಷ್ಟು?',
    transliteration: 'Eshtu?',
    english: 'How much?',
    example: {
      kannada: 'ಇದು ಎಷ್ಟು ರೂಪಾಯಿ?',
      transliteration: 'Idu eshtu roopayi?',
      english: 'How many rupees is this?'
    }
  },
  {
    id: 'vocab-shop-02',
    category: 'shopping',
    categoryLabel: 'Shopping & Payments',
    kannada: 'ರೂಪಾಯಿ',
    transliteration: 'Roopayi',
    english: 'Rupees / Money',
    example: {
      kannada: 'ಒಟ್ಟು ಐವತ್ತು ರೂಪಾಯಿ.',
      transliteration: 'Ottu aivattu roopayi.',
      english: 'Total is fifty rupees.'
    }
  },
  {
    id: 'vocab-shop-03',
    category: 'shopping',
    categoryLabel: 'Shopping & Payments',
    kannada: 'ಕಡಿಮೆ',
    transliteration: 'Kadime',
    english: 'Less / Reduce',
    example: {
      kannada: 'ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡ್ತೀರಾ?',
      transliteration: 'Swalpa kadime maateera?',
      english: 'Can you give a little discount?'
    }
  },
  {
    id: 'vocab-shop-04',
    category: 'shopping',
    categoryLabel: 'Shopping & Payments',
    kannada: 'ಜಾಸ್ತಿ',
    transliteration: 'Jaasti',
    english: 'More / Too much',
    example: {
      kannada: 'ಬೆಲೆ ತುಂಬಾ ಜಾಸ್ತಿ ಆಯ್ತು.',
      transliteration: 'Bele tumba jaasti aaytu.',
      english: 'The price became too high.'
    }
  },
  {
    id: 'vocab-shop-05',
    category: 'shopping',
    categoryLabel: 'Shopping & Payments',
    kannada: 'ಚಿಲ್ಲರೆ',
    transliteration: 'Chillare',
    english: 'Loose coins / Change',
    example: {
      kannada: 'ಚಿಲ್ಲರೆ ಇದೆಯಾ ನಿಮ್ಮ ಹತ್ತಿರ?',
      transliteration: 'Chillare ideya nimma hathira?',
      english: 'Do you have change with you?'
    }
  },
  {
    id: 'vocab-shop-06',
    category: 'shopping',
    categoryLabel: 'Shopping & Payments',
    kannada: 'ಕವರ್ / ಬ್ಯಾಗ್',
    transliteration: 'Cover / Bag',
    english: 'Carry bag / Plastic cover',
    example: {
      kannada: 'ದಯವಿಟ್ಟು ಒಂದು ಕವರ್ ಕೊಡಿ.',
      transliteration: 'Dayavittu ondu cover kodi.',
      english: 'Please give a carry bag.'
    }
  },
  {
    id: 'vocab-shop-07',
    category: 'shopping',
    categoryLabel: 'Shopping & Payments',
    kannada: 'ತರಕಾರಿ',
    transliteration: 'Tharakaari',
    english: 'Vegetables',
    example: {
      kannada: 'ಫ್ರೆಶ್ ತರಕಾರಿ ಸಿಗುತ್ತೆ.',
      transliteration: 'Fresh tharakaari sigutte.',
      english: 'You get fresh vegetables here.'
    }
  },
  {
    id: 'vocab-shop-08',
    category: 'shopping',
    categoryLabel: 'Shopping & Payments',
    kannada: 'ಹಣ್ಣು',
    transliteration: 'Hannu',
    english: 'Fruits',
    example: {
      kannada: 'ಒಂದು ಕಿಲೋ ಹಣ್ಣು ಕೊಡಿ.',
      transliteration: 'Ondu kilo hannu kodi.',
      english: 'Give one kilogram of fruits.'
    }
  },

  // ==================== HEALTH & PHARMACY ====================
  {
    id: 'vocab-health-01',
    category: 'health',
    categoryLabel: 'Health & Pharmacy',
    kannada: 'ನೋವು',
    transliteration: 'Novu',
    english: 'Pain / Ache',
    example: {
      kannada: 'ನನಗೆ ತುಂಬಾ ತಲೆನೋವು ಇದೆ.',
      transliteration: 'Nanage tumba talenovu ide.',
      english: 'I have a severe headache.'
    }
  },
  {
    id: 'vocab-health-02',
    category: 'health',
    categoryLabel: 'Health & Pharmacy',
    kannada: 'ಮಾತ್ರೆ',
    transliteration: 'Maatre',
    english: 'Medicine tablet / Pill',
    example: {
      kannada: 'ಊಟ ಆದ್ಮೇಲೆ ಒಂದು ಮಾತ್ರೆ ತಗೊಳ್ಳಿ.',
      transliteration: 'Oota aadmeyle ondu maatre tagolli.',
      english: 'Take one tablet after eating.'
    }
  },
  {
    id: 'vocab-health-03',
    category: 'health',
    categoryLabel: 'Health & Pharmacy',
    kannada: 'ಜ್ವರ',
    transliteration: 'Jwara',
    english: 'Fever',
    example: {
      kannada: 'ನಿಮಗೆ ಜ್ವರ ಕೂಡ ಇದೆಯಾ?',
      transliteration: 'Nimage jwara kooda ideya?',
      english: 'Do you also have a fever?'
    }
  },
  {
    id: 'vocab-health-04',
    category: 'health',
    categoryLabel: 'Health & Pharmacy',
    kannada: 'ಕೆಮ್ಮು',
    transliteration: 'Kemmu',
    english: 'Cough',
    example: {
      kannada: 'ಕೆಮ್ಮಿಗೆ ಸಿರಪ್ ಕೊಡಿ.',
      transliteration: 'Kemmige syrup kodi.',
      english: 'Give syrup for cough.'
    }
  },
  {
    id: 'vocab-health-05',
    category: 'health',
    categoryLabel: 'Health & Pharmacy',
    kannada: 'ಆಸ್ಪತ್ರೆ',
    transliteration: 'Aaspathre',
    english: 'Hospital',
    example: {
      kannada: 'ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ ಎಲ್ಲಿದೆ?',
      transliteration: 'Hathirada aaspathre ellide?',
      english: 'Where is the nearest hospital?'
    }
  },
  {
    id: 'vocab-health-06',
    category: 'health',
    categoryLabel: 'Health & Pharmacy',
    kannada: 'ವೈದ್ಯರು',
    transliteration: 'Vaidyaru',
    english: 'Doctor / Physician',
    example: {
      kannada: 'ವೈದ್ಯರನ್ನು ಭೇಟಿಯಾಗಬೇಕು.',
      transliteration: 'Vaidyarannu bhetiyaagabeku.',
      english: 'Need to meet the doctor.'
    }
  },

  // ==================== EVERYDAY LIFE & SOCIAL ====================
  {
    id: 'vocab-everyday-01',
    category: 'everyday',
    categoryLabel: 'Everyday Life',
    kannada: 'ನಮಸ್ಕಾರ',
    transliteration: 'Namaskara',
    english: 'Hello / Greetings',
    example: {
      kannada: 'ನಮಸ್ಕಾರ, ಹೇಗಿದ್ದೀರಾ?',
      transliteration: 'Namaskara, hegiddeera?',
      english: 'Hello, how are you?'
    }
  },
  {
    id: 'vocab-everyday-02',
    category: 'everyday',
    categoryLabel: 'Everyday Life',
    kannada: 'ಹೌದು',
    transliteration: 'Haudu',
    english: 'Yes',
    example: {
      kannada: 'ಹೌದು, ನಾನು ಬೆಂಗಳೂರಿನಲ್ಲಿ ಇದ್ದೀನಿ.',
      transliteration: 'Haudu, naanu Bengalurinalli iddeeni.',
      english: 'Yes, I am in Bengaluru.'
    }
  },
  {
    id: 'vocab-everyday-03',
    category: 'everyday',
    categoryLabel: 'Everyday Life',
    kannada: 'ಇಲ್ಲ',
    transliteration: 'Illa',
    english: 'No / Not there',
    example: {
      kannada: 'ಇಲ್ಲ, ಇದು ಹೋಗಲ್ಲ.',
      transliteration: 'Illa, idu hogalla.',
      english: 'No, this does not go.'
    }
  },
  {
    id: 'vocab-everyday-04',
    category: 'everyday',
    categoryLabel: 'Everyday Life',
    kannada: 'ದಯವಿಟ್ಟು',
    transliteration: 'Dayavittu',
    english: 'Please',
    example: {
      kannada: 'ದಯವಿಟ್ಟು ಸಹಾಯ ಮಾಡಿ.',
      transliteration: 'Dayavittu sahaaya maadi.',
      english: 'Please help me.'
    }
  },
  {
    id: 'vocab-everyday-05',
    category: 'everyday',
    categoryLabel: 'Everyday Life',
    kannada: 'ಧನ್ಯವಾದ',
    transliteration: 'Dhanyavaada',
    english: 'Thank you',
    example: {
      kannada: 'ನಿಮ್ಮ ಸಹಾಯಕ್ಕೆ ತುಂಬಾ ಧನ್ಯವಾದಗಳು!',
      transliteration: 'Nimma sahaayakke tumba dhanyavaadagalu!',
      english: 'Thank you very much for your help!'
    }
  },
  {
    id: 'vocab-everyday-06',
    category: 'everyday',
    categoryLabel: 'Everyday Life',
    kannada: 'ಗೊತ್ತು',
    transliteration: 'Gottu',
    english: 'Know / Understand',
    example: {
      kannada: 'ನನಗೆ ಸ್ವಲ್ಪ ಕನ್ನಡ ಗೊತ್ತು.',
      transliteration: 'Nanage swalpa Kannada gottu.',
      english: 'I know a little bit of Kannada.'
    }
  },
  {
    id: 'vocab-everyday-07',
    category: 'everyday',
    categoryLabel: 'Everyday Life',
    kannada: 'ಬರಲ್ಲ',
    transliteration: 'Baralla',
    english: 'Do not know / Cannot',
    example: {
      kannada: 'ನನಗೆ ಕನ್ನಡ ಅಷ್ಟಾಗಿ ಬರಲ್ಲ.',
      transliteration: 'Nanage Kannada ashtaagi baralla.',
      english: 'I do not know Kannada very well.'
    }
  },
  {
    id: 'vocab-everyday-08',
    category: 'everyday',
    categoryLabel: 'Everyday Life',
    kannada: 'ಸ್ವಲ್ಪ',
    transliteration: 'Swalpa',
    english: 'A little / Slightly',
    example: {
      kannada: 'ಸ್ವಲ್ಪ ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ.',
      transliteration: 'Swalpa nidhaanavaagi maatanaadi.',
      english: 'Please speak a little slowly.'
    }
  },
  {
    id: 'vocab-everyday-09',
    category: 'everyday',
    categoryLabel: 'Everyday Life',
    kannada: 'ಎಲ್ಲಿ?',
    transliteration: 'Elli?',
    english: 'Where?',
    example: {
      kannada: 'ವಾಶ್‌ರೂಮ್ ಎಲ್ಲಿದೆ?',
      transliteration: 'Washroom ellide?',
      english: 'Where is the washroom?'
    }
  },
  {
    id: 'vocab-everyday-10',
    category: 'everyday',
    categoryLabel: 'Everyday Life',
    kannada: 'ಏನು?',
    transliteration: 'Enu?',
    english: 'What?',
    example: {
      kannada: 'ಇವತ್ತು ಇಲ್ಲಿ ಏನು ಸ್ಪೆಷಲ್ ಇದೆ?',
      transliteration: 'Ivattu illi enu special ide?',
      english: 'What is special here today?'
    }
  }
];
